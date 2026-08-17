import {
  Menu,
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 h-20 bg-[#FFF8F2]/90 backdrop-blur-md border-b border-[#D4C5AB]">

      <div className="h-full px-4 sm:px-6 lg:px-10 flex items-center justify-between">

        {/* Mobile */}
        <div className="flex items-center gap-3 lg:hidden">

          <button
            type="button"
            className="p-2 rounded-lg hover:bg-amber-100 transition"
          >
            <Menu
              size={22}
              className="text-[#785900]"
            />
          </button>

          <h1
            className="text-xl font-bold text-[#785900]"
            style={{ fontFamily: "Montserrat" }}
          >
            DELI EGGS
          </h1>

        </div>

        {/* Desktop title */}
        <div className="hidden lg:block">

          <p className="text-sm text-gray-500">
            Admin Portal
          </p>

        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* Search */}
          <button
            type="button"
            className="p-2.5 rounded-full text-gray-500 hover:bg-amber-100 hover:text-[#785900] transition"
          >
            <Search size={20} />
          </button>

          {/* Notifications */}
          <button
            type="button"
            className="relative p-2.5 rounded-full text-gray-500 hover:bg-amber-100 hover:text-[#785900] transition"
          >
            <Bell size={20} />

            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Admin Profile */}
          <button
            type="button"
            className="flex items-center gap-2 ml-2 pl-2 border-l border-[#D4C5AB]"
          >

            <div className="w-9 h-9 rounded-full bg-[#785900] text-white flex items-center justify-center font-semibold text-sm">
              A
            </div>

            <div className="hidden md:block text-left">

              <p className="text-sm font-semibold text-gray-800">
                Admin
              </p>

              <p className="text-xs text-gray-500">
                Administrator
              </p>

            </div>

            <ChevronDown
              size={16}
              className="hidden md:block text-gray-400"
            />

          </button>

        </div>

      </div>

    </header>
  );
}

export default AdminHeader;