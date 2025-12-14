import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArtisanHeader from "../components/ArtisanHeader";
import { Edit, Eye, Truck, Shield, Trash2 } from "lucide-react";
import { getProductByIdAPI, deleteProductAPI } from "../../services/allAPI";
import { serverURL } from "../../services/serverURL";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  // Load Token
  useEffect(() => {
    const t = sessionStorage.getItem("token");
    if (t) setToken(t.replace(/"/g, ""));
  }, []);

  // Fetch Product
  useEffect(() => {
    if (!token || !id) return;

    const fetchProduct = async () => {
      try {
        const response = await getProductByIdAPI(id, {
          Authorization: `Bearer ${token}`,
        });

        if (response.status === 200) {
          setProduct(response.data.product);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, token]);

  if (loading) {
    return (
      <>
        <ArtisanHeader />
        <div className="pt-28 px-10 min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 flex items-center justify-center">
          <p className="text-xl text-gray-600">Loading product details...</p>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <ArtisanHeader />
        <div className="pt-28 px-10 min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 flex items-center justify-center">
          <p className="text-xl text-gray-600">Product not found</p>
        </div>
      </>
    );
  }

  const mainImage =
    product.images && product.images.length > 0
      ? product.images[0].startsWith("http")
        ? product.images[0]
        : `${serverURL}/${product.images[0]}`
      : "https://via.placeholder.com/600x400?text=No+Image";

  const finalPrice =
    product.discountPrice && product.discountPrice > 0
      ? product.discountPrice
      : product.price;

  const discountPercent =
    product.discountPrice && product.discountPrice > 0
      ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
      : 0;

  // Handle Delete
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      try {
        const response = await deleteProductAPI(id, {
          Authorization: `Bearer ${token}`,
        });

        if (response.status === 200) {
          alert("Product deleted successfully!");
          navigate("/artician/products");
        }
      } catch (err) {
        console.error("Error deleting product:", err);
        alert("Failed to delete product");
      }
    }
  };

  return (
    <>
      <ArtisanHeader />

      <div className="pt-28 px-10 min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-gray-600">
          <span>Home</span> / <span>Products</span> / <span className="text-gray-900 font-semibold">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
          {/* Left: Image Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={mainImage}
                alt={product.title}
                className="w-full h-96 object-cover"
              />
              {discountPercent > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg font-semibold">
                  -{discountPercent}%
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.startsWith("http") ? img : `${serverURL}/${img}`}
                    alt={`Thumbnail ${idx}`}
                    className="w-20 h-20 rounded-lg object-cover cursor-pointer border-2 border-transparent hover:border-orange-500 transition"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col gap-6">
            {/* Title & Category */}
            <div>
              <p className="text-sm text-orange-600 font-semibold uppercase">
                {product.category}
              </p>
              <h1 className="text-4xl font-bold text-gray-900 mt-2">
                {product.title}
              </h1>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-4">
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-lg font-semibold">
                Active
              </div>
              <p className="text-gray-600">Listed on {new Date().toLocaleDateString()}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <p className="text-4xl font-bold text-orange-600">₹ {finalPrice}</p>
              {product.discountPrice && product.discountPrice > 0 && (
                <p className="text-2xl text-gray-400 line-through">
                  ₹ {product.price}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 bg-white/50 p-4 rounded-lg">
                <Truck className="w-5 h-5 text-orange-600" />
                <p className="text-gray-700">Free shipping on orders over ₹500</p>
              </div>
              <div className="flex items-center gap-3 bg-white/50 p-4 rounded-lg">
                <Shield className="w-5 h-5 text-orange-600" />
                <p className="text-gray-700">30-day money-back guarantee</p>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-4">
                <button
                  onClick={() => navigate(`/artician/products/edit/${id}`)}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition"
                >
                  <Edit className="w-5 h-5" />
                  Edit Product
                </button>
                <button
                  onClick={() => navigate("/artician/products")}
                  className="flex-1 bg-white/80 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                >
                  <Eye className="w-5 h-5" />
                  Back to Products
                </button>
              </div>

              {/* Delete Button */}
              <button
                onClick={handleDelete}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
              >
                <Trash2 className="w-5 h-5" />
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
