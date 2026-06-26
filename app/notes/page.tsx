import Navbar from "@/components/Navbar";

export default function Notes() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="max-w-3xl mx-auto px-6 py-32 text-center">
        <h1 className="font-display font-bold text-4xl mb-4">Notes are coming soon 📒</h1>
        <p className="text-[#5a5b76] text-lg">We&apos;re building a place to save and review your study notes. Check back shortly.</p>
      </section>
    </main>
  );
}