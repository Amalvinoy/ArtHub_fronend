import React from "react";
import ArtisanHeader from "../components/ArtisanHeader";
import { Package, Truck, Clock, CheckCircle } from "lucide-react";

export default function OrderDetails() {
  return (
    <>
      <ArtisanHeader />

      <div className="pt-28 px-10 min-h-screen bg-gradient-to-br 
                      from-orange-50 via-amber-50 to-rose-50 relative">

        {/* Decorative Background */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-24 left-24 w-72 h-72 
                          bg-orange-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-24 right-20 w-[26rem] h-[26rem] 
                          bg-rose-200/25 rounded-full blur-3xl"></div>
        </div>

        {/* Header */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-10 flex items-center gap-4">
          <Package className="w-10 h-10 text-orange-600" />
          Order Details
        </h1>

        <div className="bg-white/70 backdrop-blur-xl border border-white/40 
                        rounded-3xl shadow-xl p-10 max-w-5xl mx-auto space-y-10">

          {/* Order Status */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Order #ORD-10342</h2>
              <p className="text-gray-600 mt-1">Placed on 12 Jan 2025</p>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle className="w-7 h-7 text-green-600" />
              <span className="font-semibold text-gray-900 text-lg">Delivered</span>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <img
              src="https://cdn.pixabay.com/photo/2016/11/29/12/54/jewelry-1869184_1280.jpg"
              alt="product"
              className="w-48 h-48 rounded-2xl shadow-md object-cover"
            />

            <div className="space-y-2 flex-1">
              <h3 className="text-xl font-bold text-gray-900">
                Handcrafted Beaded Necklace
              </h3>
              <p className="text-gray-600">Category: Jewelry</p>
              <p className="text-orange-600 font-bold text-xl">₹1,299</p>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Shipping Information</h3>

            <div className="space-y-2 text-gray-700">
              <p><span className="font-semibold">Customer:</span> Alicia Brown</p>
              <p><span className="font-semibold">Phone:</span> +91 9876543210</p>
              <p>
                <span className="font-semibold">Address:</span>  
                22nd Street, Kochi, Kerala - 682001
              </p>

              <div className="flex items-center gap-2 mt-2">
                <Truck className="w-5 h-5 text-blue-500" />
                <span>Delivered by FastExpress</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Order Timeline</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <CheckCircle className="text-green-600" />
                <p>Delivered on 12 Jan 2025</p>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Truck className="text-blue-500" />
                <p>Shipped on 10 Jan 2025</p>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Clock className="text-orange-500" />
                <p>Processing on 9 Jan 2025</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
