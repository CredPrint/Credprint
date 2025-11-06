import { PrismaClient } from '@prisma/client';

// Create a single PrismaClient instance and reuse it across module reloads in
// development to avoid exhausting database connections.
declare global {
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
	global.prisma = prisma;
}
