import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, email, password, role, phone, address, image } = await req.json();
  if (!name || !email || !password || !phone || !address) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json({ error: "Email already registered." }, { status: 409 });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name, email, passwordHash,
      phone, address, image: image || "",
      role: role === "teacher" ? "teacher" : "student",
    },
  });
  return NextResponse.json({ ok: true });
}