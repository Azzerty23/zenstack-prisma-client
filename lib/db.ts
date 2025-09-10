import { PrismaPg } from "@prisma/adapter-pg";
import type { Session } from "next-auth";
import { PrismaClient } from "../generated/prisma/client";
import { enhance } from "../generated/zenstack/enhance";
import { env } from "./env";

export type GetDbParams = {
	connectionString: string;
};

export function getDb({ connectionString }: GetDbParams) {
	const pool = new PrismaPg({ connectionString });
	const prisma = new PrismaClient({ adapter: pool });

	return prisma;
}

export const prisma = getDb({ connectionString: env.DIRECT_URL });
export const getEnhancedPrisma = <User extends Session["user"]>(
	user: User | undefined,
) => {
	// biome-ignore lint/suspicious/noExplicitAny: ZenStack client type issue
	return enhance(prisma as any, { user });
};
