import React, { useEffect, useState } from "react";
import ArtisanHeader from "../components/ArtisanHeader";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { getArticianProductsAPI } from "../../services/allAPI";

export default function MyProducts() {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

  const fetchProducts = async (rawToken) => {
    try {
      const cleanToken = rawToken.replace(/"/g, "");

      const reqHeader = {
        Authorization: `Bearer ${cleanToken}`,
      };

      const response = await getArticianProductsAPI(reqHeader);

      // assuming backend returns { products: [...] }
      setProducts(response.data.products || []);
      console.log("Artisan products:", response.data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (!storedToken) return;

    setToken(storedToken);
    fetchProducts(storedToken);
  }, []);

  return (
    <>
      <ArtisanHeader />

      <div className="pt-28 px-10 min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 relative">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900">
            My Products
          </h1>

          <Link to="/artician/products/add"
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 
                       text-white rounded-xl shadow-lg hover:scale-[1.03] 
                       transition font-semibold"
          >
            + Add New Product
          </Link>
        </div>

        {/* products grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {products.length > 0 ? (
            products.map((p) => <ProductCard key={p._id} product={p} />)
          ) : (
            <p className="text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </>
  );
}
