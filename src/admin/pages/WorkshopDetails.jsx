import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import { Edit, Calendar, MapPin, Users, Trash2, ArrowLeft } from "lucide-react";
import { getWorkshopByIdAdminAPI, deleteWorkshopByIdAPI } from "../../services/allAPI";
import { serverURL } from "../../services/serverURL";

export default function WorkshopDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  // Load Token
  useEffect(() => {
    const t = sessionStorage.getItem("token");
    if (t) setToken(t.replace(/"/g, ""));
  }, []);

  // Fetch Workshop
  useEffect(() => {
    if (!token || !id) return;

    const fetchWorkshop = async () => {
      try {
        const response = await getWorkshopByIdAdminAPI(id, {
          Authorization: `Bearer ${token}`,
        });

        if (response.status === 200) {
          setWorkshop(response.data.workshop);
        }
      } catch (err) {
        console.error("Error fetching workshop:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshop();
  }, [id, token]);

  if (loading) {
    return (
      <>
        <AdminHeader />
        <div className="pt-28 px-10 min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-xl text-gray-600">Loading workshop details...</p>
        </div>
      </>
    );
  }

  if (!workshop) {
    return (
      <>
        <AdminHeader />
        <div className="pt-28 px-10 min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-xl text-gray-600">Workshop not found</p>
        </div>
      </>
    );
  }

  const mainImage =
    workshop.image
      ? (Array.isArray(workshop.image) ? workshop.image[0] : workshop.image).startsWith("http")
        ? Array.isArray(workshop.image) ? workshop.image[0] : workshop.image
        : `${serverURL}${Array.isArray(workshop.image) ? workshop.image[0] : workshop.image}`
      : "https://via.placeholder.com/600x400?text=No+Image";

  // Handle Delete
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this workshop? This action cannot be undone.")) {
      try {
        const response = await deleteWorkshopByIdAPI(id, {
          Authorization: `Bearer ${token}`,
        });

        if (response.status === 200) {
          alert("Workshop deleted successfully!");
          navigate("/admin/workshops");
        }
      } catch (err) {
        console.error("Error deleting workshop:", err);
        alert("Failed to delete workshop");
      }
    }
  };

  return (
    <>
      <AdminHeader />

      <div className="pt-28 px-10 min-h-screen bg-gray-50">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/workshops")}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Workshops</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
          {/* Left: Image */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={mainImage}
                alt={workshop.title}
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          {/* Right: Workshop Info */}
          <div className="flex flex-col gap-6">
            {/* Title */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {workshop.title}
              </h1>
            </div>

            {/* Artisan & Status */}
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg font-semibold">
                Active
              </div>
              <p className="text-gray-600">By {workshop.artisan?.name || "Unknown Artisan"}</p>
            </div>

            {/* Price */}
            <div>
              <p className="text-4xl font-bold text-purple-600">₹ {workshop.price}</p>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {workshop.description}
              </p>
            </div>

            {/* Workshop Details */}
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 bg-white/80 p-4 rounded-lg border border-gray-200">
                <Calendar className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Date & Time</p>
                  <p className="font-semibold text-gray-900">{workshop.date} • {workshop.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/80 p-4 rounded-lg border border-gray-200">
                <MapPin className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-semibold text-gray-900">{workshop.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/80 p-4 rounded-lg border border-gray-200">
                <Users className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Available Seats</p>
                  <p className="font-semibold text-gray-900">{workshop.seats} seats</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-4">

              {/* Delete Button */}
              <button
                onClick={handleDelete}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
              >
                <Trash2 className="w-5 h-5" />
                Delete Workshop
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

