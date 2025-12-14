import React from "react";
import { Calendar, Users, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { serverURL } from "../../services/serverURL";

export default function WorkshopCard({ workshop }) {
  if (!workshop) {
    return null;
  }

  const {
    _id,
    title,
    description,
    date,
    time,
    price,
    location,
    seats,
    image
  } = workshop;

  // Handle both array and string formats for image
  let imageUrl = "https://via.placeholder.com/600x400?text=No+Image";
  if (image) {
    const img = Array.isArray(image) ? image[0] : image;
    if (img && typeof img === 'string') {
      imageUrl = img.startsWith('http') ? img : `${serverURL}${img}`;
    }
  }
  const mainImage = imageUrl;

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/40 
                    rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.03] 
                    transition overflow-hidden">

      {/* Image */}
      <img
        src={mainImage}
        alt={title}
        className="w-full h-56 object-cover"
      />

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        {/* Details */}
        <div className="space-y-2 text-gray-700 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-orange-500" />
            <span>{date} • {time}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span>{location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-orange-500" />
            <span>{seats} seats available</span>
          </div>
        </div>

        {/* Price */}
        <div className="pt-2">
          <p className="text-lg font-semibold text-orange-600">
            ₹ {price}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-3">
          {/* View */}
          <Link
            to={`/artician/workshops/view/${_id}`}
            className="flex-1 text-center bg-white/80 border border-gray-300 
                       py-3 rounded-xl shadow hover:scale-[1.03] transition 
                       font-semibold text-gray-700"
          >
            View
          </Link>

          {/* Edit */}
          <Link
            to={`/artician/workshops/edit/${_id}`}
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

