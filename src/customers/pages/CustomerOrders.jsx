import React from "react";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";
import Header from "../../components/Header";

export default function CustomerOrders() {
  return (
    <>
      <Header />

      <div className="pt-28 px-10 min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 relative">

        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-24 left-24 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-24 right-16 w-[26rem] h-[26rem] bg-rose-200/25 rounded-full blur-3xl"></div>
        </div>

        {/* Page Header */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-12 flex items-center gap-3">
          <Package className="w-10 h-10 text-orange-600" />
          My Orders
        </h1>

        {/* Orders List */}
        <div className="space-y-12">
          {[
            {
              id: "#ORD-10342",
              status: "Delivered",
              icon: <CheckCircle className="text-green-600 w-6 h-6" />,
              date: "Delivered on 12 Jan 2025",
              image:
                "https://cdn.pixabay.com/photo/2016/11/29/12/54/jewelry-1869184_1280.jpg",
              name: "Handcrafted Beaded Necklace",
              price: "₹1,299",
            },
            {
              id: "#ORD-10321",
              status: "Shipped",
              icon: <Truck className="text-blue-500 w-6 h-6" />,
              date: "Shipped on 10 Jan 2025",
              image:
                "https://cdn.pixabay.com/photo/2016/11/29/03/53/adult-1867889_1280.jpg",
              name: "Artisan Decorative Bowl",
              price: "₹899",
            },
            {
              id: "#ORD-10288",
              status: "Processing",
              icon: <Clock className="text-orange-500 w-6 h-6" />,
              date: "Processing…",
              image:
                "https://cdn.pixabay.com/photo/2017/10/03/19/33/design-2810281_1280.png",
              name: "Creative Paint Brush Set",
              price: "₹499",
            },
          ].map((order, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl 
                         hover:shadow-2xl hover:scale-[1.02] transition p-7"
            >
              <div className="flex flex-col lg:flex-row gap-6 items-center">

                {/* Image */}
                <img
                  src={order.image}
                  alt="product"
                  className="w-40 h-40 object-cover rounded-2xl shadow-md"
                />

                {/* Info */}
                <div className="flex-1 space-y-2">
                  <h2 className="text-xl font-bold text-gray-900">{order.name}</h2>
                  <p className="text-gray-600">Order ID: {order.id}</p>
                  <p className="text-orange-600 font-semibold text-lg">
                    {order.price}
                  </p>
                </div>

                {/* Status */}
                <div className="text-right space-y-1">
                  <div className="flex items-center gap-2 justify-end">
                    {order.icon}
                    <p className="font-semibold text-gray-800">{order.status}</p>
                  </div>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}

