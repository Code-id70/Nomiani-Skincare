import { useState } from "react";
import {
  TrendingUp,
  ShoppingBag,
  Users,
  DollarSign,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays,
} from "lucide-react";

import AdminLayout from "../../components/admin/AdminLayout";

function AdminAnalytics() {
  const [period, setPeriod] = useState("7_days");

  const analytics = {
    revenue: 8450,
    orders: 86,
    customers: 42,
    averageOrder: 98.26,
    productsSold: 164,
  };

  const revenueData = [
    { day: "Mon", value: 850 },
    { day: "Tue", value: 1120 },
    { day: "Wed", value: 760 },
    { day: "Thu", value: 1340 },
    { day: "Fri", value: 1580 },
    { day: "Sat", value: 1710 },
    { day: "Sun", value: 1090 },
  ];

  const maxRevenue = Math.max(
    ...revenueData.map((item) => item.value)
  );

  const topProducts = [
    {
      name: "Large Eggs",
      units: 82,
      revenue: 7790,
    },
    {
      name: "Jumbo Eggs",
      units: 51,
      revenue: 5610,
    },
    {
      name: "Medium Eggs",
      units: 31,
      revenue: 2635,
    },
  ];

  const orderStatus = [
    {
      name: "Completed",
      count: 54,
      percentage: 63,
      className: "bg-emerald-500",
    },
    {
      name: "Processing",
      count: 18,
      percentage: 21,
      className: "bg-amber-500",
    },
    {
      name: "Pending",
      count: 9,
      percentage: 10,
      className: "bg-blue-500",
    },
    {
      name: "Cancelled",
      count: 5,
      percentage: 6,
      className: "bg-red-500",
    },
  ];

  return (
    <AdminLayout>

      {/* =========================================================
          HEADER
      ========================================================== */}

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8">

        <div>

          <h1
            className="text-3xl lg:text-4xl font-bold text-[#201B11]"
            style={{ fontFamily: "Montserrat" }}
          >
            Analytics
          </h1>

          <p className="text-gray-500 mt-2">
            Track DELI EGGS performance, sales and customer activity.
          </p>

        </div>


        {/* Period Selector */}

        <div className="flex items-center gap-2 bg-white border border-[#D4C5AB] rounded-lg p-1 shadow-sm">

          <CalendarDays
            size={18}
            className="text-gray-500 ml-2"
          />

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="border-none bg-transparent outline-none text-sm font-semibold text-[#201B11] px-2 py-2 cursor-pointer"
          >
            <option value="7_days">Last 7 days</option>
            <option value="30_days">Last 30 days</option>
            <option value="90_days">Last 90 days</option>
            <option value="year">This year</option>
          </select>

        </div>

      </div>


      {/* =========================================================
          STAT CARDS
      ========================================================== */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-6">

        <AnalyticsStat
          title="Revenue"
          value={`R${analytics.revenue.toLocaleString()}`}
          change="+12.5%"
          positive
          icon={DollarSign}
        />

        <AnalyticsStat
          title="Orders"
          value={analytics.orders}
          change="+8.2%"
          positive
          icon={ShoppingBag}
        />

        <AnalyticsStat
          title="Customers"
          value={analytics.customers}
          change="+6.4%"
          positive
          icon={Users}
        />

        <AnalyticsStat
          title="Avg. Order Value"
          value={`R${analytics.averageOrder.toFixed(2)}`}
          change="-2.1%"
          positive={false}
          icon={TrendingUp}
        />

      </div>


      {/* =========================================================
          REVENUE CHART
      ========================================================== */}

      <div className="bg-white border border-[#D4C5AB] rounded-xl p-5 lg:p-6 shadow-[0_4px_20px_rgba(120,89,0,0.05)] mb-6">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">

          <div>

            <h2
              className="text-xl font-semibold text-[#201B11]"
              style={{ fontFamily: "Montserrat" }}
            >
              Revenue Overview
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Sales performance for the selected period.
            </p>

          </div>

          <div className="flex items-center gap-2 text-sm text-emerald-600 font-semibold">

            <ArrowUpRight size={17} />

            12.5% vs previous period

          </div>

        </div>


        {/* Chart */}

        <div className="h-64 flex items-end gap-3 sm:gap-5">

          {revenueData.map((item) => {

            const height =
              (item.value / maxRevenue) * 100;

            return (
              <div
                key={item.day}
                className="flex-1 h-full flex flex-col justify-end items-center gap-3"
              >

                <div className="relative w-full flex-1 flex items-end justify-center">

                  <div
                    className="w-full max-w-[52px] bg-[#785900] rounded-t-lg hover:bg-[#5B4200] transition-all cursor-pointer group relative"
                    style={{
                      height: `${height}%`,
                    }}
                  >

                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#201B11] text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap">
                      R{item.value.toLocaleString()}
                    </div>

                  </div>

                </div>

                <span className="text-xs text-gray-500">
                  {item.day}
                </span>

              </div>
            );
          })}

        </div>

      </div>


      {/* =========================================================
          LOWER ANALYTICS
      ========================================================== */}

      <div className="grid lg:grid-cols-2 gap-6 mb-6">


        {/* TOP PRODUCTS */}

        <div className="bg-white border border-[#D4C5AB] rounded-xl p-5 lg:p-6 shadow-[0_4px_20px_rgba(120,89,0,0.05)]">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2
                className="text-xl font-semibold text-[#201B11]"
                style={{ fontFamily: "Montserrat" }}
              >
                Top Products
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Best performing products.
              </p>

            </div>

            <Package
              size={21}
              className="text-[#785900]"
            />

          </div>


          <div className="space-y-5">

            {topProducts.map((product, index) => {

              const maxUnits = topProducts[0].units;

              const percentage =
                (product.units / maxUnits) * 100;

              return (
                <div key={product.name}>

                  <div className="flex items-center justify-between mb-2">

                    <div className="flex items-center gap-3">

                      <div className="w-8 h-8 rounded-lg bg-[#F3E6C5] text-[#785900] flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>

                      <div>

                        <p className="font-semibold text-[#201B11] text-sm">
                          {product.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {product.units} units sold
                        </p>

                      </div>

                    </div>

                    <span className="font-semibold text-[#785900] text-sm">
                      R{product.revenue.toLocaleString()}
                    </span>

                  </div>


                  <div className="h-2 bg-[#F3EDE7] rounded-full overflow-hidden">

                    <div
                      className="h-full bg-[#785900] rounded-full transition-all"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />

                  </div>

                </div>
              );
            })}

          </div>

        </div>


        {/* ORDER STATUS */}

        <div className="bg-white border border-[#D4C5AB] rounded-xl p-5 lg:p-6 shadow-[0_4px_20px_rgba(120,89,0,0.05)]">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2
                className="text-xl font-semibold text-[#201B11]"
                style={{ fontFamily: "Montserrat" }}
              >
                Order Status
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Overview of current orders.
              </p>

            </div>

            <ShoppingBag
              size={21}
              className="text-[#785900]"
            />

          </div>


          {/* Status Bars */}

          <div className="space-y-5">

            {orderStatus.map((status) => (

              <div key={status.name}>

                <div className="flex items-center justify-between mb-2">

                  <div className="flex items-center gap-2">

                    <span
                      className={`w-2.5 h-2.5 rounded-full ${status.className}`}
                    />

                    <span className="text-sm font-medium text-[#201B11]">
                      {status.name}
                    </span>

                  </div>

                  <div className="flex items-center gap-3">

                    <span className="text-sm font-semibold">
                      {status.count}
                    </span>

                    <span className="text-xs text-gray-500">
                      {status.percentage}%
                    </span>

                  </div>

                </div>


                <div className="h-2 bg-[#F3EDE7] rounded-full overflow-hidden">

                  <div
                    className={`h-full rounded-full ${status.className}`}
                    style={{
                      width: `${status.percentage}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>


      {/* =========================================================
          PRODUCT SALES SUMMARY
      ========================================================== */}

      <div className="bg-white border border-[#D4C5AB] rounded-xl shadow-[0_4px_20px_rgba(120,89,0,0.05)] overflow-hidden">

        <div className="p-5 lg:p-6 border-b border-[#D4C5AB]">

          <h2
            className="text-xl font-semibold text-[#201B11]"
            style={{ fontFamily: "Montserrat" }}
          >
            Sales Summary
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Product performance during the selected period.
          </p>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="bg-[#F9F2EC] border-b border-[#D4C5AB]">

              <tr>

                <th className="px-5 py-4 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  Product
                </th>

                <th className="px-5 py-4 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  Units Sold
                </th>

                <th className="px-5 py-4 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  Revenue
                </th>

                <th className="px-5 py-4 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  Performance
                </th>

              </tr>

            </thead>

            <tbody>

              {topProducts.map((product) => (

                <tr
                  key={product.name}
                  className="border-b border-[#D4C5AB]/50 hover:bg-[#FFF8F2] transition"
                >

                  <td className="px-5 py-4 font-semibold text-[#201B11]">
                    {product.name}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {product.units}
                  </td>

                  <td className="px-5 py-4 font-semibold text-[#785900]">
                    R{product.revenue.toLocaleString()}
                  </td>

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">

                      <span className="text-emerald-600 text-sm font-semibold flex items-center gap-1">
                        <ArrowUpRight size={15} />
                        Strong
                      </span>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>
  );
}


/* =========================================================
   ANALYTICS STAT CARD
========================================================= */

function AnalyticsStat({
  title,
  value,
  change,
  positive,
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

          <div
            className={`flex items-center gap-1 mt-2 text-xs font-semibold ${
              positive
                ? "text-emerald-600"
                : "text-red-600"
            }`}
          >

            {positive ? (
              <ArrowUpRight size={14} />
            ) : (
              <ArrowDownRight size={14} />
            )}

            {change}

            <span className="text-gray-400 font-normal ml-1">
              vs previous
            </span>

          </div>

        </div>


        <div className="w-10 h-10 rounded-full bg-[#F3E6C5] text-[#785900] flex items-center justify-center">

          <Icon size={19} />

        </div>

      </div>

    </div>
  );
}

export default AdminAnalytics;