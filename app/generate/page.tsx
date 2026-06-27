import { getAccess } from "@/lib/access";
import LockedScreen from "@/components/LockedScreen";
import NavbarWrapper from "@/components/NavbarWrapper";
import GenerateForm from "./GenerateForm";

export default async function GeneratePage() {
  const { allowed } = await getAccess();
  if (!allowed) return <LockedScreen />;
  return (
    <>
      <NavbarWrapper />
      <GenerateForm />
    </>
  );
}