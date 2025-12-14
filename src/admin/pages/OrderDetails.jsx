import React from "react";
import { Package, Truck, CheckCircle, Clock, User, MapPin, Calendar,Phone } from "lucide-react";
import AdminHeader from "../components/AdminHeader";

export default function OrderDetails() {
  return (
    <>
      <AdminHeader />

      <div className="p-10 pt-32 min-h-screen bg-gray-50">

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 flex items-center gap-3">
          <Package className="w-10 h-10 text-orange-600" />
          Order Details
        </h1>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10 max-w-5xl mx-auto space-y-10">

          {/* ORDER ID AND STATUS */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Order ID: #ORD-10342</h2>
              <p className="text-gray-600 mt-1">Placed on: 12 Jan 2025</p>
            </div>

            <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-green-100 text-green-700 font-semibold shadow">
              <CheckCircle className="w-6 h-6" />
              Delivered
            </div>
          </div>

          {/* PRODUCT SECTION */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col lg:flex-row gap-8">

            {/* Product Image */}
            <img
              src="https://cdn.pixabay.com/photo/2016/11/29/12/54/jewelry-1869184_1280.jpg"
              alt="product"
              className="w-40 h-40 rounded-2xl object-cover shadow"
            />

            {/* Product Details */}
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">Handcrafted Beaded Necklace</h3>
              <p className="text-gray-600">Category: Jewelry</p>
              <p className="text-orange-600 font-bold text-lg">₹1,299</p>
            </div>

            {/* Delivery Status */}
            <div className="space-y-2 text-right">
              <div className="flex items-center gap-2 justify-end text-gray-800">
                <Truck className="text-blue-500 w-6 h-6" />
                <span className="font-semibold">Delivered</span>
              </div>
              <p className="text-sm text-gray-500">Delivered on 15 Jan 2025</p>
            </div>

          </div>

          {/* SHIPPING DETAILS */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="bg-gray-50 p-6 rounded-2xl border shadow-sm flex gap-3">
                <User className="w-6 h-6 text-orange-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Customer Name</h3>
                  <p className="text-gray-700">Alicia Brown</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border shadow-sm flex gap-3">
                <Phone className="w-6 h-6 text-rose-500" />
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-700">+91 98765 43210</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border shadow-sm flex gap-3 md:col-span-2">
                <MapPin className="w-6 h-6 text-amber-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Shipping Address</h3>
                  <p className="text-gray-700 leading-relaxed">
                    45, Maple Residency, Marine Drive,<br />
                    Kochi, Kerala – 682001
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ORDER TIMELINE */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Timeline</h2>

            <div className="space-y-4">

              <div className="flex items-center gap-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <p className="text-gray-800">Order Delivered — 15 Jan 2025</p>
              </div>

              <div className="flex items-center gap-4">
                <Truck className="w-6 h-6 text-blue-500" />
                <p className="text-gray-800">Shipped — 13 Jan 2025</p>
              </div>

              <div className="flex items-center gap-4">
                <Clock className="w-6 h-6 text-orange-500" />
                <p className="text-gray-800">Processing — 12 Jan 2025</p>
              </div>

              <div className="flex items-center gap-4">
                <Calendar className="w-6 h-6 text-gray-600" />
                <p className="text-gray-800">Order Placed — 12 Jan 2025</p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}
