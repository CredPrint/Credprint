// ==========================================
// FILE: src/app/api/onboarding/upload-data/route.ts (Corrected)
// ==========================================
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/db";
import { encrypt } from "@/src/lib/security";
import { parseTransactions } from "@/src/lib/parsing.service";

/**
 * This function ensures a user record exists in our local Prisma database
 * after they have authenticated with Clerk.
 */
async function getOrCreateUser() {
  // 1. Get auth data
  const { userId } = auth();
  const clerkUser = await currentUser();

  if (!userId || !clerkUser) {
    throw new Error("Unauthorized");
  }

  // 2. Check if user already exists in our DB
  let user = await prisma.user.findUnique({
    where: { id: userId },
  });

  // 3. If not, create them
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

  // 4. Return the guaranteed non-null user from our DB
  return user;
}

export async function POST(request: Request) {
  try {
    // --- THIS IS THE FIX ---
    // 1. We call our new helper function.
    // 'user' is now the full user object from our database, NOT the old `userId`
    const user = await getOrCreateUser();

    // 2. We NO LONGER need the old `const { userId } = auth()`
    // or `if (!userId)` checks here, as the helper does it.
    // --- END OF FIX ---

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
        // --- THIS IS THE FIX ---
        // We use `user.id` (which is a string)
        // This is why your editor was underlining `userId` (which was string | null)
        userId: user.id,
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
          userId: user.id, // <-- Also use user.id here
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