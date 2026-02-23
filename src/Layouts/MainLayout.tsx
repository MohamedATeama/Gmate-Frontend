import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
      <div className="bg-background text-foreground flex min-h-screen flex-col">
        <Header
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
  );
}
