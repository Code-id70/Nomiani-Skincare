import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Egg,
  Users,
  BarChart3,
  Settings,
  Plus,
  LogOut,
  X,
} from "lucide-react";

function AdminSidebar({ open, onClose }) {
  const navigation = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: Egg,
    },
    {
      name: "Customers",
      path: "/admin/customers",
      icon: Users,
    },
    {
      name: "Analytics",
      path: "/admin/analytics",
      icon: BarChart3,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  const navContent = (
    <>
      {/* Brand */}
      <div className="h-20 px-6 flex items-center border-b border-[#D4C5AB]/60">

        <NavLink
          to="/admin"
          className="flex items-center gap-3"
          onClick={onClose}
        >
          <div className="w-10 h-10 rounded-xl bg-[#785900] flex items-center justify-center">
            <Egg className="text-white" size={22} />
          </div>

          <div>
            <h1
              className="text-xl font-bold text-[#785900]"
              style={{ fontFamily: "Montserrat" }}
            >
              DELI EGGS
            </h1>

            <p className="text-[11px] text-gray-500">
              Admin Portal
            </p>
          </div>
        </NavLink>

      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">

        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-[#FFF0C7] text-[#785900] font-semibold"
                    : "text-gray-600 hover:bg-[#FFF8F2] hover:text-[#785900]"
                }`
              }
            >
              <Icon size={20} />

              <span className="text-sm">
                {item.name}
              </span>
            </NavLink>
          );
        })}

      </nav>

      {/* New Order / Product Action */}
      <div className="px-4 pb-4">

        <button
          type="button"
          className="w-full bg-[#FDC003] text-[#261A00] font-semibold py-3 rounded-xl hover:bg-[#FABD00] transition flex items-center justify-center gap-2"
          onClick={onClose}
        >
          <Plus size={18} />
          New Product
        </button>

      </div>

      {/* Logout */}
      <div className="border-t border-[#D4C5AB]/60 p-4">

        <button
          type="button"
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
          onClick={onClose}
        >
          <LogOut size={20} />

          <span className="text-sm font-medium">
            Logout
          </span>
        </button>

      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 z-50 w-[260px] bg-white border-r border-[#D4C5AB] flex-col">
        {navContent}
      </aside>

      {/* Mobile Drawer */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-[280px] bg-white border-r border-[#D4C5AB] flex-col
          transform transition-transform duration-300 ease-in-out lg:hidden
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between px-4 h-20 border-b border-[#D4C5AB]/60">
          <span className="text-lg font-bold text-[#785900]" style={{ fontFamily: "Montserrat" }}>
            Menu
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#FFF8F2] text-gray-500"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {navContent}
        </div>
      </div>
    </>
  );
}

export default AdminSidebar;