import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArtisanHeader from "../components/ArtisanHeader";
import { Edit, Eye, Calendar, Users, MapPin, Clock, Trash2 } from "lucide-react";
import { getWorkshopByIdAPI, deleteWorkshopAPI } from "../../services/allAPI";
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
        const response = await getWorkshopByIdAPI(id, {
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
        <ArtisanHeader />
        <div className="pt-28 px-10 min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 flex items-center justify-center">
          <p className="text-xl text-gray-600">Loading workshop details...</p>
        </div>
      </>
    );
  }

  if (!workshop) {
    return (
      <>
        <ArtisanHeader />
        <div className="pt-28 px-10 min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 flex items-center justify-center">
          <p className="text-xl text-gray-600">Workshop not found</p>
        </div>
      </>
    );
  }

  const mainImage =
    workshop.image && workshop.image.length > 0
      ? workshop.image[0].startsWith("http")
        ? workshop.image[0]
        : `${serverURL}/${workshop.image[0]}`
      : "https://via.placeholder.com/600x400?text=No+Image";

  // Handle Delete
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this workshop? This action cannot be undone.")) {
      try {
        const response = await deleteWorkshopAPI(id, {
          Authorization: `Bearer ${token}`,
        });

        if (response.status === 200) {
          alert("Workshop deleted successfully!");
          navigate("/artician/workshops");
        }
      } catch (err) {
        console.error("Error deleting workshop:", err);
        alert("Failed to delete workshop");
      }
    }
  };

  return (
    <>
      <ArtisanHeader />

      <div className="pt-28 px-10 min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-gray-600">
          <span>Home</span> / <span>Workshops</span> / <span className="text-gray-900 font-semibold">{workshop.title}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
          {/* Left: Image Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={mainImage}
                alt={workshop.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {workshop.image && workshop.image.length > 1 && (
              <div className="flex gap-3">
                {workshop.image.map((img, idx) => (
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

          {/* Right: Workshop Info */}
          <div className="flex flex-col gap-6">
            {/* Title */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {workshop.title}
              </h1>
            </div>

            {/* Status */}
            <div className="flex items-center gap-4">
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-lg font-semibold">
                Active
              </div>
              <p className="text-gray-600">Listed on {new Date().toLocaleDateString()}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <p className="text-4xl font-bold text-orange-600">₹ {workshop.price}</p>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {workshop.description}
              </p>
            </div>

            {/* Details */}
            <div className="space-y-3 bg-white/50 p-6 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold text-gray-900">{workshop.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-semibold text-gray-900">{workshop.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-semibold text-gray-900">{workshop.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Available Seats</p>
                  <p className="font-semibold text-gray-900">{workshop.seats} seats</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-4">
                <button
                  onClick={() => navigate(`/artician/workshops/edit/${id}`)}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition"
                >
                  <Edit className="w-5 h-5" />
                  Edit Workshop
                </button>
                <button
                  onClick={() => navigate("/artician/workshops")}
                  className="flex-1 bg-white/80 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                >
                  <Eye className="w-5 h-5" />
                  Back to Workshops
                </button>
              </div>

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