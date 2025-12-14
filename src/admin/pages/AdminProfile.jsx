import React from "react";
import { User, Mail, Phone, MapPin, Shield, Edit3, X, Camera } from "lucide-react";
import AdminHeader from "../components/AdminHeader";
import { useEffect, useState } from "react";

export default function AdminProfile() {
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
  const [successMessage, setSuccessMessage] = useState("");

  const fetchProfile = async () => {
    try {
      setLoading(true);
      // Get user from session storage
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setProfile(user);
        setFormData({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          address: user.address || ""
        });
        console.log("Admin profile:", user);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
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
      // Update the profile in session storage
      const updatedProfile = {
        ...profile,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address
      };

      sessionStorage.setItem("user", JSON.stringify(updatedProfile));
      setProfile(updatedProfile);
      setIsEditing(false);
      setNewProfileImage(null);
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      
      // Note: In production, you should implement a backend API to persist these changes
      console.log("Profile updated:", updatedProfile);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
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
        <AdminHeader />
        <div className="pt-28 px-10 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
      </>
    );
  }

  if (!profile) {
    return (
      <>
        <AdminHeader />
        <div className="pt-28 px-10 min-h-screen flex items-center justify-center">
          <p className="text-gray-600">Profile not found. Please login again.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminHeader />

      <div className="pt-28 px-10 min-h-screen bg-gray-50 relative">

        {/* Header */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-10 flex items-center gap-4">
          <Shield className="w-10 h-10 text-blue-600" />
          Admin Profile
        </h1>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
            {successMessage}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white shadow-2xl border border-gray-200 
                        rounded-3xl p-10 max-w-4xl mx-auto">

          {/* Profile Image */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative">
              <img
                src={newProfileImage ? URL.createObjectURL(newProfileImage) : (profile.profileImage || "https://cdn-icons-png.flaticon.com/128/3177/3177440.png")}
                alt="profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-blue-200 shadow-xl"
              />

              {isEditing && (
                <label className="absolute bottom-2 right-2 bg-white p-3 rounded-full 
                                   shadow-md hover:scale-110 transition cursor-pointer">
                  <Camera className="w-5 h-5 text-blue-600" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-5">{profile.name || "Admin"}</h2>
            <div className="flex items-center gap-2 mt-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <p className="text-blue-600 font-semibold capitalize">{profile.role || "Administrator"}</p>
            </div>
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
                            bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100
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
                            bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100
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
                            bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100
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
                            bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                            outline-none transition resize-none disabled:bg-gray-100"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Admin Stats */}
          <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Account Type</p>
                <p className="font-semibold text-gray-900">Administrator</p>
              </div>
              <div>
                <p className="text-gray-600">Access Level</p>
                <p className="font-semibold text-gray-900">Full Access</p>
              </div>
              <div>
                <p className="text-gray-600">Status</p>
                <p className="font-semibold text-green-600">Active</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center mt-10 flex gap-4 justify-center">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 px-10 py-4 
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
                  className="bg-gradient-to-r from-green-500 to-emerald-500 px-10 py-4 
                             rounded-full text-white font-semibold text-lg shadow-lg
                             hover:shadow-xl hover:scale-[1.03] transition"
                >
                  Save Changes
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
