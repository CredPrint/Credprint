// src/lib/scoring.service.ts
import { prisma } from './db';

// PRD Metrics: "inflow frequency, stability, average spend ratio, and irregular transaction flags" [cite: 216]
const WEIGHTS = {
  STABILITY: 0.3,
  INFLOW_FREQUENCY: 0.3,
  SPEND_RATIO: 0.2,
  RED_FLAGS: 0.2 // (e.g., gambling, payday loans)
};

export async function calculateCreditScore(userId: string) {
  const transactions = await prisma.transaction.findMany({
    where: { userId },
    orderBy: { timestamp: 'asc' },
  });

  if (transactions.length < 5) {
    throw new Error("Insufficient transaction data");
  }

  // 1. Calculate metrics (0-100 scale)
  const stability = calculateStability(transactions);       // e.g., low balance volatility
  const inflowFreq = calculateInflowFrequency(transactions); // e.g., consistent credits
  const spendRatio = calculateSpendRatio(transactions);     // e.g., credits vs. debits
  const redFlags = calculateRedFlags(transactions);         // e.g., % of 'betting' debits

  // 2. Apply weights
  const totalScore = 
    (stability * WEIGHTS.STABILITY) +
    (inflowFreq * WEIGHTS.INFLOW_FREQUENCY) +
    (spendRatio * WEIGHTS.SPEND_RATIO) +
    (redFlags * WEIGHTS.RED_FLAGS);

  // 3. Generate insights 
  const insights = {
    stability: stability > 70 ? "Good: Your balance is stable." : "Needs Work: Your balance fluctuates often.",
    inflow: inflowFreq > 70 ? "Good: You have consistent income." : "Needs Work: Your income seems irregular."
  };

  // 4. Save to DB
  return prisma.creditScore.create({
    data: {
      userId,
      score: Math.max(0, Math.min(100, Math.round(totalScore))), // Clamp score 0-100
      insights,
    },
  });
}

// You must implement these scoring helpers based on your business logic
function calculateStability(txs: any[]): number { return 80; /* ...logic... */ }
function calculateInflowFrequency(txs: any[]): number { return 70; /* ...logic... */ }
function calculateSpendRatio(txs: any[]): number { return 60; /* ...logic... */ }
function calculateRedFlags(txs: any[]): number { return 90; /* ...logic... */ }