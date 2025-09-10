// Inspired from: https://github.com/prisma/prisma-examples/blob/latest/generator-prisma-client/nextjs-starter-webpack-with-middleware/lib/db-edge.ts

import type { UserModel } from "@generated/zenstack/models";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "../generated/prisma/client";
import { enhance } from "../generated/zenstack/enhance";
import { env } from "./env";

export type GetDbParams = {
	connectionString: string;
};

export function getDb({ connectionString }: GetDbParams) {
	const prisma = new PrismaClient({
		datasourceUrl: connectionString,
	}).$extends(withAccelerate());

	return prisma;
}

export const prisma = getDb({
	connectionString: env.DATABASE_URL ?? "",
});

export const getEnhancedPrisma = (user: UserModel | undefined) =>
	enhance(prisma, { user });
