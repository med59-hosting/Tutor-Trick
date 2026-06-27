"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";

type U = { name?: string | null; email?: string | null; image?: string | null; phone?: string | null; address?: string | null };

export default function ProfileMenu({ user }: { user: U }) {
  const [open, setOpen] = useState(false);
  const initials = (user.name || "U").split(" ").map((w) => w[0]).slice(0, 2).join("");
  const imgSrc = user.image ? `/api/avatar?p=${encodeURIComponent(user.image)}` : null;

  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)} aria-label="Profile" className="w-9 h-9 rounded-full overflow-hidden border-2 border-black/10 hover:border-[#1b1b2e] transition grid place-items-center bg-[#6c5ce7] text-white font-bold">
        {imgSrc ? <img src={imgSrc} alt="" className="w-full h-full object-cover" /> : initials}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-black/5 p-5 z-50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-[#6c5ce7] text-white grid place-items-center font-bold text-xl shrink-0">
                {imgSrc ? <img src={imgSrc} alt="" className="w-full h-full object-cover" /> : initials}
              </div>
              <div className="min-w-0">
                <p className="font-display font-bold truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm border-t border-black/5 pt-3">
              <div><span className="text-gray-400">Phone</span><p className="font-medium">{user.phone || "—"}</p></div>
              <div><span className="text-gray-400">Address</span><p className="font-medium">{user.address || "—"}</p></div>
            </div>
            <div className="flex gap-2 mt-4">
              <a href="/dashboard" className="flex-1 text-center text-sm bg-[#1b1b2e] text-white rounded-lg py-2 font-semibold">Dashboard</a>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="flex-1 text-sm border border-black/15 rounded-lg py-2 font-semibold">Log out</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}