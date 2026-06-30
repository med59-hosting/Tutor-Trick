import "dotenv/config";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const OLD = ["Basic Maths", "Advanced Maths", "Physics", "Analytical Reasoning", "Intelligence"];

const res = await prisma.question.deleteMany({ where: { subject: { in: OLD } } });
console.log(`Deleted ${res.count} old subject questions.`);
await prisma.$disconnect();