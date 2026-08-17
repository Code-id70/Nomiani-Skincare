import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#FFF8F2] text-[#201B11]">

      <AdminSidebar />

      <div className="lg:pl-[260px] min-h-screen flex flex-col">

        <AdminHeader />

        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;