import React from "react";
import { Star, User } from "lucide-react";

export default function ReviewCard() {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl shadow-md hover:shadow-xl transition p-5 flex gap-4">

      {/* User Avatar */}
      <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
        <User className="w-7 h-7 text-gray-500" />
      </div>

      {/* Review Content */}
      <div className="flex-1">
        
        {/* Reviewer Name */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Sarah Patel</h3>
          <span className="text-sm text-gray-500">2 days ago</span>
        </div>

        {/* Star Rating */}
        <div className="flex mt-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          ))}
        </div>

        {/* Review Text */}
        <p className="text-gray-700 mt-3 text-sm leading-relaxed">
          Absolutely loved this handcrafted item! The detailing and quality are exceptional.
          The artisan truly put heart into this piece. Highly recommended!
        </p>

      </div>
    </div>
  );
}

