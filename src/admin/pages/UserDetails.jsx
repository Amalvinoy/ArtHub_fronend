import React from "react";
import { User, Mail, Phone, MapPin, Calendar, Shield } from "lucide-react";
import AdminHeader from "../components/AdminHeader";

export default function UserDetails() {
  return (
    <>
      <AdminHeader />

      <div className="p-10 pt-32 bg-gray-50 min-h-screen">

        {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 flex gap-3 items-center">
          <User className="w-10 h-10 text-orange-600" />
          User Details
        </h1>

        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200 max-w-4xl mx-auto">

          {/* TOP — Profile Image & Basic Info */}
          <div className="flex flex-col lg:flex-row items-center gap-10 mb-10">

            {/* Avatar */}
            <div className="w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-orange-100">
              <img
                src="https://cdn.pixabay.com/photo/2017/08/30/01/05/girl-2696947_1280.jpg"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Basic Info */}
            <div className="space-y-2 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900">Alicia Brown</h2>
              <p className="text-gray-600">Customer Member</p>

              <div className="flex gap-3 flex-wrap justify-center lg:justify-start mt-3">
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-xl text-sm font-medium">
                  Verified Account
                </span>
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-medium">
                  Active User
                </span>
              </div>
            </div>

          </div>

          {/* DETAILS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Email */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex gap-3 items-center mb-2">
                <Mail className="w-5 h-5 text-orange-600" />
                <h3 className="font-semibold text-gray-900">Email Address</h3>
              </div>
              <p className="text-gray-700">alicia.brown@example.com</p>
            </div>

            {/* Phone */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex gap-3 items-center mb-2">
                <Phone className="w-5 h-5 text-rose-600" />
                <h3 className="font-semibold text-gray-900">Phone Number</h3>
              </div>
              <p className="text-gray-700">+91 98765 43210</p>
            </div>

            {/* Address */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm md:col-span-2">
              <div className="flex gap-3 items-center mb-2">
                <MapPin className="w-5 h-5 text-amber-600" />
                <h3 className="font-semibold text-gray-900">Address</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                45, Maple Residency, Marine Drive,<br />
                Kochi, Kerala – 682001
              </p>
            </div>

            {/* Account Created */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex gap-3 items-center mb-2">
                <Calendar className="w-5 h-5 text-orange-600" />
                <h3 className="font-semibold text-gray-900">Joined On</h3>
              </div>
              <p className="text-gray-700">12 Jan 2024</p>
            </div>

            {/* Status */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex gap-3 items-center mb-2">
                <Shield className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-gray-900">Account Status</h3>
              </div>
              <p className="text-gray-700">Active</p>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
