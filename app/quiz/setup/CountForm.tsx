"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CountForm({ type, name, max }: { type: string; name: string; max: number }) {
  const r = useRouter();
  const [count, setCount] = useState(5);
  const [err, setErr] = useState("");

  function start() {
    const n = Number(count);
    if (n < 5 || n > 50) { setErr("Choose between 5 and 50."); return; }
    if (n > max) { setErr(`Only ${max} available.`); return; }
    r.push(`/quiz/play?type=${type}&name=${encodeURIComponent(name)}&count=${n}`);
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-[#5a5b76]">How many questions? (5–50)</label>
      <input type="number" min={5} max={50} value={count} onChange={(e) => setCount(Number(e.target.value))}
        className="w-full border-2 rounded-xl p-3 text-center text-xl font-bold" />
      {err && <p className="text-red-600 text-sm">{err}</p>}
      <button onClick={start} className="w-full bg-[#1b1b2e] text-white rounded-xl py-3 font-semibold hover:opacity-90 transition">Start quiz</button>
    </div>
  );
}