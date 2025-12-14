import React, { useState, useEffect } from "react";
import { Package, Camera } from "lucide-react";
import ArtisanHeader from "../components/ArtisanHeader";
import { addProductAPI } from "../../services/allAPI";

export default function AddProduct() {
  const [token, setToken] = useState("");

  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    category: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    const t = sessionStorage.getItem("token");
    setToken(t);
  }, []);

  // Handle image upload
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  //Handle Reset
  const handleReset = () => {
    setProductData({
      title: "",
      description: "",
      price: "",
      discountPrice: "",
      category: "",
    });
    setImage(null);
  };

  // Handle Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      if (!productData.title || !productData.description || !productData.price || !productData.category || !image) {
        alert("Please fill all fields and upload an image");
        return;
      }

      if (!token) {
        alert("You are not authenticated.");
        return;
      }

      const updatedToken = token.replace(/"/g, "");

      const formData = new FormData();
      formData.append("title", productData.title);
      formData.append("description", productData.description);
      formData.append("price", productData.price);
      formData.append("discountPrice", productData.discountPrice || "0");
      formData.append("category", productData.category);
      formData.append("images", image);

      const reqHeader = {
        Authorization: `Bearer ${updatedToken}`,
      };

      const response = await addProductAPI(formData, reqHeader);

      if (response.status === 201) {
        alert("Product added successfully!");
        console.log("Added Product:", response.data.product);
        handleReset();
        window.location.href = "/artician/products";
      }
    } catch (error) {
      console.error("Error adding product:", error);
      console.error("Error response data:", error?.response?.data);
      alert(error?.response?.data?.message || "Error adding product. Please try again.");
    }
  };

  return (
    <>
      <ArtisanHeader />

      <div className="pt-28 px-10 min-h-screen bg-gradient-to-br 
                      from-orange-50 via-amber-50 to-rose-50 relative">

        {/* Background Decorations */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-24 left-24 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-[26rem] h-[26rem] bg-rose-200/25 rounded-full blur-3xl"></div>
        </div>

        <h1 className="text-5xl font-extrabold text-gray-900 mb-10 flex items-center gap-4">
          <Package className="w-12 h-12 text-orange-600" />
          Add New Product
        </h1>

        <form onSubmit={handleAddProduct} className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-10 max-w-4xl mx-auto space-y-8">

          {/* Title */}
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              Product Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={productData.title}
              onChange={(e) => setProductData({ ...productData, title: e.target.value })}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all text-gray-800 bg-white/60"
              placeholder="Enter product title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={productData.description}
              onChange={(e) => setProductData({ ...productData, description: e.target.value })}
              rows="5"
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all text-gray-800 bg-white/60 resize-none"
              placeholder="Describe your product"
            />
          </div>

          {/* Price and Discount Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={productData.price}
                onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all text-gray-800 bg-white/60"
                placeholder="Enter price"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Discount Price
              </label>
              <input
                type="number"
                value={productData.discountPrice}
                onChange={(e) => setProductData({ ...productData, discountPrice: e.target.value })}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all text-gray-800 bg-white/60"
                placeholder="Enter discount price (optional)"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={productData.category}
              onChange={(e) => setProductData({ ...productData, category: e.target.value })}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all text-gray-800 bg-white/60"
            >
              <option value="">Select a category</option>
              <option value="pottery">Pottery</option>
              <option value="painting">Painting</option>
              <option value="sculpture">Sculpture</option>
              <option value="textile">Textile</option>
              <option value="jewelry">Jewelry</option>
              <option value="woodwork">Woodwork</option>
              <option value="crafts">Crafts</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              Product Image <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="imageUpload"
              />
              <label
                htmlFor="imageUpload"
                className="flex items-center justify-center w-full px-5 py-6 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all"
              >
                <Camera className="w-8 h-8 text-gray-400 mr-3" />
                <span className="text-gray-600 font-medium">
                  {image ? image.name : "Click to upload an image"}
                </span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              Add Product
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-2xl font-bold text-lg hover:bg-gray-300 transition-all"
            >
              Reset
            </button>
          </div>

        </form>
      </div>
    </>
  );
}
