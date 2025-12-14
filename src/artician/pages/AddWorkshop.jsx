import React, { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Users, PlusCircle, Camera } from "lucide-react";
import ArtisanHeader from "../components/ArtisanHeader";
import { addWorkshopAPI } from "../../services/allAPI";

export default function AddWorkshop() {
  const [token, setToken] = useState("");

  const [workshopData, setWorkshopData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    price: "",
    location: "",
    seats: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    const t = sessionStorage.getItem("token");
    setToken(t);
  }, []);

  // Handle image upload
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  //Handle Reset
  const handleReset = () => {
    setWorkshopData({
      title: "",
      description: "",
      date: "",
      time: "",
      price: "",
      location: "",
      seats: "",
    });
    setImage(null);
  };

  // Handle Add Workshop
  const handleAddWorkshop = async (e) => {
    e.preventDefault();

    try {
      if (!workshopData.title || !workshopData.description || !workshopData.date || !workshopData.time || !workshopData.price || !workshopData.location || !workshopData.seats || !image) {
        alert("Please fill all fields and upload an image");
        return;
      }

      if (!token) {
        alert("You are not authenticated.");
        return;
      }

      const updatedToken = token.replace(/"/g, "");

      const formData = new FormData();
      formData.append("title", workshopData.title);
      formData.append("description", workshopData.description);
      formData.append("date", workshopData.date);
      formData.append("time", workshopData.time);
      formData.append("price", workshopData.price);
      formData.append("location", workshopData.location);
      formData.append("seats", workshopData.seats);
      formData.append("image", image);

      const reqHeader = {
        Authorization: `Bearer ${updatedToken}`,
      };

      const response = await addWorkshopAPI(formData, reqHeader);

      if (response.status === 201) {
        alert("Workshop added successfully!");
        console.log("Added Workshop:", response.data.workshop);
        handleReset();
        window.location.href = "/artician/workshops";
      }
    } catch (error) {
      console.error("Error adding workshop:", error);
      alert("Error adding workshop. Please try again.");
    }
  };

  return (
    <>
      <ArtisanHeader />

      <div className="pt-28 px-10 min-h-screen bg-gradient-to-br 
                      from-orange-50 via-amber-50 to-rose-50 relative">

        {/* Background Decorations */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-24 left-24 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-[26rem] h-[26rem] bg-rose-200/25 rounded-full blur-3xl"></div>
        </div>

        <h1 className="text-5xl font-extrabold text-gray-900 mb-10 flex items-center gap-4">
          <PlusCircle className="w-10 h-10 text-orange-600" />
          Add New Workshop
        </h1>

        <div className="bg-white/70 backdrop-blur-xl border border-white/40 
                        rounded-3xl shadow-2xl p-10 max-w-4xl mx-auto space-y-8">

          {/* Workshop Title */}
          <div>
            <label className="font-semibold text-gray-700 mb-2 block">Workshop Title</label>
            <input
              type="text"
              name="title"
              value={workshopData.title}
              onChange={(e) => setWorkshopData({ ...workshopData, title: e.target.value })}
              placeholder="Enter workshop title"
              className="w-full p-4 rounded-xl border-2 border-gray-200 bg-white 
                         focus:border-orange-500 focus:ring-2 focus:ring-orange-100 
                         outline-none transition"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="font-semibold text-gray-700 mb-2 block">Workshop Image</label>
            <div className="w-full h-56 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col justify-center items-center cursor-pointer hover:border-orange-500 transition relative overflow-hidden bg-gradient-to-br from-orange-50/50 to-rose-50/50">
              <input
                type="file"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Camera className="w-12 h-12 text-gray-400 mb-2" />
              <p className="text-gray-500 text-sm font-medium">Click to upload image</p>
              {image && (
                <p className="text-orange-600 text-sm mt-2 font-semibold">
                  ✓ {image.name}
                </p>
              )}
            </div>
          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Date */}
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
              <input
                type="date"
                name="date"
                value={workshopData.date}
                onChange={(e) => setWorkshopData({ ...workshopData, date: e.target.value })}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white 
                           focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition"
              />
            </div>

            {/* Time */}
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
              <input
                type="text"
                name="time"
                value={workshopData.time}
                onChange={(e) => setWorkshopData({ ...workshopData, time: e.target.value })}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white 
                           focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition"
              />
            </div>

          </div>

          {/* Location */}
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
            <input
              type="text"
              name="location"
              value={workshopData.location}
              onChange={(e) => setWorkshopData({ ...workshopData, location: e.target.value })}
              placeholder="Workshop Location"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white 
                         focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition"
            />
          </div>

          {/* Seats */}
          <div className="relative">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
            <input
              type="number"
              name="seats"
              value={workshopData.seats}
              onChange={(e) => setWorkshopData({ ...workshopData, seats: e.target.value })}
              placeholder="Available Seats"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white 
                         focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition"
            />
          </div>

          {/* Price */}
          <div>
            <input
              type="number"
              name="price"
              value={workshopData.price}
              onChange={(e) => setWorkshopData({ ...workshopData, price: e.target.value })}
              placeholder="Workshop Price"
              className="w-full p-4 rounded-xl border-2 border-gray-200 bg-white 
                         focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold text-gray-700 mb-2 block">Description</label>
            <textarea
              name="description"
              value={workshopData.description}
              onChange={(e) => setWorkshopData({ ...workshopData, description: e.target.value })}
              placeholder="Describe what the workshop covers..."
              rows="4"
              className="w-full p-4 rounded-xl border-2 border-gray-200 bg-white 
                         focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleAddWorkshop}
            className="w-full py-4 mt-4 bg-gradient-to-r from-orange-500 to-rose-500 
                       text-white font-semibold rounded-xl shadow-lg 
                       hover:shadow-xl hover:scale-[1.03] transition text-lg"
          >
            Add Workshop
          </button>

        </div>
      </div>
    </>
  );
}
