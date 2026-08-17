import { useState } from "react";
import {
  Receipt,
  Clock3,
  Truck,
  CheckCircle2,
//   Filter,
//   CalendarDays,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Search,
  CreditCard,
} from "lucide-react";

import AdminLayout from "../../components/admin/AdminLayout";

function AdminOrders() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("Last 30 Days");
  const [search, setSearch] = useState("");

  const orders = [
    {
      id: "#DELI-092",
      customer: "Eleanor Shellstrop",
      initials: "ES",
      items: 2,
      type: "Delivery",
      total: 190,
      payment: "Paid",
      status: "Pending",
      date: "Today, 10:42 AM",
    },
    {
      id: "#DELI-091",
      customer: "Jason Mendoza",
      initials: "JM",
      items: 5,
      type: "Collection",
      total: 142,
      payment: "Paid",
      status: "In Progress",
      date: "Today, 09:15 AM",
    },
    {
      id: "#DELI-090",
      customer: "Tahani Al-Jamil",
      initials: "TA",
      items: 1,
      type: "Delivery",
      total: 95,
      payment: "Paid",
      status: "Completed",
      date: "Yesterday, 04:30 PM",
    },
    {
      id: "#DELI-089",
      customer: "Chidi Anagonye",
      initials: "CA",
      items: 3,
      type: "Delivery",
      total: 285,
      payment: "Failed",
      status: "Cancelled",
      date: "Yesterday, 02:10 PM",
    },
    {
      id: "#DELI-088",
      customer: "Thabo Mokoena",
      initials: "TM",
      items: 2,
      type: "Collection",
      total: 220,
      payment: "Paid",
      status: "Completed",
      date: "Yesterday, 12:45 PM",
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>

      {/* Page Header */}
      <div className="mb-8">

        <h1
          className="text-3xl lg:text-4xl font-bold text-[#201B11]"
          style={{ fontFamily: "Montserrat" }}
        >
          Orders
        </h1>

        <p className="text-gray-500 mt-2">
          Manage and track all DELI EGGS orders.
        </p>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-6">

        <OrderStatCard
          title="Total Orders"
          value="1,248"
          change="12%"
          icon={Receipt}
          type="success"
        />

        <OrderStatCard
          title="Pending"
          value="42"
          subtitle="Needs review"
          icon={Clock3}
          type="warning"
        />

        <OrderStatCard
          title="In Progress"
          value="18"
          subtitle="Out for delivery"
          icon={Truck}
          type="primary"
        />

        <OrderStatCard
          title="Completed"
          value="1,188"
          subtitle="This month"
          icon={CheckCircle2}
          type="success"
        />

      </div>

      {/* Toolbar */}
      <div className="bg-white border border-[#D4C5AB] rounded-xl p-4 mb-6 shadow-[0_4px_20px_rgba(120,89,0,0.05)]">

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

          {/* Search + Filters */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

            {/* Search */}
            <div className="relative">

              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-64 h-10 pl-10 pr-4 rounded-lg border border-[#D4C5AB] bg-[#FFF8F2] outline-none focus:border-[#785900] focus:ring-2 focus:ring-[#785900]/10 text-sm"
              />

            </div>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-3 rounded-lg border border-[#D4C5AB] bg-white text-sm outline-none focus:border-[#785900]"
            >
              <option value="All">Status: All</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            {/* Date */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="h-10 px-3 rounded-lg border border-[#D4C5AB] bg-white text-sm outline-none focus:border-[#785900]"
            >
              <option>Last 30 Days</option>
              <option>Today</option>
              <option>Last 7 Days</option>
              <option>This Month</option>
            </select>

          </div>

          {/* Export */}
          <button
            type="button"
            className="h-10 px-4 rounded-lg text-[#785900] font-semibold text-sm hover:bg-[#FFF8F2] transition flex items-center justify-center gap-2"
          >
            <Download size={18} />
            Export CSV
          </button>

        </div>

      </div>

      {/* Orders Table */}
      <div className="bg-white border border-[#D4C5AB] rounded-xl shadow-[0_4px_20px_rgba(120,89,0,0.05)] overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1000px]">

            <thead>

              <tr className="bg-[#F9F2EC] border-b border-[#D4C5AB]">

                <TableHeader>Order ID</TableHeader>
                <TableHeader>Customer</TableHeader>
                <TableHeader>Items</TableHeader>
                <TableHeader>Type</TableHeader>
                <TableHeader>Total</TableHeader>
                <TableHeader>Payment</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Date</TableHeader>
                <TableHeader align="right">Actions</TableHeader>

              </tr>

            </thead>

            <tbody>

              {filteredOrders.map((order) => (

                <tr
                  key={order.id}
                  className="border-b border-[#D4C5AB]/50 hover:bg-[#FFF8F2] transition group"
                >

                  {/* Order ID */}
                  <td className="px-4 py-4 font-bold text-[#785900]">
                    {order.id}
                  </td>

                  {/* Customer */}
                  <td className="px-4 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-full bg-[#F3E6C5] text-[#785900] flex items-center justify-center text-xs font-bold">
                        {order.initials}
                      </div>

                      <span className="text-sm font-medium whitespace-nowrap">
                        {order.customer}
                      </span>

                    </div>

                  </td>

                  {/* Items */}
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {order.items} {order.items === 1 ? "item" : "items"}
                  </td>

                  {/* Type */}
                  <td className="px-4 py-4 text-sm">
                    {order.type}
                  </td>

                  {/* Total */}
                  <td className="px-4 py-4 font-semibold">
                    R {order.total.toLocaleString()}
                  </td>

                  {/* Payment */}
                  <td className="px-4 py-4">

                    <span
                      className={`flex items-center gap-1.5 text-sm ${
                        order.payment === "Failed"
                          ? "text-red-600"
                          : "text-gray-500"
                      }`}
                    >
                      <CreditCard size={15} />
                      {order.payment}
                    </span>

                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">
                    <StatusBadge status={order.status} />
                  </td>

                  {/* Date */}
                  <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {order.date}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4 text-right">

                    <button
                      type="button"
                      className="p-2 rounded-lg text-gray-400 hover:text-[#785900] hover:bg-[#FFF0C7] transition"
                    >
                      <MoreVertical size={19} />
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="py-16 text-center">

            <Receipt
              size={40}
              className="mx-auto text-gray-300 mb-3"
            />

            <h3 className="font-semibold text-gray-700">
              No orders found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Try changing your search or filters.
            </p>

          </div>
        )}

        {/* Pagination */}
        <div className="px-4 py-4 border-t border-[#D4C5AB] flex flex-col sm:flex-row items-center justify-between gap-4">

          <span className="text-sm text-gray-500">
            Showing 1 to {filteredOrders.length} of 1,248 entries
          </span>

          <div className="flex items-center gap-1">

            <button
              type="button"
              disabled
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#D4C5AB] text-gray-400 disabled:opacity-50"
            >
              <ChevronLeft size={17} />
            </button>

            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#785900] text-white text-sm font-semibold"
            >
              1
            </button>

            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#D4C5AB] text-sm hover:bg-[#FFF8F2]"
            >
              2
            </button>

            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#D4C5AB] text-sm hover:bg-[#FFF8F2]"
            >
              3
            </button>

            <span className="px-2 text-gray-400">
              ...
            </span>

            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#D4C5AB] text-gray-600 hover:bg-[#FFF8F2]"
            >
              <ChevronRight size={17} />
            </button>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}

/* =========================
   STAT CARD
========================= */

function OrderStatCard({
  title,
  value,
  change,
  subtitle,
  icon: Icon,
  type,
}) {
  const iconStyles = {
    success: "bg-[#F3EDE7] text-[#785900]",
    warning: "bg-[#FFF0C7] text-[#785900]",
    primary: "bg-[#FFDF9E] text-[#785900]",
  };

  return (
    <div className="bg-white border border-[#D4C5AB] rounded-xl p-5 lg:p-6 shadow-[0_4px_20px_rgba(120,89,0,0.05)]">

      <div className="flex items-start justify-between gap-3">

        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {title}
        </span>

        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center ${
            iconStyles[type]
          }`}
        >
          <Icon size={18} />
        </div>

      </div>

      <div className="flex items-baseline gap-2 mt-4">

        <span className="text-2xl lg:text-3xl font-bold text-[#201B11]">
          {value}
        </span>

        {change && (
          <span className="text-xs font-semibold text-teal-700 flex items-center gap-0.5">
            ↑ {change}
          </span>
        )}

        {subtitle && (
          <span className="text-xs text-gray-500">
            {subtitle}
          </span>
        )}

      </div>

    </div>
  );
}

/* =========================
   TABLE HEADER
========================= */

function TableHeader({ children, align = "left" }) {
  return (
    <th
      className={`px-4 py-4 text-xs uppercase tracking-wider text-gray-500 font-semibold text-${align}`}
    >
      {children}
    </th>
  );
}

/* =========================
   STATUS BADGE
========================= */

function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-[#FFDF9E] text-[#5B4300]",
    "In Progress": "bg-[#FFDF9E] text-[#5B4300]",
    Completed: "bg-[#E6F3F5] text-[#006877]",
    Cancelled: "bg-[#FFDAD6] text-[#BA1A1A]",
  };

  return (
    <span
      className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

export default AdminOrders;