import React from "react";
import { Link } from "react-router-dom";
import { serverURL } from "../../services/serverURL";

export default function ProductCard({ product }) {
  if (!product) return null;

  const {
    _id,
    title,
    price,
    discountPrice,
    images,
    category
  } = product;

  // Handle both array and string formats for images
  let imageUrl = "https://via.placeholder.com/600x400?text=No+Image";
  if (images) {
    const img = Array.isArray(images) ? images[0] : images;
    if (img && typeof img === 'string') {
      imageUrl = img.startsWith('http') ? img : `${serverURL}${img}`;
    }
  }
  const mainImage = imageUrl;

  const finalPrice = discountPrice > 0 ? discountPrice : price;

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl 
                    shadow-lg hover:shadow-2xl hover:scale-[1.03] 
                    transition overflow-hidden">

      {/* Image */}
      <img
        src={mainImage}
        alt={title}
        className="w-full h-56 object-cover"
      />

      {/* Content */}
      <div className="p-5 space-y-4">
        <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-gray-500">{category}</p>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <p className="text-lg font-semibold text-orange-600">
            ₹ {finalPrice}
          </p>

          {discountPrice > 0 && (
            <p className="text-sm text-gray-400 line-through">₹ {price}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-3">
          {/* View */}
          <Link
            to={`/artician/products/view/${_id}`}
            className="flex-1 text-center bg-white/80 border border-gray-300 
                       py-3 rounded-xl shadow hover:scale-[1.03] transition 
                       font-semibold text-gray-700"
          >
            View
          </Link>

          {/* Edit */}
          <Link
            to={`/artician/products/edit/${_id}`}
            className="flex-1 text-center bg-gradient-to-r from-orange-500 to-rose-500
                       text-white py-3 rounded-xl shadow hover:scale-[1.03] transition 
                       font-semibold"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
