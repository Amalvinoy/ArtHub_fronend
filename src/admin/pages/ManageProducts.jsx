import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Package, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import { getAllProductsAPI, deleteProductByIdAPI } from "../../services/allAPI";
import { serverURL } from "../../services/serverURL";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (rawToken) => {
    try {
      setLoading(true);
      const cleanToken = rawToken.replace(/"/g, "");
      const reqHeader = {
        Authorization: `Bearer ${cleanToken}`
      };

      const response = await getAllProductsAPI(reqHeader);
      setProducts(response.data.products || []);
      console.log("Admin products:", response.data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
      alert("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (!storedToken) return;

    setToken(storedToken);
    fetchProducts(storedToken);
  }, []);

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const cleanToken = token.replace(/"/g, "");
      const reqHeader = {
        Authorization: `Bearer ${cleanToken}`
      };

      await deleteProductByIdAPI(productId, reqHeader);
      setProducts(products.filter(p => p._id !== productId));
      alert("Product deleted successfully");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product");
    }
  };

  const getImageUrl = (images) => {
    if (!images) return "https://via.placeholder.com/400x300?text=No+Image";
    const img = Array.isArray(images) ? images[0] : images;
    if (img && typeof img === 'string') {
      return img.startsWith('http') ? img : `${serverURL}${img}`;
    }
    return "https://via.placeholder.com/400x300?text=No+Image";
  };

  return (
    <>
      <AdminHeader />

      <div className="p-10 pt-32 bg-gray-50 min-h-screen">

        {/* Page Title */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3">
            <Package className="w-10 h-10 text-orange-600" />
            Manage Products
          </h1>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-gray-500">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="p-10 text-center text-gray-500">No products found</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="p-4 text-left font-semibold text-gray-700">Image</th>
                  <th className="p-4 text-left font-semibold text-gray-700">Name</th>
                  <th className="p-4 text-left font-semibold text-gray-700">Category</th>
                  <th className="p-4 text-left font-semibold text-gray-700">Price</th>
                  <th className="p-4 text-left font-semibold text-gray-700">Artisan</th>
                  <th className="p-4 text-left font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => {
                  const finalPrice = product.discountPrice > 0 ? product.discountPrice : product.price;
                  return (
                    <tr key={product._id} className="border-b hover:bg-gray-50 transition">
                      <td className="p-4">
                        <img
                          src={getImageUrl(product.images)}
                          alt={product.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </td>

                      <td className="p-4 font-medium text-gray-800">
                        {product.title}
                      </td>

                      <td className="p-4 text-gray-600">{product.category}</td>

                      <td className="p-4 text-gray-900 font-semibold">₹{finalPrice}</td>

                      <td className="p-4 text-gray-600">{product.artisan?.name || "N/A"}</td>

                      <td className="p-4 flex gap-3">
                        <Link
                          to={`/admin/productdetails/${product._id}`}
                          className="p-2 bg-green-100 text-green-600 rounded-lg hover:scale-105 transition"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>

                        

                        <button 
                          onClick={() => handleDelete(product._id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:scale-105 transition"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          )}
        </div>

      </div>
    </>
  );
}
