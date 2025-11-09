// ==========================================
// FILE: src/app/api/onboarding/upload-data/route.ts (FIXED)
// ==========================================
import { auth, currentUser } from "@clerk/nextjs/server"; // <-- Import currentUser
import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/db";
import { encrypt } from "@/src/lib/security";
import { parseTransactions } from "@/src/lib/parsing.service";

/**
 * This function ensures a user record exists in our local Prisma database
 * after they have authenticated with Clerk.
 */
async function getOrCreateUser() {
  const { userId } = auth();
  const clerkUser = await currentUser();

  if (!userId || !clerkUser) {
    throw new Error("Unauthorized");
  }

  // Check if user already exists in our DB
  let user = await prisma.user.findUnique({
    where: { id: userId },
  });

  // If not, create them
  if (!user) {
    console.log(`User ${userId} not found in DB. Creating...`);
    const email = clerkUser.emailAddresses[0]?.emailAddress;
    const phone = clerkUser.phoneNumbers[0]?.phoneNumber;

    if (!email) {
      // Your schema requires email, so we must have it
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
    // This will now get the user, or create them if they don't exist
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