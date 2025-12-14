import React from "react";
import { CreditCard, WalletCards, MapPin, User, Phone, Mail, ShoppingBag } from "lucide-react";


export default function Checkout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 flex">

      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 p-10">

        {/* Decorative Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-28 left-24 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-28 right-16 w-[26rem] h-[26rem] bg-rose-200/25 rounded-full blur-3xl"></div>
        </div>

        {/* Header */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-10 flex items-center gap-4">
          <ShoppingBag className="w-10 h-10 text-orange-600" />
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Billing Form */}
          <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-10 space-y-8">

            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Billing Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Full Name */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition"
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition"
                />
              </div>

              {/* Pincode */}
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
                <input
                  type="text"
                  placeholder="Pincode"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition"
                />
              </div>
            </div>

            {/* Address */}
            <textarea
              placeholder="Complete Address"
              className="w-full p-4 rounded-xl border-2 border-gray-200 bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition min-h-[120px]"
            ></textarea>

            {/* Payment Method */}
            <h2 className="text-2xl font-semibold text-gray-900">Payment Method</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Card Payment */}
              <button className="
                flex items-center gap-3 p-5 w-full
                bg-white/70 border border-white/50 rounded-xl
                shadow hover:shadow-xl hover:scale-[1.02] transition
                text-gray-800 font-medium
              ">
                <CreditCard className="text-orange-600 w-6 h-6" />
                Credit / Debit Card
              </button>

              {/* UPI */}
              <button className="
                flex items-center gap-3 p-5 w-full
                bg-white/70 border border-white/50 rounded-xl
                shadow hover:shadow-xl hover:scale-[1.02] transition
                text-gray-800 font-medium
              ">
                <WalletCards className="text-rose-500 w-6 h-6" />
                UPI / Wallet
              </button>

            </div>

            {/* Place Order Button */}
            <button className="
              w-full py-4 mt-4 
              bg-gradient-to-r from-orange-500 to-rose-500 
              text-white font-semibold rounded-xl
              shadow-lg hover:shadow-xl hover:scale-[1.03] transition
              text-lg
            ">
              Place Order
            </button>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-10 space-y-6">

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>₹2,598</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span>₹80</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Tax</span>
                <span>₹120</span>
              </div>

              <div className="border-t border-gray-300 my-4" />

              <div className="flex justify-between font-bold text-xl text-gray-900">
                <span>Total</span>
                <span>₹2,798</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
