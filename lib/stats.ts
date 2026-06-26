import { prisma } from "@/lib/prisma";

// Stats for one user: total answered, correct, accuracy
export async function getUserStats(userId: string) {
  const attempts = await prisma.attempt.findMany({ where: { userId } });
  const total = attempts.length;
  const correct = attempts.filter((a) => a.isCorrect).length;
  const accuracy = total === 0 ? 0 : Math.round((correct / total) * 100);
  return { total, correct, accuracy };
}

// Leaderboard: every user ranked by number of correct answers
export async function getLeaderboard() {
  const users = await prisma.user.findMany({
    where: { role: "student" },
    include: { attempts: true },
  });

  const rows = users.map((u) => {
    const total = u.attempts.length;
    const correct = u.attempts.filter((a) => a.isCorrect).length;
    return {
      id: u.id,
      name: u.name,
      total,
      correct,
      accuracy: total === 0 ? 0 : Math.round((correct / total) * 100),
    };
  });

  // highest correct first; tiebreak by accuracy
  rows.sort((a, b) => b.correct - a.correct || b.accuracy - a.accuracy);
  return rows;
}