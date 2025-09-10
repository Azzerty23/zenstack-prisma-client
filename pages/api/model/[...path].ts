import { NextRequestHandler } from '@zenstackhq/server/next';
import { getEnhancedPrismaFromCtx } from 'server/enhanced-db';

export default NextRequestHandler({
    getPrisma: (req, res) => getEnhancedPrismaFromCtx({ req, res }),
});
