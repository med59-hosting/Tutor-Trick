"use client";
import { useRef } from "react";

type Student = { name: string; marks: string; university: string; image?: string };

const students: Student[] = [
  { name: "Ali Zubair", marks: "190/200", university: "NUST" },
  { name: "Sara Khan", marks: "188/200", university: "FAST" },
  { name: "Hamza Tariq", marks: "185/200", university: "GIKI" },
  { name: "Ayesha Malik", marks: "192/200", university: "UET" },
  { name: "Bilal Ahmed", marks: "180/200", university: "COMSATS" },
  { name: "Fatima Noor", marks: "187/200", university: "AIR University" },
  { name: "Usman Raza", marks: "183/200", university: "Bahria University" },
  { name: "Zainab Iqbal", marks: "195/200", university: "NUST" },
];

export default function ProgressCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => track.current?.scrollBy({ left: dir * 300, behavior: "smooth" });

  return (
    <div className="relative">
      <div ref={track} className="flex gap-5 overflow-x-auto scroll-smooth snap-x pb-4 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
        {students.map((s) => {
          const initials = s.name.split(" ").map((w) => w[0]).join("");
          return (
            <div key={s.name} className="snap-start shrink-0 w-64 bg-white rounded-2xl border border-black/5 shadow-sm p-6 text-center hover:-translate-y-1 transition">
              {s.image ? (
                <img src={s.image} alt={s.name} className="w-24 h-24 rounded-full object-cover mx-auto" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#6c5ce7] text-white grid place-items-center font-display font-bold text-3xl mx-auto">{initials}</div>
              )}
              <div className="mt-4 inline-block bg-[#fbd9a3] text-[#8a5a00] font-bold text-sm px-3 py-1 rounded-full">{s.marks}</div>
              <h3 className="font-display font-bold text-lg mt-3">{s.name}</h3>
              <p className="text-[#5a5b76] text-sm mt-1">Admission in <b className="text-[#1b1b2e]">{s.university}</b></p>
            </div>
          );
        })}
      </div>

      <button onClick={() => scroll(-1)} aria-label="Previous" className="absolute -left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-black/10 shadow-md grid place-items-center text-xl font-bold hover:bg-[#1b1b2e] hover:text-white transition">‹</button>
      <button onClick={() => scroll(1)} aria-label="Next" className="absolute -right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-black/10 shadow-md grid place-items-center text-xl font-bold hover:bg-[#1b1b2e] hover:text-white transition">›</button>
    </div>
  );
}