"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";

const links = [
  { href: "/", label: "Home" },
  { href: "/quiz", label: "Quiz" },
  { href: "/notes", label: "Notes" },
  { href: "/about", label: "About Us" },
  { href: "/progress", label: "Our Progress" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar({ user }: { user?: { name?: string | null } | null }) {
  const [open, setOpen] = useState(false);
  const loggedIn = !!user;

  return (
    <header className="sticky top-0 z-50 bg-[#f7f6f2]/85 backdrop-blur border-b border-black/5">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#1b1b2e] text-white grid place-items-center font-display font-bold">T</div>
          <span className="font-display font-bold text-lg">TutorTrick</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="px-3 py-2 rounded-lg text-sm font-semibold hover:bg-black/5 transition">{l.label}</a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          {loggedIn ? (
            <>
              <a href="/dashboard" className="px-4 py-2 rounded-lg text-sm bg-[#1b1b2e] text-white font-semibold hover:opacity-90 transition">Dashboard</a>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="px-4 py-2 rounded-lg text-sm font-semibold hover:bg-black/5 transition">Log out</button>
            </>
          ) : (
            <>
              <a href="/login" className="px-4 py-2 rounded-lg text-sm font-semibold hover:bg-black/5 transition">Log in</a>
              <a href="/register" className="px-4 py-2 rounded-lg text-sm bg-[#1b1b2e] text-white font-semibold hover:opacity-90 transition">Sign up</a>
            </>
          )}
        </div>

        <button onClick={() => setOpen(true)} className="md:hidden p-2" aria-label="Open menu">
          <span className="block w-6 h-0.5 bg-[#1b1b2e] mb-1.5"></span>
          <span className="block w-6 h-0.5 bg-[#1b1b2e] mb-1.5"></span>
          <span className="block w-6 h-0.5 bg-[#1b1b2e]"></span>
        </button>
      </nav>

      <div className={`fixed inset-0 z-50 md:hidden ${open ? "visible" : "invisible"}`}>
        <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}></div>
        <aside className={`absolute top-0 right-0 h-full w-72 bg-[#f7f6f2] shadow-2xl p-6 transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex justify-between items-center mb-8">
            <span className="font-display font-bold text-lg">Menu</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-3xl leading-none">×</button>
          </div>
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="px-3 py-3 rounded-lg font-semibold hover:bg-black/5 transition">{l.label}</a>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-2">
            {loggedIn ? (
              <>
                <a href="/dashboard" onClick={() => setOpen(false)} className="px-4 py-3 rounded-lg text-center bg-[#1b1b2e] text-white font-semibold">Dashboard</a>
                <button onClick={() => signOut({ callbackUrl: "/" })} className="px-4 py-3 rounded-lg text-center font-semibold border border-black/15">Log out</button>
              </>
            ) : (
              <>
                <a href="/login" onClick={() => setOpen(false)} className="px-4 py-3 rounded-lg text-center font-semibold border border-black/15">Log in</a>
                <a href="/register" onClick={() => setOpen(false)} className="px-4 py-3 rounded-lg text-center bg-[#1b1b2e] text-white font-semibold">Sign up</a>
              </>
            )}
          </div>
        </aside>
      </div>
    </header>
  );
}