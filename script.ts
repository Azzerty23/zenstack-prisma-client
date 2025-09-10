import { getEnhancedPrisma, prisma } from "./lib/db";

const enhancedPrisma = getEnhancedPrisma(undefined);

async function main() {
	const startTime = performance.now();

	const t = await prisma.todo.findMany();
	const todos = await enhancedPrisma.todo.findMany();

	const endTime = performance.now();

	// Calculate the elapsed time
	const elapsedTime = endTime - startTime;

	console.log(`The query took ${elapsedTime}ms.`);

	console.log(t, todos);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
