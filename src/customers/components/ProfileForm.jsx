import React from "react";
import { User, Mail, Phone, MapPin } from "lucide-react";

export default function ProfileForm() {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-xl max-w-2xl w-full mx-auto">

      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Edit Profile
      </h2>

      <div className="space-y-5">

        {/* Name */}
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition" />
          <input
            type="text"
            placeholder="Full Name"
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 
                       focus:border-orange-400 focus:ring-2 focus:ring-orange-100 
                       outline-none bg-white transition-all text-gray-700"
          />
        </div>

        {/* Email */}
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition" />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 
                       focus:border-orange-400 focus:ring-2 focus:ring-orange-100 
                       outline-none bg-white transition-all text-gray-700"
          />
        </div>

        {/* Phone */}
        <div className="relative group">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition" />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 
                       focus:border-orange-400 focus:ring-2 focus:ring-orange-100 
                       outline-none bg-white transition-all text-gray-700"
          />
        </div>

        {/* Address */}
        <div className="relative group">
          <MapPin className="absolute left-4 top-5 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition" />
          <textarea
            placeholder="Complete Address"
            rows="4"
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 
                       focus:border-orange-400 focus:ring-2 focus:ring-orange-100 
                       outline-none bg-white transition-all text-gray-700 resize-none"
          ></textarea>
        </div>

        {/* Save Button */}
        <button
          className="w-full mt-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white 
                     py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.03] 
                     transition font-semibold text-lg"
        >
          Save Changes
        </button>

      </div>
    </div>
  );
}
