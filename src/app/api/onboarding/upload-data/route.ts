import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/db";
import { encrypt } from "@/src/lib/security";
import { parseTransactions } from "@/src/lib/parsing.service";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return new Response("Unauthorized", { status: 401 });

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const source = formData.get("source") as string | null;

    if (!file || !source) {
      return NextResponse.json({ error: "Missing file or source" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileBase64 = buffer.toString('base64');
    const encryptedContent = encrypt(fileBase64);

    const rawData = await prisma.rawData.create({
      data: { userId, source, content: encryptedContent },
    });

    let transactions: any[] = [];
    try {
        const textContent = buffer.toString('utf-8');
        transactions = parseTransactions(source, textContent);
    } catch (e) {
        console.warn("Could not parse file as text:", e);
    }

    if (transactions.length > 0) {
      await prisma.transaction.createMany({
        data: transactions.map((tx) => ({ ...tx, userId, sourceDataId: rawData.id })),
      });
    }

    return NextResponse.json({ success: true, count: transactions.length });

  } catch (error: any) {
    console.error("Upload API Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}