import React from "react";
import { User, Mail, Phone, MapPin, Camera, Edit3, X } from "lucide-react";
import ArtisanHeader from "../components/ArtisanHeader";
import { useEffect, useState } from "react";
import { getArticianProfileAPI, updateArticianProfileAPI } from "../../services/allAPI";

export default function ArtisanProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchProfile = async (rawToken) => {
    try {
      setLoading(true);
      const cleanToken = rawToken.replace(/"/g, "");
      const reqHeader = {
        Authorization: `Bearer ${cleanToken}`,
      };
      const response = await getArticianProfileAPI(reqHeader);
      if (response.status === 200) {
        setProfile(response.data.artisan);
        setFormData({
          name: response.data.artisan.name || "",
          email: response.data.artisan.email || "",
          phone: response.data.artisan.phone || "",
          address: response.data.artisan.address || ""
        });
        console.log("Artisan profile:", response.data.artisan);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (!storedToken) return;
    fetchProfile(storedToken);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setNewProfileImage(e.target.files[0]);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setUpdating(true);
      const cleanToken = sessionStorage.getItem("token").replace(/"/g, "");
      
      const reqHeader = {
        Authorization: `Bearer ${cleanToken}`,
      };

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("address", formData.address);
      
      if (newProfileImage) {
        formDataToSend.append("profileImage", newProfileImage);
      }

      const response = await updateArticianProfileAPI(formDataToSend, reqHeader);

      if (response.status === 200) {
        setProfile(response.data.artisan);
        setIsEditing(false);
        setNewProfileImage(null);
        setSuccessMessage("Profile updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
        console.log("Profile updated:", response.data.artisan);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewProfileImage(null);
    setFormData({
      name: profile.name || "",
      email: profile.email || "",
      phone: profile.phone || "",
      address: profile.address || ""
    });
  };

  if (loading) {
    return (
      <>
        <ArtisanHeader />
        <div className="pt-28 px-10 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
      </>
    );
  }

  if (!profile) {
    return (
      <>
        <ArtisanHeader />
        <div className="pt-28 px-10 min-h-screen flex items-center justify-center">
          <p className="text-gray-600">Profile not found. Please login again.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <ArtisanHeader />

      <div className="pt-28 px-10 min-h-screen bg-gradient-to-br 
                      from-orange-50 via-amber-50 to-rose-50 relative">

        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-20 left-24 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-16 right-24 w-104 h-104 bg-rose-200/25 rounded-full blur-3xl"></div>
        </div>

        {/* Header */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-10 flex items-center gap-4">
          <User className="w-10 h-10 text-orange-600" />
          My Profile
        </h1>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
            {successMessage}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white/70 backdrop-blur-xl shadow-2xl border border-white/40 
                        rounded-3xl p-10 max-w-4xl mx-auto">

          {/* Profile Image */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative">
              <img
                src={newProfileImage ? URL.createObjectURL(newProfileImage) : (profile.profileImage || "https://cdn-icons-png.flaticon.com/128/3177/3177440.png")}
                alt="profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-xl"
              />

              {isEditing && (
                <label className="absolute bottom-2 right-2 bg-white p-3 rounded-full 
                                   shadow-md hover:scale-110 transition cursor-pointer">
                  <Camera className="w-5 h-5 text-orange-600" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-5">{profile.name || "Artisan"}</h2>
            <p className="text-gray-600 capitalize">{profile.role || "Artisan"} Member</p>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Full Name */}
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200
                            bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100
                            outline-none transition disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200
                            bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100
                            outline-none transition disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Phone Number</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  placeholder="Not provided"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200
                            bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100
                            outline-none transition disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Address</label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-3.5 text-gray-400" />
                <textarea
                  rows="3"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  placeholder="Not provided"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200
                            bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100
                            outline-none transition resize-none disabled:bg-gray-100"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center mt-10 flex gap-4 justify-center">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-orange-500 to-rose-500 px-10 py-4 
                           rounded-full text-white font-semibold text-lg shadow-lg
                           hover:shadow-xl hover:scale-[1.03] transition flex items-center gap-2"
              >
                <Edit3 className="w-5 h-5" />
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleUpdateProfile}
                  disabled={updating}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 px-10 py-4 
                             rounded-full text-white font-semibold text-lg shadow-lg
                             hover:shadow-xl hover:scale-[1.03] transition disabled:opacity-50"
                >
                  {updating ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-400 px-10 py-4 rounded-full text-white font-semibold 
                             text-lg shadow-lg hover:shadow-xl hover:scale-[1.03] transition
                             flex items-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
