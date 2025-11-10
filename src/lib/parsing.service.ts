// src/lib/parsing.service.ts
// (A simplified example of your parser logic)

interface ParsedTx {
  timestamp: Date;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
}

// --- HELPER FUNCTIONS ---

/**
 * Parses an amount string like "1,000.50" into a float 1000.50
 */
function parseAmount(amountStr: string): number {
  return parseFloat(amountStr.replace(/,/g, ''));
}

/**
 * Tries to parse a date.
 * NOTE: This is a placeholder! You MUST adapt this to match your SMS data.
 * Many SMS formats don't include the year, so you may need to assume the current year.
 */
function parseTimestamp(dateStr: string): Date {
  // This is a basic parser. For real SMS, you'll get formats like "on 09/10/24 at 10:30:20"
  // You will need to make this function robust.
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    // If parsing fails, try to build it assuming "DD/MM/YYYY"
    const parts = dateStr.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    if (parts) {
      // parts[0] is full match, parts[1] is DD, parts[2] is MM, parts[3] is YYYY
      return new Date(`${parts[3]}-${parts[2]}-${parts[1]}`);
    }
    return new Date(); // Fallback to now
  }
  return date;
}

// --- REGEX PATTERNS ---
// We must add date capture groups. I've added a basic (date) group.
// You MUST adjust this (date) group to match your real data.
const REGEX_PATTERNS = {
  // Opay alerts - Assuming a date is at the start, e.g., "20/10/2024: "
  OPAY_CREDIT: /(\d{2}\/\d{2}\/\d{4})?:? You have received ([\d,.]+) NGN from (.*?)\. Bal:/i,
  OPAY_DEBIT: /(\d{2}\/\d{2}\/\d{4})?:? You have sent ([\d,.]+) NGN to (.*?)\. Bal:/i,

  // PalmPay
  PALMPAY_CREDIT: /(\d{2}\/\d{2}\/\d{4})?:? PalmPay: You have received NGN([\d,.]+) from (.*?)\./i,
  PALMPAY_DEBIT: /(\d{2}\/\d{2}\/\d{4})?:? PalmPay: Your transfer of NGN([\d,.]+) to (.*?) was successful\./i,

  // Generic SMS Alerts
  GTB_DEBIT: /Debited Acct: \d+\*\*+\d+ Amt: NGN([\d,.]+) Desc: (.*?) Avail Bal:.*? on (\d{2}-\w{3}-\d{4} \d{2}:\d{2}:\d{2})/i
};

export function parseTransactions(source: string, rawText: string): ParsedTx[] {
  const transactions: ParsedTx[] = [];
  const lines = rawText.split('\n');

  for (const line of lines) {
    // We use a try/catch inside the loop so one bad line doesn't
    // crash the entire parsing job.
    try {
      let match;

      // Logic for Opay (and other 'source' types)
      // Note: "generic_upload" will try all patterns
      if (source === 'Opay' || source === 'generic_upload') {
        if (match = line.match(REGEX_PATTERNS.OPAY_CREDIT)) {
          transactions.push({
            type: 'credit',
            timestamp: parseTimestamp(match[1] || new Date().toISOString()), // Use match[1] for date
            amount: parseAmount(match[2]), // Use match[2] for amount
            description: `Receive from ${match[3]}`, // Use match[3] for description
          });
          continue; // Move to the next line
        }
        if (match = line.match(REGEX_PATTERNS.OPAY_DEBIT)) {
          transactions.push({
            type: 'debit',
            timestamp: parseTimestamp(match[1] || new Date().toISOString()), // Use match[1] for date
            amount: parseAmount(match[2]), // Use match[2] for amount
            description: `Send to ${match[3]}`, // Use match[3] for description
          });
          continue;
        }
      }

      // Logic for PalmPay
      if (source === 'PalmPay' || source === 'generic_upload') {
        if (match = line.match(REGEX_PATTERNS.PALMPAY_CREDIT)) {
           transactions.push({
            type: 'credit',
            timestamp: parseTimestamp(match[1] || new Date().toISOString()),
            amount: parseAmount(match[2]),
            description: `Receive from ${match[3]}`,
          });
          continue;
        }
        // ... add PALMPAY_DEBIT logic here ...
      }

      // Logic for SMS
      if (source === 'generic_upload') { // Assuming SMS is part of "generic" for now
        if (match = line.match(REGEX_PATTERNS.GTB_DEBIT)) {
           transactions.push({
            type: 'debit',
            timestamp: parseTimestamp(match[3]), // Date is match[3]
            amount: parseAmount(match[1]),     // Amount is match[1]
            description: match[2],            // Description is match[2]
          });
          continue;
        }
      }
    } catch (error: any) {
      console.warn(`Failed to parse line: "${line}". Error: ${error.message}`);
    }
  }
  return transactions;
}