import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Calendar, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import { getAllWorkshopsAPI, deleteWorkshopByIdAPI } from "../../services/allAPI";
import { serverURL } from "../../services/serverURL";

export default function ManageWorkshops() {
  const [workshops, setWorkshops] = useState([]);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWorkshops = async (rawToken) => {
    try {
      setLoading(true);
      const cleanToken = rawToken.replace(/"/g, "");
      const reqHeader = {
        Authorization: `Bearer ${cleanToken}`
      };

      const response = await getAllWorkshopsAPI(reqHeader);
      setWorkshops(response.data.workshops || []);
      console.log("Admin workshops:", response.data.workshops);
    } catch (err) {
      console.error("Error fetching workshops:", err);
      alert("Failed to fetch workshops");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (!storedToken) return;

    setToken(storedToken);
    fetchWorkshops(storedToken);
  }, []);

  const handleDelete = async (workshopId) => {
    if (!window.confirm("Are you sure you want to delete this workshop?")) return;

    try {
      const cleanToken = token.replace(/"/g, "");
      const reqHeader = {
        Authorization: `Bearer ${cleanToken}`
      };

      await deleteWorkshopByIdAPI(workshopId, reqHeader);
      setWorkshops(workshops.filter(w => w._id !== workshopId));
      alert("Workshop deleted successfully");
    } catch (err) {
      console.error("Error deleting workshop:", err);
      alert("Failed to delete workshop");
    }
  };

  const getImageUrl = (image) => {
    if (!image) return "https://via.placeholder.com/400x300?text=No+Image";
    const img = Array.isArray(image) ? image[0] : image;
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
            <Calendar className="w-10 h-10 text-purple-600" />
            Manage Workshops
          </h1>

          <Link
            to="/admin/workshops/add"
            className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold shadow hover:scale-105 transition flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Add Workshop
          </Link>
        </div>

        {/* Workshops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {loading ? (
            <div className="col-span-full text-center text-gray-500 py-10">Loading workshops...</div>
          ) : workshops.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-10">No workshops found</div>
          ) : (
            workshops.map((workshop) => {
              return (
                <div key={workshop._id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition">
                  {/* Image */}
                  <img
                    src={getImageUrl(workshop.image)}
                    alt={workshop.title}
                    className="w-full h-48 object-cover"
                  />

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                      {workshop.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {workshop.description}
                    </p>

                    {/* Details */}
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>📅 {workshop.date} • {workshop.time}</p>
                      <p>📍 {workshop.location}</p>
                      <p>👥 {workshop.seats} seats</p>
                    </div>

                    {/* Price */}
                    <p className="text-lg font-semibold text-purple-600">₹{workshop.price}</p>

                    {/* Artisan */}
                    <p className="text-xs text-gray-600">By {workshop.artisan?.name || "Unknown"}</p>

                    {/* Actions */}
                    <div className="flex gap-2 pt-3">
                      <Link
                        to={`/admin/workshopdetails/${workshop._id}`}
                        className="flex-1 flex items-center justify-center gap-1 bg-green-100 text-green-600 py-2 rounded-lg hover:bg-green-200 transition text-sm font-semibold"
                      >
                        <Eye className="w-4 h-4" /> View
                      </Link>

                      <button
                        onClick={() => handleDelete(workshop._id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </>
  );
}

