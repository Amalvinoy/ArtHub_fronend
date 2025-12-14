import React from "react";
import { HeartOff, ShoppingCart } from "lucide-react";

export default function WishlistCard() {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.03] transition overflow-hidden">

      {/* Image Section */}
      <div className="relative w-full h-52">
        <img
          src="https://cdn.pixabay.com/photo/2020/11/22/18/01/earrings-5767139_1280.jpg"
          alt="wishlist-item"
          className="w-full h-full object-cover"
        />

        {/* Remove button */}
        <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-xl p-2 rounded-full shadow hover:bg-white hover:scale-110 transition">
          <HeartOff className="w-5 h-5 text-rose-600" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900">
          Handmade Beaded Earrings
        </h3>

        {/* Artisan */}
        <p className="text-sm text-gray-600">By: Kavita Designs</p>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between mt-3">
          <p className="text-xl font-bold text-gray-900">₹ 850</p>

          <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl shadow hover:shadow-md hover:scale-105 transition flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm font-semibold">Add to Cart</span>
          </button>
        </div>
      </div>

    </div>
  );
}
