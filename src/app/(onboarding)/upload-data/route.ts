// src/app/api/onboarding/upload-data/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/db";
import { encrypt } from "@/src/lib/security";
import { parseTransactions } from "@/src/lib/parsing.service";
// You may need to install a PDF parser: npm install pdf-parse
// import pdf from 'pdf-parse'; 

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  // Data from frontend: file (base64) and source (Opay, PalmPay, etc.)
  const { fileContent, source } = await request.json();

  if (!fileContent || !source) {
    return NextResponse.json({ error: "Missing fileContent or source" }, { status: 400 });
  }

  // TODO: Add logic to get the text.
  // This example assumes a text-based file (txt, csv).
  // If it's a PDF, you must use a library like 'pdf-parse' here.
  let rawText = "";
  try {
     rawText = Buffer.from(fileContent.split(",")[1], 'base64').toString('utf8');
  } catch (e) {
     return NextResponse.json({ error: "Invalid file data" }, { status: 400 });
  }
  
  // 1. Encrypt and save raw data
  const encryptedContent = encrypt(rawText);
  const rawData = await prisma.rawData.create({
    data: { userId, source, content: encryptedContent },
  });
  
  // 2. Parse transactions
  const transactions = parseTransactions(source, rawText);

  if (transactions.length === 0) {
    // This is not an error, but good to let the client know.
    return NextResponse.json({ success: true, count: 0, message: "File saved, but no transactions parsed." });
  }

  // 3. Save parsed transactions to DB
  await prisma.transaction.createMany({
    data: transactions.map(tx => ({
      ...tx,
      userId,
      sourceDataId: rawData.id,
    })),
  });

  return NextResponse.json({ success: true, count: transactions.length });
}