import React, { useEffect, useState } from "react";
import adminApi from "../../utils/adminApi";
import { Search } from "lucide-react";
import { toast } from "react-toastify";

const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];
const PAYMENT_STATUSES = ["pending", "paid"];

const getStatusColor = (status) => {
  switch (status) {
    case "delivered":
      return "bg-[#ebfbf3] text-[#059669] border-[#a7f3d0] hover:bg-[#d1f4e0]";
    case "shipped":
      return "bg-[#eff6ff] text-[#2563eb] border-[#bfdbfe] hover:bg-[#dbeafe]";
    case "processing":
      return "bg-[#fefce8] text-[#ca8a04] border-[#fef08a] hover:bg-[#fef9c3]";
    case "cancelled":
      return "bg-[#fef2f2] text-[#dc2626] border-[#fecaca] hover:bg-[#fee2e2]";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100";
  }
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const params = {};
      if (query) params.search = query;
      if (statusFilter !== "all") params.status = statusFilter;
      const { data } = await adminApi.get("/orders", { params });
      setOrders(data.orders || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [query, statusFilter]);

  const updateStatus = async (orderId, status) => {
    try {
      await adminApi.put(`/orders/${orderId}/status`, { status });
      toast.success(`Order status updated to ${status}.`);
      fetchOrders();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update status");
    }
  };

  const updatePaymentStatus = async (orderId, paymentStatus) => {
    try {
      await adminApi.put(`/orders/${orderId}/payment`, { paymentStatus });
      toast.success(`Payment marked as ${paymentStatus}.`);
      fetchOrders();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update payment");
    }
  };

  return (
    <div className="p-1 md:p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1
          className="text-2xl md:text-3xl tracking-tight text-black"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: "700" }}
        >
          Orders
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-56">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search orders..."
              className="w-full pl-9 h-9 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-black transition-colors"
            />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-[140px] h-9 text-xs border border-gray-200 rounded-md bg-white px-3 cursor-pointer focus:outline-none focus:border-black appearance-none"
            >
              <option value="all">All Status</option>
              {STATUSES.map((s) => (
                <option key={s} value={s} className="capitalize">
                  {s}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-12 border border-dashed rounded-lg">
          No orders found.
        </p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto border border-gray-100 rounded-md bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    City
                  </th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr
                    key={o._id}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-4 font-mono text-xs text-black">
                      {o._id.slice(0, 8)}...
                    </td>
                    <td className="p-4 text-sm font-medium text-black">
                      {o.shippingAddress?.firstName || o.user?.name || "N/A"}
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {o.shippingAddress?.city || "N/A"}
                    </td>
                    <td className="p-4 text-sm font-semibold text-black">
                      Rs {o.totalPrice?.toLocaleString()}
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 align-middle">
                      <div className="relative w-[130px] overflow-hidden rounded-md">
                        <select
                          value={o.paymentStatus}
                          onChange={(e) =>
                            updatePaymentStatus(o._id, e.target.value)
                          }
                          className="w-full appearance-none cursor-pointer px-4 py-2 pr-8 bg-white focus:outline-none text-sm"
                        >
                          {PAYMENT_STATUSES.map((s) => (
                            <option
                              key={s}
                              value={s}
                              className="bg-white text-black"
                            >
                              {s === "paid" ? "Paid" : "Pending"}
                            </option>
                          ))}
                        </select>

                        {/* Selected Badge Overlay */}
                        <div
                          className={`
        pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-medium rounded-md
        ${
          o.paymentStatus === "paid"
            ? "bg-emerald-50 text-emerald-600"
            : "bg-amber-50 text-amber-700"
        }
      `}
                        >
                          {o.paymentStatus === "paid" ? "Paid" : "Pending"}
                        </div>

                        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="relative w-[160px] overflow-hidden rounded-md">
                        <select
                          value={o.status}
                          onChange={(e) => updateStatus(o._id, e.target.value)}
                          className="w-full appearance-none cursor-pointer px-4 py-2 pr-8 bg-white focus:outline-none text-sm"
                        >
                          {STATUSES.map((s) => (
                            <option
                              key={s}
                              value={s}
                              className="bg-white text-black capitalize"
                            >
                              {s}
                            </option>
                          ))}
                        </select>

                        {/* Selected Badge Overlay */}
                        <div
                          className={`
        pointer-events-none absolute inset-0 flex items-center justify-between px-4 rounded-md text-sm font-medium capitalize
        ${getStatusColor(o.status)}
      `}
                        >
                          {o.status}
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {orders.map((o) => (
              <div
                key={o._id}
                className="border border-gray-100 rounded-xl p-5 bg-white shadow-sm space-y-4 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base text-black tracking-tight">
                    {o.shippingAddress?.firstName || o.user?.name || "N/A"}
                  </span>
                  <span className="font-mono text-[10px] text-gray-400 border border-gray-100 px-1.5 py-0.5 rounded">
                    {o._id.slice(0, 8)}...
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-[13px]">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-[11px] uppercase tracking-wider mb-0.5 font-semibold">
                      City
                    </span>
                    <span className="font-medium text-black">
                      {o.shippingAddress?.city || "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-[11px] uppercase tracking-wider mb-0.5 font-semibold">
                      Total
                    </span>
                    <span className="font-bold text-black text-sm">
                      Rs {o.totalPrice?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-[11px] uppercase tracking-wider mb-0.5 font-semibold">
                      Date
                    </span>
                    <span className="font-medium text-gray-600">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex flex-col justify-end">
                    <div className="relative w-full overflow-hidden rounded-lg">
                      <select
                        value={o.paymentStatus}
                        onChange={(e) =>
                          updatePaymentStatus(o._id, e.target.value)
                        }
                        className={`
        w-full appearance-none cursor-pointer
        px-4 py-2 pr-8 text-sm font-semibold text-center
        bg-white
        focus:outline-none
      `}
                      >
                        {PAYMENT_STATUSES.map((s) => (
                          <option
                            key={s}
                            value={s}
                            className="bg-white text-black"
                          >
                            {s === "paid" ? "Paid" : "Pending"}
                          </option>
                        ))}
                      </select>

                      {/* Selected badge overlay */}
                      <div
                        className={`
        pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg text-sm font-semibold
        ${
          o.paymentStatus === "paid"
            ? "bg-emerald-50 text-emerald-600"
            : "bg-amber-50 text-amber-700"
        }
      `}
                      >
                        {o.paymentStatus === "paid" ? "Paid" : "Pending"}
                      </div>

                      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative mt-2 overflow-hidden rounded-lg">
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o._id, e.target.value)}
                    className="w-full appearance-none cursor-pointer px-4 py-3 pr-8 bg-white focus:outline-none"
                  >
                    {STATUSES.map((s) => (
                      <option
                        key={s}
                        value={s}
                        className="bg-white text-black capitalize"
                      >
                        {s}
                      </option>
                    ))}
                  </select>

                  {/* Selected badge overlay */}
                  <div
                    className={`
      pointer-events-none absolute inset-0 flex items-center justify-between px-4 rounded-lg capitalize text-sm font-medium
      ${getStatusColor(o.status)}
    `}
                  >
                    {o.status}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminOrders;
