import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { signOut } from "@/auth";

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const role = (session.user as any).role;

  return (
    <div className="max-w-md mx-auto mt-20 p-6 space-y-4 text-center">
      <h1 className="text-2xl font-bold">Hi {session.user.name} 👋</h1>
      <p className="text-gray-500">You're logged in as a <b>{role}</b>.</p>

      <div className="flex flex-col gap-2">
        {role === "teacher" && (
          <a href="/teacher" className="bg-black text-white rounded p-2 font-semibold">
            Add questions
          </a>
        )}
        <a href="/quiz" className="bg-amber-500 text-white rounded p-2 font-semibold">
          Take a quiz
        </a>
      </div>

      <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
        <button className="text-sm text-gray-400 mt-4">Log out</button>
      </form>
    </div>
  );
}