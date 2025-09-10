import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import "dotenv/config";

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url().startsWith("prisma+postgres://"), // for edge middleware
		DIRECT_URL: z.string().url().startsWith("postgres://"),
	},
	runtimeEnv: process.env,
});
