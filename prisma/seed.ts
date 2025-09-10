import { getEnhancedPrisma, prisma } from "../lib/db";

const enhancedPrisma = getEnhancedPrisma(undefined);

const main = async () => {
	console.log("Seeding database...");
	console.time("Seeding complete 🌱");

	await prisma.list.deleteMany();

	await prisma.user.createMany({
		skipDuplicates: true,
		data: [
			{ id: "1", email: "user1@example.com" },
			{ id: "2", email: "user2@example.com" },
			{ id: "3", email: "user3@example.com" },
		],
	});

	await prisma.space.createMany({
		skipDuplicates: true,
		data: [
			{ id: "1", name: "Personal", ownerId: "1", slug: "personal" },
			{ id: "2", name: "Work", ownerId: "1", slug: "work" },
			{ id: "3", name: "Project A", ownerId: "2", slug: "project-a" },
			{ id: "4", name: "Project B", ownerId: "3", slug: "project-b" },
		],
	});

	await prisma.spaceUser.createMany({
		skipDuplicates: true,
		data: [
			{ userId: "1", spaceId: "1", role: "ADMIN" },
			{ userId: "1", spaceId: "2", role: "ADMIN" },
			{ userId: "2", spaceId: "3", role: "ADMIN" },
			{ userId: "3", spaceId: "4", role: "ADMIN" },
			{ userId: "2", spaceId: "1", role: "USER" },
			{ userId: "3", spaceId: "2", role: "USER" },
		],
	});

	const list1 = await prisma.list.create({
		data: {
			title: "The only way to do great work is to love what you do.",
			ownerId: "1",
			spaceId: "1",
		},
	});

	const list2 = await prisma.list.create({
		data: {
			title:
				"Success is not final, failure is not fatal: It is the courage to continue that counts.",
			ownerId: "1",
			spaceId: "2",
		},
	});

	const list3 = await prisma.list.create({
		data: {
			title: "In the middle of every difficulty lies opportunity.",
			ownerId: "1",
			spaceId: "2",
		},
	});

	await prisma.todo.createMany({
		skipDuplicates: true,
		data: [
			{
				title: "Learn TypeScript",
				completedAt: "2023-01-01T00:00:00Z",
				listId: list1.id,
				ownerId: "1",
			},
			{
				title: "Build a Next.js app",
				completedAt: null,
				listId: list1.id,
				ownerId: "1",
			},
			{
				title: "Write tests",
				completedAt: null,
				listId: list2.id,
				ownerId: "1",
			},
			{
				title: "Deploy to Vercel",
				completedAt: null,
				listId: list2.id,
				ownerId: "1",
			},
			{
				title: "Design database schema",
				completedAt: "2023-01-01T00:00:00Z",
				listId: list3.id,
				ownerId: "1",
			},
			{
				title: "Implement authentication",
				completedAt: null,
				listId: list3.id,
				ownerId: "1",
			},
		],
	});

	console.timeEnd("Seeding complete 🌱");

	console.log("Enhanced query:", await enhancedPrisma.list.count());
	console.log("Raw query:", await prisma.list.count());
};

main()
	.then(() => {
		console.log("Process completed");
	})
	.catch((e) => console.log(e));
