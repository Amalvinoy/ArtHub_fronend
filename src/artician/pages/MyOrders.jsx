import React from "react";
import ArtisanHeader from "../components/ArtisanHeader";
import OrderCard from "../components/OrderCard";
import { ClipboardList } from "lucide-react";

export default function MyOrders() {
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

        {/* Page Title */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-12 flex items-center gap-4">
          <ClipboardList className="w-10 h-10 text-orange-600" />
          My Orders
        </h1>

        {/* Orders List */}
        <div className="space-y-8">
          {/* Dummy repeated cards */}
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </div>

      </div>
    </>
  );
}
