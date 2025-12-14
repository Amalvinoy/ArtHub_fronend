import React from "react";
import { Package, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";

export default function ManageOrders() {
  return (
    <>
      <AdminHeader />

      <div className="p-10 pt-32 bg-gray-50 min-h-screen">

        {/* Page Header */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 flex items-center gap-3">
          <Package className="w-10 h-10 text-orange-600" />
          Manage Orders
        </h1>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4 text-left font-semibold text-gray-700">Order ID</th>
                <th className="p-4 text-left font-semibold text-gray-700">Customer</th>
                <th className="p-4 text-left font-semibold text-gray-700">Amount</th>
                <th className="p-4 text-left font-semibold text-gray-700">Status</th>
                <th className="p-4 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>

            <tbody>
              {[
                { id: "ORD-10342", customer: "Alicia Brown", amount: "₹1,299", status: "Delivered" },
                { id: "ORD-10321", customer: "Rohan Mehta", amount: "₹899", status: "Shipped" },
                { id: "ORD-10288", customer: "Sara Thomas", amount: "₹499", status: "Processing" },
              ].map((order, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition">

                  {/* Order ID */}
                  <td className="p-4 font-medium text-gray-800">
                    {order.id}
                  </td>

                  {/* Customer */}
                  <td className="p-4 text-gray-700">{order.customer}</td>

                  {/* Amount */}
                  <td className="p-4 text-gray-900 font-semibold">
                    {order.amount}
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-600"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <Link
                      to={`/admin/orderdetails`}
                      className="p-2 bg-orange-100 text-orange-600 rounded-lg hover:scale-105 transition inline-flex"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
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
