import React from "react";
import { Heart, Star, ShoppingCart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { serverURL } from "../../services/serverURL";

export default function ProductCard({ product }) {
  // Handle image URL construction
  let imageUrl = "https://via.placeholder.com/400x300?text=No+Image";
  if (product?.images) {
    const img = Array.isArray(product.images) ? product.images[0] : product.images;
    if (img && typeof img === 'string') {
      imageUrl = img.startsWith('http') ? img : `${serverURL}${img}`;
    }
  }

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.03] transition overflow-hidden cursor-pointer">

      {/* Product Image */}
      <div className="relative w-full h-56">
        <img
          src={imageUrl}
          alt={product?.title}
          className="w-full h-full object-cover"
        />

        {/* Wishlist Icon */}
        <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-xl p-2 rounded-full shadow hover:scale-110 transition">
          <Heart className="w-5 h-5 text-rose-500" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-3">
        
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900">
          {product?.title}
        </h3>

        {/* Artisan Name */}
        <p className="text-sm text-gray-600">
          By: {product?.artisan?.fullName || "Unknown Artisan"}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <span className="text-gray-700 font-medium">
            {product?.ratings?.length > 0
              ? (
                  product.ratings.reduce((a, c) => a + c.stars, 0) / 
                  product.ratings.length
                ).toFixed(1)
              : "0.0"}
          </span>
        </div>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between mt-3">
          
          {/* Price */}
          <p className="text-xl font-bold text-gray-900">
            ₹ {product?.discountPrice || product?.price}
          </p>

          {/* Add to Cart */}
          <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl shadow hover:shadow-md hover:scale-105 transition flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm font-semibold">Add</span>
          </button>
        </div>

        {/* View Details */}
        <Link
          to={`/product/${product?._id}`}
          className="block w-full mt-3 text-center px-4 py-2 bg-white/70 border border-white/40 backdrop-blur-xl 
            rounded-xl shadow hover:shadow-lg hover:scale-[1.02] transition font-medium text-gray-800 flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4 text-orange-600" />
          View Details
        </Link>

      </div>

    </div>
  );
}


