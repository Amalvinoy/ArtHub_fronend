import React from "react";
import { PlusCircle, Upload, Save } from "lucide-react";
import AdminHeader from "../components/AdminHeader";

export default function AddProduct() {
  return (
    <>
      <AdminHeader />

      <div className="p-10 pt-32 bg-gray-50 min-h-screen">

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 flex items-center gap-3">
          <PlusCircle className="w-10 h-10 text-orange-600" />
          Add New Product
        </h1>

        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200 max-w-4xl mx-auto">

          {/* Image Upload (UI only) */}
          <div className="mb-10">
            <label className="text-gray-700 font-semibold block mb-3">
              Product Image
            </label>

            <div className="flex items-center gap-6">

              {/* Placeholder preview box */}
              <div className="w-40 h-40 border border-gray-300 rounded-xl 
                              bg-gray-100 flex items-center justify-center">
                <Upload className="w-10 h-10 text-gray-400" />
              </div>

              {/* Button only — no logic */}
              <button className="cursor-pointer bg-orange-600 text-white px-6 py-3 
                                 rounded-xl font-semibold shadow hover:scale-105 
                                 transition inline-flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Image
              </button>

            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Name */}
            <div>
              <label className="text-gray-700 font-medium">Product Name</label>
              <input
                type="text"
                className="w-full mt-2 p-4 rounded-xl border border-gray-300 
                           outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="Handcrafted Necklace"
              />
            </div>

            {/* Price */}
            <div>
              <label className="text-gray-700 font-medium">Price</label>
              <input
                type="number"
                className="w-full mt-2 p-4 rounded-xl border border-gray-300 
                           outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="1299"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-gray-700 font-medium">Category</label>
              <select
                className="w-full mt-2 p-4 rounded-xl border border-gray-300 
                           outline-none focus:ring-2 focus:ring-orange-300"
              >
                <option>Jewelry</option>
                <option>Artwork</option>
                <option>Woodwork</option>
                <option>Home Decor</option>
                <option>Handicrafts</option>
              </select>
            </div>

            {/* Stock */}
            <div>
              <label className="text-gray-700 font-medium">Stock</label>
              <input
                type="number"
                className="w-full mt-2 p-4 rounded-xl border border-gray-300 
                           outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="20"
              />
            </div>

          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="text-gray-700 font-medium">Description</label>
            <textarea
              rows="5"
              className="w-full mt-2 p-4 rounded-xl border border-gray-300 
                         outline-none focus:ring-2 focus:ring-orange-300"
              placeholder="Enter product description..."
            ></textarea>
          </div>

          {/* Save Button */}
          <button
            className="mt-8 w-full bg-orange-600 text-white py-4 rounded-xl 
                       font-semibold text-lg shadow hover:scale-[1.02] 
                       transition flex items-center justify-center gap-3"
          >
            <Save className="w-6 h-6" />
            Save Product
          </button>

        </div>
      </div>
    </>
  );
}
