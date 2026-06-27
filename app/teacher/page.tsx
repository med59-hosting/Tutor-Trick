import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AddQuestion from "./AddQuestion";
import NavbarWrapper from "@/components/NavbarWrapper";

export default async function TeacherPage() {
  const session = await auth();
  if ((session?.user as any)?.role !== "teacher") redirect("/dashboard");
  return (
    <>
      <NavbarWrapper />
      <div className="max-w-lg mx-auto mt-12 p-6">
        <h1 className="text-2xl font-bold mb-4">Add a question</h1>
        <AddQuestion />
      </div>
    </>
  );
}