import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/db";
import { encrypt } from "@/src/lib/security";
import { parseTransactions } from "@/src/lib/parsing.service";

export async function POST(request: Request) {
  try {
    // 1. Authenticate User
    const { userId } = await auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // 2. Read FormData (Fixes file size issues by avoiding massive JSON blobs)
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const source = formData.get("source") as string | null;

    if (!file || !source) {
      return NextResponse.json(
        { error: "Missing file or source" },
        { status: 400 }
      );
    }

    // 3. Convert File to Buffer for processing
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 4. Prepare data for encryption and storage
    // We convert binary files to base64 string so they can be encrypted 
    // by our current string-based encryption helper.
    const fileBase64 = buffer.toString('base64');
    const encryptedContent = encrypt(fileBase64);

    // 5. Save encrypted raw data to database (Compliance)
    const rawData = await prisma.rawData.create({
      data: {
        userId,
        source,
        content: encryptedContent,
      },
    });

    // 6. Parse Transactions
    // Try to read as text for parsing. If it's a real PDF, this simple toString()
    // won't work well without a library like 'pdf-parse', but it works for CSV/TXT.
    let transactions: any[] = [];
    try {
       const textContent = buffer.toString('utf-8');
       transactions = parseTransactions(source, textContent);
    } catch (e) {
       console.warn("Parsing failed (might be binary file):",e);
    }

    // 7. Save Parsed Transactions (if any were found)
    if (transactions.length > 0) {
      await prisma.transaction.createMany({
        data: transactions.map((tx) => ({
          ...tx,
          userId,
          sourceDataId: rawData.id,
        })),
      });
    }

    return NextResponse.json({ 
        success: true, 
        count: transactions.length,
        message: transactions.length > 0 ? "Success" : "File saved, but no transactions parsed." 
    });

  } catch (error: any) {
    console.error("Upload API Error:", error);
    // Return a proper JSON error so the frontend doesn't crash with "Unexpected end of JSON"
    return NextResponse.json(
        { error: error.message || "Internal Server Error" },
        { status: 500 }
    );
  }
}