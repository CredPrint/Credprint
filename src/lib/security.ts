// src/lib/security.ts
import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const KEY_HEX = process.env.ENCRYPTION_KEY!;

// This check is crucial.
if (!KEY_HEX || KEY_HEX.length !== 64) {
  throw new Error("Invalid ENCRYPTION_KEY: Must be a 64-character hex string (32 bytes).");
}

// Convert the 64-char hex key from .env into a 32-byte binary buffer
const KEY = Buffer.from(KEY_HEX, 'hex');

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  
  // Store iv:authTag:encryptedData
  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

export function decrypt(encryptedText: string): string {
  try {
    const [ivHex, authTagHex, dataHex] = encryptedText.split(':');
    if (!ivHex || !authTagHex || !dataHex) {
        throw new Error("Invalid encrypted text format.");
    }
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(dataHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    console.error("Decryption failed:", error);
    return "DECRYPTION_FAILED";
  }
}