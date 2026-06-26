export { auth as middleware } from "@/auth";

export const config = {
  matcher: ["/dashboard/:path*", "/quiz/:path*", "/teacher/:path*", "/generate/:path*"],
};