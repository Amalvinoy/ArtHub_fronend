import React from "react";
import { Calendar, Users, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { serverURL } from "../../services/serverURL";

export default function WorkshopCard({ workshop }) {
  if (!workshop) return null;

  const {
    _id,
    title,
    description,
    date,
    time,
    price,
    location,
    seats,
    image,
    artisan
  } = workshop;

  // Handle both array and string formats for image
  let imageUrl = "https://via.placeholder.com/600x400?text=No+Image";
  if (image) {
    const img = Array.isArray(image) ? image[0] : image;
    if (img && typeof img === 'string') {
      imageUrl = img.startsWith('http') ? img : `${serverURL}${img}`;
    }
  }

  return (
    <Link 
      to={`/workshop/${workshop?._id}`} 
      className="block"
    >
      <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl 
                      shadow-lg hover:shadow-2xl hover:scale-[1.03] 
                      transition cursor-pointer overflow-hidden">

        {/* Workshop Image */}
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-56 object-cover"
        />

        {/* Content */}
        <div className="p-5 space-y-4">

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
            {title}
          </h3>

          {/* Artisan Name */}
          <p className="text-sm text-gray-600">
            Hosted by: {artisan?.name || "Unknown Artisan"}
          </p>

          {/* Details */}
          <div className="space-y-2 text-gray-700 text-sm">

            {/* Date */}
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              <span>{date}</span>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-rose-500" />
              <span>{time}</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-600" />
              <span className="line-clamp-1">{location}</span>
            </div>

            {/* Seats */}
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-500" />
              <span>{seats} seats available</span>
            </div>

          </div>

          {/* Price & CTA */}
          <div className="pt-2">
            <p className="text-lg font-semibold text-orange-600 mb-3">
              ₹ {price}
            </p>
            <button className="w-full bg-gradient-to-r from-orange-500 to-rose-500 
                               text-white py-3 rounded-xl shadow hover:shadow-md 
                               hover:scale-105 transition font-semibold">
              Join Workshop
            </button>
          </div>

        </div>
      </div>
    </Link>
  );
}

