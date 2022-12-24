import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();
seed();
async function seed() {
	const user = await prisma.user.create({
		data: {
			email: "john.doe@outlook.com",
			name: "John Doe",
			avatar: "https://github.com/rwellingtonr.png",
		},
	});

	const pool = await prisma.pool.create({
		data: {
			code: randomUUID(),
			title: "Example",
			ownerId: user.id,
			participants: {
				create: {
					userId: user.id,
				},
			},
		},
	});

	await Promise.all([
		prisma.game.create({
			data: {
				date: new Date().toISOString(),
				firstTeamCountryCode: "BR",
				secondTeamCountryCode: "DE",
			},
		}),
		prisma.game.create({
			data: {
				date: new Date().toISOString(),
				firstTeamCountryCode: "MA",
				secondTeamCountryCode: "AR",
				guesses: {
					create: {
						fistTeamPoints: 2,
						secondTeamPoints: 1,
						participant: {
							connect: {
								userId_poolId: {
									userId: user.id,
									poolId: pool.id,
								},
							},
						},
					},
				},
			},
		}),
	]);
}
