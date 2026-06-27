import { auth } from "@/auth";

export async function getAccess() {
  const session = await auth();
  const user = session?.user as any;
  if (!user) return { loggedIn: false, allowed: false, user: null };
  const allowed = user.role === "teacher" || user.isPaid === true;
  return { loggedIn: true, allowed, user };
}