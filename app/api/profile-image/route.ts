import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file." }, { status: 400 });
  if (!file.type.startsWith("image/")) return NextResponse.json({ error: "Image only." }, { status: 400 });

  const blob = await put(`avatars/${Date.now()}-${file.name}`, file, { access: "private" });
  return NextResponse.json({ url: blob.pathname });
}