import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/admin/login", { replace: true });
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FFF8F2] text-[#201B11]">

      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-[260px] min-h-screen flex flex-col">

        <AdminHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>

      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

    </div>
  );
}

export default AdminLayout;