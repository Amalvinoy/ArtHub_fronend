import React, { useState, useEffect } from "react";
import { Sparkles, Package, Users, Calendar, AlertCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

import ArtisanHeader from "../components/ArtisanHeader";
import ArtisanStatCard from "../components/ArtisanStatCard";
import ProductCard from "../components/ProductCard";
import WorkshopCard from "../components/WorkshopCard";
import { getArticianProductsAPI, getArticianWorkshopsAPI } from "../../services/allAPI";

export default function ArtisanDashboard() {
  const [products, setProducts] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const storedToken = sessionStorage.getItem("token");
      if (!storedToken) {
        setError("Please login to view dashboard");
        setLoading(false);
        return;
      }

      const cleanToken = storedToken.replace(/"/g, "");

      const reqHeader = {
        Authorization: `Bearer ${cleanToken}`,
      };

      // Fetch products and workshops
      const [productsResponse, workshopsResponse] = await Promise.all([
        getArticianProductsAPI(reqHeader),
        getArticianWorkshopsAPI(reqHeader)
      ]);

      if (productsResponse.status === 200) {
        setProducts(productsResponse.data.products || []);
        console.log("Artisan products:", productsResponse.data.products);
      }

      if (workshopsResponse.status === 200) {
        setWorkshops(workshopsResponse.data.workshops || []);
        console.log("Artisan workshops:", workshopsResponse.data.workshops);
      }

    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Display only first 3 items for dashboard preview
  const displayProducts = products.slice(0, 3);
  const displayWorkshops = workshops.slice(0, 3);

  return (
    <>
      <ArtisanHeader />

      <div
        className="pt-28 px-10 min-h-screen 
        bg-linear-to-br from-orange-50 via-amber-50 to-rose-50 relative"
      >
        {/* Background Decorations */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-orange-200/30 blur-3xl rounded-full"></div>
          <div className="absolute bottom-16 right-16 w-104 h-104 bg-rose-200/30 blur-3xl rounded-full"></div>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
          <Sparkles className="text-orange-600 w-10 h-10" />
          Artisan Dashboard
        </h1>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-orange-600 animate-spin" />
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              <ArtisanStatCard
                label="Total Products"
                value={products.length.toString()}
                icon={<Package className="w-7 h-7 text-orange-600" />}
              />
              <ArtisanStatCard
                label="Total Workshops"
                value={workshops.length.toString()}
                icon={<Calendar className="w-7 h-7 text-amber-600" />}
              />
              <ArtisanStatCard
                label="Total Sales"
                value="0"
                icon={<Users className="w-7 h-7 text-rose-500" />}
              />
              <ArtisanStatCard
                label="Revenue"
                value="₹0"
                icon={<Sparkles className="w-7 h-7 text-orange-500" />}
              />
            </div>

            {/* Your Products */}
            <section className="mb-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  Your Products
                </h2>
                <Link
                  to="/artisan/products"
                  className="text-orange-600 hover:text-orange-700 font-semibold"
                >
                  View All →
                </Link>
              </div>

              {displayProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {displayProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white/50 rounded-2xl">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">No products yet</p>
                  <Link
                    to="/artisan/add-product"
                    className="inline-block mt-4 px-6 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700"
                  >
                    Add Your First Product
                  </Link>
                </div>
              )}
            </section>

            {/* Your Workshops */}
            <section className="mb-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  Your Workshops
                </h2>
                <Link
                  to="/artisan/workshops"
                  className="text-orange-600 hover:text-orange-700 font-semibold"
                >
                  View All →
                </Link>
              </div>

              {displayWorkshops.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {displayWorkshops.map((workshop) => (
                    <WorkshopCard key={workshop._id} workshop={workshop} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white/50 rounded-2xl">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">No workshops yet</p>
                  <Link
                    to="/artisan/add-workshop"
                    className="inline-block mt-4 px-6 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700"
                  >
                    Create Your First Workshop
                  </Link>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </>
  );
}

