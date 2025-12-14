import React, { useState, useEffect } from "react";
import ArtisanHeader from "../components/ArtisanHeader";
import { Pencil, Camera } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  updateWorkshopAPI, 
  getWorkshopByIdAPI 
} from "../../services/allAPI";
import { serverURL } from "../../services/serverURL";

export default function EditWorkshop() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [workshop, setWorkshop] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    price: "",
    location: "",
    seats: "",
    image: []
  });

  const [newImage, setNewImage] = useState(null);

  // Load Token
  useEffect(() => {
    const t = sessionStorage.getItem("token");
    if (t) setToken(t.replace(/"/g, ""));
  }, []);

  // Load Existing Workshop
  useEffect(() => {
    if (!token || !id) return;

    const fetchWorkshop = async () => {
      try {
        const response = await getWorkshopByIdAPI(id, {
          Authorization: `Bearer ${token}`
        });

        if (response.status === 200) {
          setWorkshop(response.data.workshop);
        }

      } catch (err) {
        console.error("Error loading workshop:", err);
      }
    };

    fetchWorkshop();
  }, [token, id]);

  // Handle Input
  const handleChange = (e) => {
    setWorkshop({ ...workshop, [e.target.name]: e.target.value });
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  // Submit Update
  const handleUpdate = async () => {
    try {
      if (!workshop.title || !workshop.description || !workshop.date || !workshop.time || !workshop.price || !workshop.location || !workshop.seats) {
        alert("Please fill all required fields");
        return;
      }

      const formData = new FormData();
      formData.append("title", workshop.title);
      formData.append("description", workshop.description);
      formData.append("date", workshop.date);
      formData.append("time", workshop.time);
      formData.append("price", workshop.price);
      formData.append("location", workshop.location);
      formData.append("seats", workshop.seats);

      if (newImage) formData.append("image", newImage);

      const response = await updateWorkshopAPI(id, formData, {
        Authorization: `Bearer ${token}`
      });

      if (response.status === 200) {
        alert("Workshop updated successfully!");
        navigate("/artician/workshops");
      }

    } catch (err) {
      console.error("Update error:", err);
      alert("Update failed");
    }
  };

  return (
    <>
      <ArtisanHeader />

      <div className="pt-28 px-10 min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50">

        <h1 className="text-5xl font-extrabold text-gray-900 mb-10 flex items-center gap-4">
          <Pencil className="w-10 h-10 text-orange-600" />
          Edit Workshop
        </h1>

        <div className="bg-white/70 p-10 rounded-3xl shadow-xl max-w-4xl mx-auto space-y-8">

          {/* Image */}
          <div>
            <label className="font-semibold text-gray-700">Workshop Image</label>

            <div className="w-full h-56 border-2 border-dashed rounded-xl flex flex-col items-center justify-center mt-3 relative">
              
              {/* Existing Image */}
              {workshop.image?.length > 0 && (
                <img
                  src={workshop.image[0].startsWith('http') ? workshop.image[0] : `${serverURL}/${workshop.image[0]}`}
                  alt="Workshop"
                  className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-70"
                />
              )}

              <input 
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImageChange}
              />

              <Camera className="w-10 h-10 text-gray-700 relative z-10" />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="font-semibold">Workshop Title</label>
            <input
              type="text"
              name="title"
              value={workshop.title}
              onChange={handleChange}
              placeholder="Enter workshop title"
              className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold">Description</label>
            <textarea
              name="description"
              value={workshop.description}
              onChange={handleChange}
              placeholder="Describe your workshop"
              rows="4"
              className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 outline-none"
            ></textarea>
          </div>

          {/* Date */}
          <div>
            <label className="font-semibold">Date</label>
            <input
              type="text"
              name="date"
              value={workshop.date}
              onChange={handleChange}
              placeholder="e.g., March 15, 2025"
              className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 outline-none"
            />
          </div>

          {/* Time */}
          <div>
            <label className="font-semibold">Time</label>
            <input
              type="text"
              name="time"
              value={workshop.time}
              onChange={handleChange}
              placeholder="e.g., 2:00 PM – 5:00 PM"
              className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 outline-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="font-semibold">Location</label>
            <input
              type="text"
              name="location"
              value={workshop.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 outline-none"
            />
          </div>

          {/* Price */}
          <div>
            <label className="font-semibold">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={workshop.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 outline-none"
            />
          </div>

          {/* Seats */}
          <div>
            <label className="font-semibold">Available Seats</label>
            <input
              type="number"
              name="seats"
              value={workshop.seats}
              onChange={handleChange}
              placeholder="Enter number of seats"
              className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-orange-500 outline-none"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleUpdate}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl text-lg font-semibold hover:shadow-lg transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}
