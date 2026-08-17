import {
  ShoppingCart,
  Truck,
  CreditCard,
  Clock,
  TrendingUp,
  ArrowUpRight,
  AlertTriangle,
  Egg,
  MoreVertical,
  CalendarDays,
} from "lucide-react";

import AdminLayout from "../../components/admin/AdminLayout";

function AdminDashboard() {
  const stats = [
    {
      title: "Total Orders",
      value: "128",
      change: "+12%",
      icon: ShoppingCart,
      positive: true,
    },
    {
      title: "Today's Orders",
      value: "24",
      icon: Truck,
    },
    {
      title: "Revenue",
      value: "R12,450",
      icon: CreditCard,
    },
    {
      title: "Pending Orders",
      value: "8",
      icon: Clock,
    },
  ];

  const recentOrders = [
    {
      id: "#DE1001",
      customer: "Thabo Mokoena",
      product: "Large Eggs x2",
      type: "Delivery",
      total: "R190",
      status: "Pending",
    },
    {
      id: "#DE1002",
      customer: "Sarah Mokoena",
      product: "Jumbo Eggs x1",
      type: "Collection",
      total: "R110",
      status: "Completed",
    },
    {
      id: "#DE1003",
      customer: "James Nkosi",
      product: "Large Eggs x1",
      type: "Delivery",
      total: "R95",
      status: "Preparing",
    },
    {
      id: "#DE1004",
      customer: "Lerato Molefe",
      product: "Jumbo Eggs x2",
      type: "Delivery",
      total: "R220",
      status: "Confirmed",
    },
  ];

  const lowStock = [
    {
      name: "Medium Eggs",
      size: "30 Tray",
      stock: 0,
    },
    {
      name: "Half Tray",
      size: "15 Eggs",
      stock: 0,
    },
  ];

  return (
    <AdminLayout>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">

        <div>
          <h1
            className="text-3xl lg:text-4xl font-bold text-[#201B11]"
            style={{ fontFamily: "Montserrat" }}
          >
            Good morning, Admin
          </h1>

          <p className="text-gray-500 mt-2">
            Here's what's happening with DELI EGGS today.
          </p>
        </div>

        <button
          type="button"
          className="w-fit bg-white border border-[#D4C5AB] px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-[#FFF8F2] transition"
        >
          <CalendarDays size={18} />
          Today
        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="bg-white border border-[#D4C5AB] rounded-2xl p-6 shadow-[0_4px_20px_rgba(120,89,0,0.05)] hover:-translate-y-0.5 transition"
            >

              <div className="flex items-start justify-between mb-5">

                <div className="w-11 h-11 rounded-xl bg-[#FDC003]/20 text-[#785900] flex items-center justify-center">
                  <Icon size={21} />
                </div>

                {stat.change && (
                  <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-1 rounded-full flex items-center gap-1">
                    <TrendingUp size={13} />
                    {stat.change}
                  </span>
                )}

              </div>

              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                {stat.title}
              </p>

              <p className="text-3xl font-bold text-[#201B11]">
                {stat.value}
              </p>

            </div>
          );
        })}

      </div>

      {/* Main Content */}
      <div className="grid xl:grid-cols-[1fr_360px] gap-6">

        {/* Recent Orders */}
        <div className="bg-white border border-[#D4C5AB] rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(120,89,0,0.05)]">

          <div className="p-6 border-b border-[#D4C5AB] flex items-center justify-between">

            <div>
              <h2
                className="text-xl font-bold"
                style={{ fontFamily: "Montserrat" }}
              >
                Recent Orders
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Latest customer orders
              </p>
            </div>

            <button
              type="button"
              className="text-sm font-semibold text-[#785900] hover:underline flex items-center gap-1"
            >
              View all
              <ArrowUpRight size={16} />
            </button>

          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b border-[#D4C5AB]/60 text-xs uppercase tracking-wider text-gray-500">
                  <th className="text-left p-4">Order</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Product</th>
                  <th className="text-left p-4">Type</th>
                  <th className="text-right p-4">Total</th>
                  <th className="text-center p-4">Status</th>
                  <th className="p-4"></th>
                </tr>
              </thead>

              <tbody>

                {recentOrders.map((order) => (

                  <tr
                    key={order.id}
                    className="border-b border-[#D4C5AB]/40 hover:bg-[#FFF8F2] transition"
                  >

                    <td className="p-4 font-semibold text-[#785900]">
                      {order.id}
                    </td>

                    <td className="p-4 text-sm">
                      {order.customer}
                    </td>

                    <td className="p-4 text-sm text-gray-500">
                      {order.product}
                    </td>

                    <td className="p-4 text-sm text-gray-500">
                      {order.type}
                    </td>

                    <td className="p-4 text-right font-semibold">
                      {order.total}
                    </td>

                    <td className="p-4 text-center">

                      <StatusBadge status={order.status} />

                    </td>

                    <td className="p-4">

                      <button
                        type="button"
                        className="p-2 rounded-lg text-gray-400 hover:text-[#785900] hover:bg-amber-50"
                      >
                        <MoreVertical size={18} />
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* Mobile orders */}
          <div className="md:hidden divide-y divide-[#D4C5AB]/40">

            {recentOrders.map((order) => (

              <div
                key={order.id}
                className="p-5"
              >

                <div className="flex justify-between items-start">

                  <div>
                    <p className="font-semibold text-[#785900]">
                      {order.id}
                    </p>

                    <p className="font-medium mt-1">
                      {order.customer}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      {order.product}
                    </p>
                  </div>

                  <StatusBadge status={order.status} />

                </div>

                <div className="flex justify-between mt-4 text-sm">

                  <span className="text-gray-500">
                    {order.type}
                  </span>

                  <span className="font-bold">
                    {order.total}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Low Stock */}
        <div className="bg-white border border-[#D4C5AB] rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(120,89,0,0.05)]">

          <div className="p-6 border-b border-red-200 bg-red-50 flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <AlertTriangle size={20} />
            </div>

            <div>
              <h2
                className="font-bold text-red-700"
                style={{ fontFamily: "Montserrat" }}
              >
                Low Stock Alerts
              </h2>

              <p className="text-xs text-red-500 mt-1">
                Products requiring attention
              </p>
            </div>

          </div>

          <div className="p-4 space-y-3">

            {lowStock.map((product) => (

              <div
                key={product.name}
                className="flex items-center justify-between p-4 rounded-xl border border-red-200 hover:bg-red-50/50 transition"
              >

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-[#FFF8F2] text-[#785900] flex items-center justify-center">
                    <Egg size={21} />
                  </div>

                  <div>
                    <p className="font-semibold text-sm">
                      {product.name}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {product.size}
                    </p>
                  </div>

                </div>

                <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {product.stock} left
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Pending:
      "bg-amber-100 text-amber-800",

    Confirmed:
      "bg-blue-100 text-blue-700",

    Preparing:
      "bg-purple-100 text-purple-700",

    Completed:
      "bg-teal-50 text-teal-700",

    Cancelled:
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

export default AdminDashboard;