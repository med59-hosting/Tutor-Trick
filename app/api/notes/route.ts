import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
  const session = await auth();
  if ((session?.user as any)?.role !== "teacher") {
    return NextResponse.json({ error: "Teachers only." }, { status: 403 });
  }

  const form = await req.formData();
  const file = form.get("file") as File | null;
  const title = String(form.get("title") || "");
  const subject = String(form.get("subject") || "");

  if (!file || !title) return NextResponse.json({ error: "File and title required." }, { status: 400 });
  if (file.type !== "application/pdf") return NextResponse.json({ error: "Only PDF files allowed." }, { status: 400 });

  const blob = await put(`notes/${Date.now()}-${file.name}`, file, { access: "private" });

  await prisma.note.create({
    data: { title, subject, url: blob.url, uploadedBy: (session!.user as any).name || "Teacher" },
  });

  return NextResponse.json({ ok: true });
}