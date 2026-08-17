import { useMemo, useState } from "react";
import {
  Search,
  Users,
  UserPlus,
  ShoppingBag,
  MoreVertical,
  Eye,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import AdminLayout from "../../components/admin/AdminLayout";

function AdminCustomers() {
  const [customers] = useState([
    {
      id: 1,
      firstName: "Eleanor",
      lastName: "Shellstrop",
      email: "eleanor@example.com",
      phone: "072 123 4567",
      address: "Pretoria, Gauteng",
      orders: 12,
      spent: 1450,
      joined: "12 May 2026",
    },
    {
      id: 2,
      firstName: "Jason",
      lastName: "Mendoza",
      email: "jason@example.com",
      phone: "073 456 7890",
      address: "Centurion, Gauteng",
      orders: 7,
      spent: 820,
      joined: "18 May 2026",
    },
    {
      id: 3,
      firstName: "Tahani",
      lastName: "Al-Jamil",
      email: "tahani@example.com",
      phone: "076 222 3456",
      address: "Brooklyn, Pretoria",
      orders: 15,
      spent: 1890,
      joined: "25 May 2026",
    },
    {
      id: 4,
      firstName: "Chidi",
      lastName: "Anagonye",
      email: "chidi@example.com",
      phone: "078 987 6543",
      address: "Hatfield, Pretoria",
      orders: 4,
      spent: 430,
      joined: "02 June 2026",
    },
    {
      id: 5,
      firstName: "Thabo",
      lastName: "Mokoena",
      email: "thabo@example.com",
      phone: "079 555 1234",
      address: "Sunnyside, Pretoria",
      orders: 21,
      spent: 2450,
      joined: "07 June 2026",
    },
  ]);

  const [search, setSearch] = useState("");

  const filteredCustomers = useMemo(() => {
    if (!search.trim()) {
      return customers;
    }

    const query = search.toLowerCase();

    return customers.filter((customer) => {
      const fullName =
        `${customer.firstName} ${customer.lastName}`.toLowerCase();

      return (
        fullName.includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phone.includes(query)
      );
    });
  }, [customers, search]);

  const totalCustomers = customers.length;

  const totalOrders = customers.reduce(
    (sum, customer) => sum + customer.orders,
    0
  );

  const totalSpent = customers.reduce(
    (sum, customer) => sum + customer.spent,
    0
  );

  const repeatCustomers = customers.filter(
    (customer) => customer.orders >= 2
  ).length;

  return (
    <AdminLayout>

      {/* =========================================================
          PAGE HEADER
      ========================================================== */}

      <div className="mb-8">

        <h1
          className="text-3xl lg:text-4xl font-bold text-[#201B11]"
          style={{ fontFamily: "Montserrat" }}
        >
          Customers
        </h1>

        <p className="text-gray-500 mt-2">
          Manage and view your DELI EGGS customers.
        </p>

      </div>


      {/* =========================================================
          SUMMARY CARDS
      ========================================================== */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-6">

        <CustomerStat
          title="Total Customers"
          value={totalCustomers}
          icon={Users}
        />

        <CustomerStat
          title="New Customers"
          value="38"
          subtitle="This month"
          icon={UserPlus}
        />

        <CustomerStat
          title="Repeat Customers"
          value={repeatCustomers}
          subtitle="Returning customers"
          icon={ShoppingBag}
        />

        <CustomerStat
          title="Customer Spend"
          value={`R${totalSpent.toLocaleString()}`}
          subtitle={`${totalOrders} total orders`}
          icon={Users}
        />

      </div>


      {/* =========================================================
          SEARCH
      ========================================================== */}

      <div className="bg-white border border-[#D4C5AB] rounded-xl p-4 mb-6 shadow-[0_4px_20px_rgba(120,89,0,0.05)]">

        <div className="relative w-full lg:max-w-md">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers..."
            className="w-full h-11 pl-10 pr-4 bg-[#FFF8F2] border border-[#D4C5AB] rounded-lg outline-none text-sm focus:border-[#785900] focus:ring-2 focus:ring-[#785900]/10"
          />

        </div>

      </div>


      {/* =========================================================
          DESKTOP TABLE
      ========================================================== */}

      <div className="hidden sm:block bg-white rounded-xl border border-[#D4C5AB] shadow-[0_4px_20px_rgba(120,89,0,0.05)] overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="bg-[#F9F2EC] border-b border-[#D4C5AB]">

              <tr>

                <th className="px-4 py-4 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  Customer
                </th>

                <th className="px-4 py-4 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  Contact
                </th>

                <th className="px-4 py-4 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  Location
                </th>

                <th className="px-4 py-4 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  Orders
                </th>

                <th className="px-4 py-4 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  Total Spent
                </th>

                <th className="px-4 py-4 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  Joined
                </th>

                <th className="px-4 py-4 text-xs uppercase tracking-wider text-gray-500 font-semibold text-right">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredCustomers.map((customer) => {

                const initials =
                  `${customer.firstName.charAt(0)}${customer.lastName.charAt(0)}`;

                return (
                  <tr
                    key={customer.id}
                    className="border-b border-[#D4C5AB]/50 hover:bg-[#FFF8F2] transition-colors"
                  >

                    {/* Customer */}

                    <td className="px-4 py-4">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-[#F3E6C5] text-[#785900] flex items-center justify-center text-xs font-bold">
                          {initials}
                        </div>

                        <div>

                          <p className="font-semibold text-[#201B11]">
                            {customer.firstName}{" "}
                            {customer.lastName}
                          </p>

                          <p className="text-xs text-gray-500 mt-0.5">
                            Customer #{customer.id}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* Contact */}

                    <td className="px-4 py-4">

                      <div className="space-y-1">

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail size={14} />
                          {customer.email}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Phone size={14} />
                          {customer.phone}
                        </div>

                      </div>

                    </td>


                    {/* Location */}

                    <td className="px-4 py-4">

                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin size={15} />
                        {customer.address}
                      </div>

                    </td>


                    {/* Orders */}

                    <td className="px-4 py-4">

                      <span className="font-semibold text-[#201B11]">
                        {customer.orders}
                      </span>

                    </td>


                    {/* Spent */}

                    <td className="px-4 py-4">

                      <span className="font-semibold text-[#785900]">
                        R{customer.spent.toLocaleString()}
                      </span>

                    </td>


                    {/* Joined */}

                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {customer.joined}
                    </td>


                    {/* Actions */}

                    <td className="px-4 py-4">

                      <div className="flex justify-end gap-1">

                        <button
                          type="button"
                          title="View Customer"
                          className="p-2 rounded-md text-gray-500 hover:text-[#785900] hover:bg-[#F3EDE7] transition"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          type="button"
                          className="p-2 rounded-md text-gray-500 hover:text-[#785900] hover:bg-[#F3EDE7] transition"
                        >
                          <MoreVertical size={18} />
                        </button>

                      </div>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>


        {/* Empty State */}

        {filteredCustomers.length === 0 && (
          <div className="py-16 text-center">

            <Users
              size={42}
              className="mx-auto text-gray-300 mb-3"
            />

            <h3 className="font-semibold text-gray-700">
              No customers found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Try searching for another customer.
            </p>

          </div>
        )}

      </div>


      {/* =========================================================
          MOBILE CUSTOMER CARDS
      ========================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:hidden">

        {filteredCustomers.map((customer) => {

          const initials =
            `${customer.firstName.charAt(0)}${customer.lastName.charAt(0)}`;

          return (
            <div
              key={customer.id}
              className="bg-white rounded-xl border border-[#D4C5AB] p-4 shadow-sm"
            >

              <div className="flex items-start gap-3">

                <div className="w-12 h-12 rounded-full bg-[#F3E6C5] text-[#785900] flex items-center justify-center text-sm font-bold">
                  {initials}
                </div>

                <div className="flex-1 min-w-0">

                  <div className="flex items-start justify-between">

                    <div>

                      <h3 className="font-semibold text-[#201B11]">
                        {customer.firstName}{" "}
                        {customer.lastName}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        Customer #{customer.id}
                      </p>

                    </div>

                    <button
                      type="button"
                      className="text-gray-500"
                    >
                      <MoreVertical size={20} />
                    </button>

                  </div>

                </div>

              </div>


              <div className="mt-4 space-y-2">

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Mail size={15} />
                  <span className="truncate">
                    {customer.email}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Phone size={15} />
                  {customer.phone}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={15} />
                  {customer.address}
                </div>

              </div>


              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#D4C5AB]/50">

                <div>

                  <p className="text-xs text-gray-500">
                    Orders
                  </p>

                  <p className="font-bold text-[#201B11] mt-1">
                    {customer.orders}
                  </p>

                </div>

                <div>

                  <p className="text-xs text-gray-500">
                    Total Spent
                  </p>

                  <p className="font-bold text-[#785900] mt-1">
                    R{customer.spent.toLocaleString()}
                  </p>

                </div>

              </div>


              <button
                type="button"
                className="w-full mt-4 py-2.5 rounded-lg bg-[#FFF8F2] text-[#785900] font-semibold text-sm hover:bg-[#F3EDE7] transition"
              >
                View Customer
              </button>

            </div>
          );
        })}

      </div>


      {/* =========================================================
          PAGINATION
      ========================================================== */}

      {filteredCustomers.length > 0 && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-sm text-gray-500">
            Showing {filteredCustomers.length} of{" "}
            {customers.length} customers
          </p>

          <div className="flex items-center gap-2">

            <button
              type="button"
              disabled
              className="px-4 py-2 rounded-lg border border-[#D4C5AB] text-gray-400 text-sm disabled:opacity-50"
            >
              Previous
            </button>

            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-[#785900] text-white text-sm font-semibold"
            >
              1
            </button>

            <button
              type="button"
              className="px-4 py-2 rounded-lg border border-[#D4C5AB] text-gray-600 text-sm hover:bg-[#FFF8F2]"
            >
              Next
            </button>

          </div>

        </div>
      )}

    </AdminLayout>
  );
}


/* =========================================================
   STAT CARD
========================================================= */

function CustomerStat({
  title,
  value,
  subtitle,
  icon: Icon,
}) {
  return (
    <div className="bg-white border border-[#D4C5AB] rounded-xl p-5 lg:p-6 shadow-[0_4px_20px_rgba(120,89,0,0.05)]">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs uppercase tracking-wider font-semibold text-gray-500">
            {title}
          </p>

          <p className="text-2xl lg:text-3xl font-bold text-[#201B11] mt-3">
            {value}
          </p>

          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">
              {subtitle}
            </p>
          )}

        </div>

        <div className="w-10 h-10 rounded-full bg-[#F3E6C5] text-[#785900] flex items-center justify-center">
          <Icon size={19} />
        </div>

      </div>

    </div>
  );
}

export default AdminCustomers;