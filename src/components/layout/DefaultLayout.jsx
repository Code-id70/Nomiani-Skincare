import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BottomNav from "./BottomNav";

export default function DefaultLayout({ showFooter = true }) {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
        {showFooter && <Footer />}
      </main>
      <BottomNav />
    </div>
  );
}
