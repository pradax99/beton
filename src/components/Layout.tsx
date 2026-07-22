import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  const isDesigner = pathname.startsWith("/designer");

  return (
    <div className="flex min-h-screen flex-col bg-concrete-100">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      {!isDesigner && <Footer />}
    </div>
  );
}
