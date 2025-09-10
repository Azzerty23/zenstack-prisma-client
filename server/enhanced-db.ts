import { getEnhancedPrisma } from "@lib/db";
import type { GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "./auth";

export async function getEnhancedPrismaFromCtx(ctx: {
	req: GetServerSidePropsContext["req"];
	res: GetServerSidePropsContext["res"];
}) {
	const session = await getServerAuthSession(ctx);
	return getEnhancedPrisma(session?.user ?? undefined);
}
