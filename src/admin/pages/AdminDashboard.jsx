import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import { Users, Brush, Package, CalendarDays } from "lucide-react";
import {
  getAllUsersAPI,
  getAllArticiansAPI,
  getAllProductsAPI,
  getAllWorkshopsAPI
} from "../../services/allAPI";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    users: 0,
    articians: 0,
    products: 0,
    workshops: 0
  });

  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken.replace(/"/g, ""));
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  const fetchDashboardData = async () => {
    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`
      };

      const [
        usersRes,
        articiansRes,
        productsRes,
        workshopsRes
      ] = await Promise.all([
        getAllUsersAPI(reqHeader),
        getAllArticiansAPI(reqHeader),
        getAllProductsAPI(reqHeader),
        getAllWorkshopsAPI(reqHeader)
      ]);

      setCounts({
        users: usersRes.data.users.length,
        articians: articiansRes.data.articians.length,
        products: productsRes.data.products.length,
        workshops: workshopsRes.data.workshops.length
      });
      console.log("usersRes:", usersRes);

    } catch (error) {
      console.error("Dashboard load error:", error);
      alert("Failed to load dashboard data");
    }
  };

  return (
    <>
      <AdminHeader />

      <div className="pt-28 px-10 min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-10 text-gray-800">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          <StatCard
            title="Users"
            count={counts.users}
            icon={<Users className="w-8 h-8 text-blue-600" />}
          />

          <StatCard
            title="Articians"
            count={counts.articians}
            icon={<Brush className="w-8 h-8 text-orange-600" />}
          />

          <StatCard
            title="Products"
            count={counts.products}
            icon={<Package className="w-8 h-8 text-green-600" />}
          />

          <StatCard
            title="Workshops"
            count={counts.workshops}
            icon={<CalendarDays className="w-8 h-8 text-purple-600" />}
          />

        </div>
      </div>
    </>
  );
}

function StatCard({ title, count, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center hover:scale-[1.02] transition">
      <div>
        <p className="text-gray-500 font-medium">{title}</p>
        <h2 className="text-3xl font-bold text-gray-900">{count}</h2>
      </div>
      <div className="p-3 bg-gray-100 rounded-xl">
        {icon}
      </div>
    </div>
  );
}
