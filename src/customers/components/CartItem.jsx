import React from "react";
import { Trash2, Plus, Minus } from "lucide-react";

export default function CartItem() {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-5 shadow-lg hover:shadow-xl transition flex gap-5 items-center">

      {/* Product Image */}
      <img
        src="https://www.kashmirbox.com/cdn/shop/products/KB5601_2.jpg?v=1598289753"
        alt="cart-item"
        className="w-32 h-28 object-cover rounded-xl shadow-md"
      />

      {/* Product Info */}
      <div className="flex-1 space-y-2">
        <h3 className="text-lg font-bold text-gray-900">
          Elegant Artisan Bracelet
        </h3>
        <p className="text-sm text-gray-600">By: Mira Collections</p>

        {/* Price */}
        <p className="text-xl font-bold text-gray-900">₹ 1,450</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-4">
        <button className="p-2 bg-white/70 backdrop-blur-md border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition">
          <Minus className="w-4 h-4 text-gray-700" />
        </button>

        <span className="font-semibold text-gray-900 text-lg">1</span>

        <button className="p-2 bg-white/70 backdrop-blur-md border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition">
          <Plus className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      {/* Delete Button */}
      <button className="p-3 bg-rose-100 text-rose-600 rounded-xl hover:bg-rose-200 transition shadow">
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
