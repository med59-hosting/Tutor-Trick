import { auth } from "@/auth";
import { get } from "@vercel/blob";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) return new Response("Not logged in", { status: 401 });

  const pathname = new URL(req.url).searchParams.get("p");
  if (!pathname) return new Response("Missing image", { status: 400 });

  const result = await get(pathname, { access: "private" });
  if (!result || result.statusCode !== 200) return new Response("Not found", { status: 404 });

  return new Response(result.stream as any, {
    headers: {
      "Content-Type": result.blob.contentType || "image/jpeg",
      "X-Content-Type-Options": "nosniff",
    },
  });
}