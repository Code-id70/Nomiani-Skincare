import { useState, useEffect } from "react";
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

import { getAnalytics } from "../../services/dashboardService";

function AdminAnalytics() {
  const [period, setPeriod] = useState("30_days");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [analytics, setAnalytics] = useState({
    revenue: 0,
    orders: 0,
    customers: 0,
    averageOrder: 0,
    productsSold: 0,
  });
  const [revenueData, setRevenueData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const res = await getAnalytics(period);

        if (cancelled) return;

        const data = res.data || {};

        const totalRevenue = data.revenue_by_day?.reduce((sum, day) => sum + (day.revenue || 0), 0) || 0;
        const totalOrders = data.orders_by_day?.reduce((sum, day) => sum + (day.count || 0), 0) || 0;
        const avgOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        setAnalytics({
          revenue: totalRevenue,
          orders: totalOrders,
          customers: data.total_customers || 0,
          averageOrder: avgOrder,
          productsSold: data.best_selling_products?.reduce((sum, p) => sum + (p.total_quantity || 0), 0) || 0,
        });

        setRevenueData(
          (data.revenue_by_day || []).map((day) => ({
            day: new Date(day.date).toLocaleDateString("en-US", {
              weekday: "short",
            }),
            value: day.revenue || 0,
          }))
        );

        setTopProducts(
          (data.best_selling_products || []).slice(0, 3).map((product) => ({
            name: product.product_name,
            units: product.total_quantity || 0,
            revenue: product.total_revenue || 0,
          }))
        );

        const deliveryCount = (data.delivery_vs_collection || []).find(
          (item) => item.order_type === "DELIVERY"
        )?.count || 0;

        setOrderStatus([
          {
            name: "Completed",
            count: 0,
            percentage: 0,
            className: "bg-emerald-500",
          },
          {
            name: "Processing",
            count: deliveryCount,
            percentage: totalOrders > 0 ? Math.round((deliveryCount / totalOrders) * 100) : 0,
            className: "bg-amber-500",
          },
          {
            name: "Pending",
            count: 0,
            percentage: 0,
            className: "bg-blue-500",
          },
          {
            name: "Cancelled",
            count: 0,
            percentage: 0,
            className: "bg-red-500",
          },
          ]);
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load analytics.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [period]);

  const maxRevenue = Math.max(
    ...revenueData.map((item) => item.value),
    1
  );

  return (
    <>
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

      {error && (
        <div className="mb-6 p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}


      {/* =========================================================
          STAT CARDS
      ========================================================== */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-6">

        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border border-[#D4C5AB] rounded-xl p-5 lg:p-6 shadow-[0_4px_20px_rgba(120,89,0,0.05)] animate-pulse"
              >
                <div className="w-24 h-4 rounded bg-[#F3EDE7] mb-4" />
                <div className="w-32 h-8 rounded bg-[#F3EDE7] mb-2" />
                <div className="w-20 h-4 rounded bg-[#F3EDE7]" />
              </div>
            ))
          : [
              {
                title: "Revenue",
                value: `R${analytics.revenue.toLocaleString()}`,
                change: "+12.5%",
                positive: true,
                icon: DollarSign,
              },
              {
                title: "Orders",
                value: analytics.orders.toLocaleString(),
                change: "+8.2%",
                positive: true,
                icon: ShoppingBag,
              },
              {
                title: "Customers",
                value: analytics.customers.toLocaleString(),
                change: "+6.4%",
                positive: true,
                icon: Users,
              },
              {
                title: "Avg. Order Value",
                value: `R${analytics.averageOrder.toFixed(2)}`,
                change: "-2.1%",
                positive: false,
                icon: TrendingUp,
              },
            ].map((stat, i) => (
              <AnalyticsStat key={i} {...stat} />
            ))}

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

          {loading
            ? Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-full flex flex-col justify-end items-center gap-3"
                >
                  <div className="w-full max-w-[52px] bg-[#F3EDE7] rounded-t-lg animate-pulse" style={{ height: `${((i * 17 + 40) % 60) + 30}%` }} />
                  <div className="w-8 h-3 rounded bg-[#F3EDE7]" />
                </div>
              ))
            : revenueData.map((item) => {

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

            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="w-32 h-4 rounded bg-[#F3EDE7] animate-pulse" />
                    <div className="w-full h-2 rounded-full bg-[#F3EDE7] animate-pulse" />
                  </div>
                ))
              : topProducts.map((product, index) => {

                  const maxUnits = topProducts[0]?.units || 1;

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

            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="w-24 h-4 rounded bg-[#F3EDE7] animate-pulse" />
                    <div className="w-full h-2 rounded-full bg-[#F3EDE7] animate-pulse" />
                  </div>
                ))
              : orderStatus.map((status) => (

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

              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i} className="border-b border-[#D4C5AB]/50">
                      <td className="px-5 py-4">
                        <div className="w-32 h-4 rounded bg-[#F3EDE7] animate-pulse" />
                      </td>
                      <td className="px-5 py-4">
                        <div className="w-12 h-4 rounded bg-[#F3EDE7] animate-pulse" />
                      </td>
                      <td className="px-5 py-4">
                        <div className="w-20 h-4 rounded bg-[#F3EDE7] animate-pulse" />
                      </td>
                      <td className="px-5 py-4">
                        <div className="w-24 h-4 rounded bg-[#F3EDE7] animate-pulse" />
                      </td>
                    </tr>
                  ))
                : topProducts.map((product) => (

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

    </>
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
