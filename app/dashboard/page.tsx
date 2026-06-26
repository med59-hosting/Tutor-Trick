import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { signOut } from "@/auth";
import { getUserStats, getLeaderboard } from "@/lib/stats";

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const user = session.user as any;

  const stats = await getUserStats(user.id);
  const leaderboard = await getLeaderboard();

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 space-y-8">
      {/* greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Hi {user.name} 👋</h1>
          <p className="text-gray-500 text-sm">Logged in as <b>{user.role}</b></p>
        </div>
        <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
          <button className="text-sm text-gray-400">Log out</button>
        </form>
      </div>

      {/* your stats */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="border rounded-xl p-4">
          <div className="text-3xl font-extrabold">{stats.total}</div>
          <div className="text-xs text-gray-500 mt-1">Questions answered</div>
        </div>
        <div className="border rounded-xl p-4">
          <div className="text-3xl font-extrabold text-green-600">{stats.correct}</div>
          <div className="text-xs text-gray-500 mt-1">Correct</div>
        </div>
        <div className="border rounded-xl p-4">
          <div className="text-3xl font-extrabold text-amber-500">{stats.accuracy}%</div>
          <div className="text-xs text-gray-500 mt-1">Accuracy</div>
        </div>
      </div>

      {/* actions */}
      <div className="flex gap-3">
        {user.role === "teacher" && (
          <a href="/teacher" className="flex-1 text-center bg-black text-white rounded-lg p-3 font-semibold">
            Add questions
          </a>
        )}
        <a href="/quiz" className="flex-1 text-center bg-amber-500 text-white rounded-lg p-3 font-semibold">
          Take a quiz
        </a>
      </div>

      {/* leaderboard */}
      <div>
        <h2 className="text-lg font-bold mb-3">🏆 Leaderboard</h2>
        {leaderboard.length === 0 ? (
          <p className="text-gray-400 text-sm">No scores yet. Be the first to take a quiz!</p>
        ) : (
          <div className="border rounded-xl overflow-hidden">
            {leaderboard.map((row, i) => (
              <div key={row.id}
                className={`flex items-center justify-between p-3 text-sm ${i !== 0 ? "border-t" : ""} ${row.id === user.id ? "bg-amber-50" : ""}`}>
                <div className="flex items-center gap-3">
                  <span className="font-bold w-5 text-gray-400">{i + 1}</span>
                  <span className="font-medium">{row.name}{row.id === user.id ? " (you)" : ""}</span>
                </div>
                <div className="text-gray-500">
                  <b className="text-green-600">{row.correct}</b> correct · {row.accuracy}%
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}