import "dotenv/config";
import fastifyCors from "@fastify/cors";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient({
	log: ["error", "warn"],
});

const uuid = (): string => Date.now().toString(16).toUpperCase();

const start = async () => {
	const fastify = Fastify({
		logger: true,
	});

	try {
		await fastify.register(fastifyCors, {
			origin: "*",
		});

		fastify.get("/pools/count", async () => {
			const count = await prisma.pool.count();
			return { count };
		});
		fastify.get("/user/count", async () => {
			const count = await prisma.user.count();
			return { count };
		});
		fastify.get("/guess/count", async () => {
			const count = await prisma.guess.count();
			return { count };
		});

		fastify.post("/pools", async (req: FastifyRequest, res: FastifyReply) => {
			const createBody = z.object({
				title: z.string(),
			});

			const { title } = createBody.parse(req.body);

			await prisma.pool.create({
				data: {
					code: uuid(),
					title,
				},
			});

			return res.status(201).send({ title });
		});

		await fastify.listen({ port: +process.env.PORT });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

start();
