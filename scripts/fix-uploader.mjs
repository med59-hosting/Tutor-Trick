import "dotenv/config";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const res = await prisma.note.updateMany({
  data: { uploadedBy: "TutorTrick" },
});
console.log(`Updated ${res.count} notes.`);
await prisma.$disconnect();