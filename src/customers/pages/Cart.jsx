import React from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import CartItem from "../components/CartItem"; // ✅ USE COMPONENT

export default function Cart() {
  return (
    <>
      <Header />

      <div className="pt-28 px-10 min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 relative">

        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-24 right-16 w-[26rem] h-[26rem] bg-rose-200/30 rounded-full blur-3xl"></div>
        </div>

        {/* Page Header */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-10 flex items-center gap-4">
          <ShoppingCart className="w-10 h-10 text-orange-600" />
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">

            <CartItem />
            <CartItem />
            <CartItem />

          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
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

              <Link
                to="/checkout"
                className="w-full mt-6 py-3.5 bg-gradient-to-r from-orange-500 to-rose-500 
                           text-white font-semibold rounded-xl shadow-lg 
                           hover:shadow-xl hover:scale-[1.03] transition text-center block"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}




