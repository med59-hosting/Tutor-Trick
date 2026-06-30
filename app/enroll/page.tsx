import NavbarWrapper from "@/components/NavbarWrapper";

const WHATSAPP_NUMBER = "923289819495"; // your number, country code, no + or spaces
const msg = encodeURIComponent("Hi! I want to enroll in TutorTrick. Here is my payment screenshot and reference ID.");

export default function Enroll() {
  return (
    <main className="min-h-screen">
      <NavbarWrapper />
      <section className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-sm font-semibold text-[#6c5ce7] mb-3 uppercase tracking-wide">Enrollment</p>
        <h1 className="font-display font-bold text-4xl mb-4">Enroll to unlock everything 🚀</h1>
        <p className="text-[#5a5b76] mb-10">Get full access to all quizzes, notes, and AI practice. Follow these 3 simple steps.</p>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-black/5 p-6">
            <div className="flex items-center gap-3 mb-3"><span className="w-8 h-8 rounded-full bg-[#1b1b2e] text-white grid place-items-center font-bold">1</span><h3 className="font-display font-bold text-lg">Send the fee</h3></div>
            <p className="text-[#5a5b76] text-sm mb-2">Send the amount to any of these:</p>
            <ul className="text-sm space-y-1">
              <li>📱 <b>JazzCash:</b> 0328-9819495</li>
              <li>👤 <b>Account holder:</b> Tutor Trick</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-black/5 p-6">
            <div className="flex items-center gap-3 mb-3"><span className="w-8 h-8 rounded-full bg-[#1b1b2e] text-white grid place-items-center font-bold">2</span><h3 className="font-display font-bold text-lg">Send proof on WhatsApp</h3></div>
            <p className="text-[#5a5b76] text-sm">Send the payment <b>screenshot</b> and your <b>reference ID</b> to our WhatsApp.</p>
          </div>

          <div className="bg-white rounded-2xl border border-black/5 p-6">
            <div className="flex items-center gap-3 mb-3"><span className="w-8 h-8 rounded-full bg-[#1b1b2e] text-white grid place-items-center font-bold">3</span><h3 className="font-display font-bold text-lg">Send your details</h3></div>
            <p className="text-[#5a5b76] text-sm">Also send the <b>name</b> and <b>email</b> you registered with, so we can activate your account.</p>
          </div>
        </div>

        <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`} target="_blank" rel="noopener noreferrer"
          className="mt-8 flex items-center justify-center gap-2 w-full bg-[#25D366] text-white rounded-xl py-4 font-bold text-lg hover:opacity-90 transition">
          💬 Send proof on WhatsApp
        </a>
        <p className="text-center text-xs text-[#5a5b76] mt-3">Once we confirm your payment, your account is activated — usually within a few hours.</p>
      </section>
    </main>
  );
}