import React from "react";
import { Package, Truck, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function OrderCard() {
  return (
    <Link
      to="/artician/ordersdetails"
      className="block bg-white/70 backdrop-blur-xl border border-white/40 
                 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-[1.02] 
                 transition p-6 cursor-pointer"
    >
      <div className="flex flex-col lg:flex-row gap-6 items-center">

        {/* Product Image */}
        <img
          src="https://www.kashmirbox.com/cdn/shop/products/KB5601_2.jpg?v=1598289753"
          alt="product"
          className="w-40 h-40 object-cover rounded-2xl shadow-md"
        />

        {/* Order Info */}
        <div className="flex-1 space-y-1">
          <h2 className="text-xl font-bold text-gray-900">
            Handcrafted Beaded Necklace
          </h2>

          <p className="text-gray-600">Order ID: #ORD-10245</p>
          <p className="text-orange-600 font-semibold text-lg">₹ 1,299</p>
        </div>

        {/* Status */}
        <div className="space-y-1 text-right">
          <div className="flex justify-end items-center gap-2">
            <Truck className="text-blue-500 w-6 h-6" />
            <span className="font-semibold text-gray-800">Shipped</span>
          </div>
          <p className="text-sm text-gray-500">Shipped on Jan 10, 2025</p>
        </div>
      </div>
    </Link>
  );
}
