"use client";
import { useState } from "react";

type Q = {
  id: string; topic: string; text: string; options: string[];
  correctIndex: number; solutionSteps: string; trick: string; difficulty: string;
};

export default function QuizRunner({ questions }: { questions: Q[] }) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  if (questions.length === 0)
    return <p className="text-center mt-20 text-gray-500">No questions yet. Ask a teacher to add some.</p>;

  if (idx >= questions.length)
    return (
      <div className="max-w-md mx-auto mt-20 text-center">
        <div className="text-5xl font-extrabold">{score}/{questions.length}</div>
        <p className="mt-3 text-gray-600">Quiz complete.</p>
        <a href="/dashboard" className="inline-block mt-4 text-sm text-gray-400">Back to dashboard</a>
      </div>
    );

  const q = questions[idx];
  const answered = picked !== null;
  const correct = picked === q.correctIndex;

  async function choose(i: number) {
    if (answered) return;
    setPicked(i);
    const isCorrect = i === q.correctIndex;
    if (isCorrect) setScore((s) => s + 1);
    await fetch("/api/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId: q.id, chosenIndex: i, isCorrect }),
    });
  }

  function next() {
    setPicked(null);
    setIdx((n) => n + 1);
  }

  return (
    <div className="max-w-xl mx-auto mt-12 p-6">
      <p className="text-sm text-gray-500 mb-1">Question {idx + 1} of {questions.length}</p>
      <p className="text-xs font-bold uppercase tracking-wide text-amber-600 mb-2">{q.topic}</p>
      <h1 className="text-2xl font-bold mb-5">{q.text}</h1>

      <div className="space-y-2">
        {q.options.map((o, i) => {
          let cls = "border-gray-200";
          if (answered && i === q.correctIndex) cls = "border-green-500 bg-green-50";
          else if (answered && i === picked) cls = "border-red-500 bg-red-50";
          return (
            <button key={i} disabled={answered} onClick={() => choose(i)}
              className={`w-full text-left p-3 rounded-lg border-2 ${cls}`}>
              <b className="mr-2">{"ABCD"[i]}</b>{o}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="mt-6 space-y-4">
          <p className={`font-bold ${correct ? "text-green-600" : "text-red-600"}`}>
            {correct ? "✓ Correct!" : "✕ Not quite — here's how it works"}
          </p>
          {!correct && <p className="text-gray-600 border-l-2 border-gray-200 pl-3">{q.solutionSteps}</p>}
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">✎ Memory trick</p>
            <p className="text-lg font-semibold"><span className="bg-amber-200 px-1">{q.trick}</span></p>
          </div>
          <button onClick={next} className="bg-black text-white rounded-lg px-5 py-2 font-semibold">
            {idx === questions.length - 1 ? "See results" : "Next question →"}
          </button>
        </div>
      )}
    </div>
  );
}