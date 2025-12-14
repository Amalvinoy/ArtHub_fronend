import React from "react";
import ArtisanHeader from "../components/ArtisanHeader";
import WorkshopCard from "../components/WorkshopCard";
import { Link } from "react-router-dom";
import {getArticianWorkshopsAPI} from '../../services/allAPI';
import { useEffect, useState } from "react";

export default function MyWorkshops() {
  const [workshops, setWorkshops] = useState([]);
  const [token, setToken] = useState("");

  const fetchWorkshops = async () => {
    try {
      const storedToken = sessionStorage.getItem("token");
      if (!storedToken) return;

      const cleanToken = storedToken.replace(/"/g, "");
      const reqHeader = {
        Authorization: `Bearer ${cleanToken}`,
      };
      const response = await getArticianWorkshopsAPI(reqHeader);

      if (response.status === 200) {
        setWorkshops(response.data.workshops || []);
        console.log("Artisan workshops:", response.data.workshops);
      }
    } catch (error) {
      console.error("Error fetching workshops:", error);
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, []);

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

        {/* Page Header */}
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900">
            My Workshops
          </h1>

          <button>
          <Link to="/artician/workshops/add"
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 
                       text-white rounded-xl shadow-lg hover:scale-[1.03] 
                       transition font-semibold"
          >
            + Add New Workshop
          </Link>
          </button>
        </div>

        {/* Workshops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {workshops.length > 0 ? (
            workshops.map((workshop) => (
              <WorkshopCard key={workshop._id} workshop={workshop} />
        
            ))
          ) : (
            <p className="text-gray-500">No workshops found.</p>
          )}
        </div>
      </div>
    </>
  );
}
