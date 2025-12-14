import React from "react";
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Package,
  Calendar,
} from "lucide-react";

import Header from "../../components/Header";
import ProductCard from "../components/ProductCard";
import WorkshopCard from "../components/WorkshopCard";
import Footer from "../../components/Footer";

export default function CustomerDashboard() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Page Container */}
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 relative pt-32 px-10">

        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-20 left-40 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 right-20 w-[26rem] h-[26rem] bg-rose-200/20 rounded-full blur-3xl"></div>
        </div>

        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 flex items-center gap-3">
            <Sparkles className="w-10 h-10 text-orange-600" />
            Dashboard
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Welcome back! Explore new crafts, workshops, and your recent activity.
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-14">
          {[
            {
              icon: <ShoppingBag className="w-7 h-7 text-orange-600" />,
              label: "Items in Cart",
              value: "3",
            },
            {
              icon: <Heart className="w-7 h-7 text-rose-500" />,
              label: "Wishlist Items",
              value: "8",
            },
            {
              icon: <Package className="w-7 h-7 text-amber-600" />,
              label: "Orders Placed",
              value: "12",
            },
            {
              icon: <Calendar className="w-7 h-7 text-orange-500" />,
              label: "Upcoming Workshops",
              value: "2",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition flex flex-col gap-3"
            >
              <div className="p-3 rounded-xl bg-white/70 shadow">
                {card.icon}
              </div>
              <p className="text-gray-700 text-sm">{card.label}</p>
              <p className="text-3xl font-extrabold text-gray-900">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Recommended Products */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Recommended for You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </section>

        {/* Upcoming Workshops */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Upcoming Workshops
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <WorkshopCard />
            <WorkshopCard />
            <WorkshopCard />
          </div>
        </section>

        {/* Activity Feed */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Your Activity
          </h2>
          <div className="bg-white/70 backdrop-blur-xl border border-white/40 p-8 rounded-3xl shadow-xl space-y-4">
            <p className="text-gray-700">
              • You added{" "}
              <span className="font-semibold">Handcrafted Necklace</span> to
              your wishlist.
            </p>
            <p className="text-gray-700">
              • Your order <span className="font-semibold">#ORD-9453</span> was
              delivered.
            </p>
            <p className="text-gray-700">
              • You registered for{" "}
              <span className="font-semibold">
                Creative Painting Workshop
              </span>
              .
            </p>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}

