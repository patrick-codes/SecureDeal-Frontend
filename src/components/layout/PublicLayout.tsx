import { type ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-bg text-textPrimary">
      <Navbar />
      <main className="pt-0">{children}</main>
      <Footer />
    </div>
  );
}
