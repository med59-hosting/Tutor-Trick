"use client";
import { useState, useEffect } from "react";

// 👇 set your offer end date/time here (year, month-1, day, hour, minute)
// Example: ends on 2026-07-05 at 23:59 → new Date(2026, 6, 5, 23, 59)
const OFFER_END = new Date(2026, 6, 5, 23, 59);

export default function OfferBanner() {
  const [left, setLeft] = useState<number>(0);

  useEffect(() => {
    const tick = () => setLeft(Math.max(0, OFFER_END.getTime() - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(left / 3_600_000);
  const m = Math.floor((left % 3_600_000) / 60_000);
  const s = Math.floor((left % 60_000) / 1000);
  const ended = left <= 0;

  return (
    <div className="bg-white rounded-2xl border border-[#f5a524]/40 p-6 mb-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl font-display font-bold text-gray-400 line-through">Rs 11,000</span>
        <span className="text-3xl font-display font-bold text-[#1b1b2e]">Rs 8,500</span>
        <span className="bg-[#f5a524] text-[#1b1b2e] text-xs font-bold px-2 py-1 rounded-full">SAVE 2,500</span>
      </div>

      {ended ? (
        <p className="text-sm text-red-600 font-semibold">⏰ This offer has ended.</p>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[#5a5b76]">🔥 Limited-time offer ends in:</span>
          <div className="flex gap-1 font-display font-bold">
            <span className="bg-[#1b1b2e] text-white rounded-lg px-2 py-1 text-sm tabular-nums">{String(h).padStart(2, "0")}h</span>
            <span className="bg-[#1b1b2e] text-white rounded-lg px-2 py-1 text-sm tabular-nums">{String(m).padStart(2, "0")}m</span>
            <span className="bg-[#1b1b2e] text-white rounded-lg px-2 py-1 text-sm tabular-nums">{String(s).padStart(2, "0")}s</span>
          </div>
        </div>
      )}
    </div>
  );
}