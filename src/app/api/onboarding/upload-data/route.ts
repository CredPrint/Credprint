// ==========================================
// FILE: src/app/api/onboarding/upload-data/route.ts (FIXED)
// ==========================================
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/db";
import { encrypt } from "@/src/lib/security";
import { parseTransactions } from "@/src/lib/parsing.service";

/**
 * This helper function gets the Clerk user and ensures they
 * exist in our local Prisma database.
 */
async function getOrCreateUser() {
  const authResult = await auth();
  if (!authResult.userId) {
    throw new Error("Unauthorized: No user ID found.");
  }
  const userId = authResult.userId; // userId is now a string

  const clerkUser = await currentUser();
  if (!clerkUser) {
    throw new Error("Unauthorized: Clerk user details not found.");
  }

  let user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    console.log(`User ${userId} not found in DB. Creating...`);
    const email = clerkUser.emailAddresses[0]?.emailAddress;
    const phone = clerkUser.phoneNumbers[0]?.phoneNumber;

    if (!email) {
      throw new Error("User has no primary email address in Clerk.");
    }

    user = await prisma.user.create({
      data: {
        id: userId,
        email: email,
        phone: phone,
      },
    });
    console.log(`User ${userId} created in DB.`);
  }
  return user;
}

export async function POST(request: Request) {
  try {
    // This function now guarantees the user exists in our DB
    const user = await getOrCreateUser();

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const source = formData.get("source") as string | null;

    if (!file || !source) {
      return NextResponse.json(
        { error: "Missing file or source" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileBase64 = buffer.toString("base64");
    const encryptedContent = encrypt(fileBase64);

    const rawData = await prisma.rawData.create({
      data: {
        userId: user.id, // This will now succeed
        source,
        content: encryptedContent,
      },
    });

    let transactions: any[] = [];
    try {
      const textContent = buffer.toString("utf-8");
      transactions = parseTransactions(source, textContent);
    } catch (e) {
      console.warn("Could not parse file as text:", e);
    }

    if (transactions.length > 0) {
      await prisma.transaction.createMany({
        data: transactions.map((tx) => ({
          ...tx,
          userId: user.id,
          sourceDataId: rawData.id,
        })),
      });
    }

    return NextResponse.json({ success: true, count: transactions.length });
  } catch (error: any) {
    console.error("Upload API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}