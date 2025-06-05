import type { Metadata } from "next";
import FloatingNavMenu from "./components/FloatingNavMenu";


export const metadata: Metadata = {
  title: "Dashboard",
  description: "A platform that empowers communities to raise funds and support meaningful causes.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <FloatingNavMenu />
    </>
  );
}

