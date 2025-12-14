import React, { useEffect, useState } from "react";
import { Trash2, Users, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import { getAllUsersAPI } from "../../services/allAPI";
import {deleteUserByIdAPI } from "../../services/allAPI";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (rawToken) => {
    try {
      setLoading(true);
      const cleanToken = rawToken.replace(/"/g, "");
      const reqHeader = {
        Authorization: `Bearer ${cleanToken}`
      };

      const response = await getAllUsersAPI(reqHeader);
      setUsers(response.data.users || []);
      console.log("Admin users:", response.data.users);
    } catch (err) {
      console.error("Error fetching users:", err);
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (!storedToken) return;

    setToken(storedToken);
    fetchUsers(storedToken);
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const cleanToken = token.replace(/"/g, "");
      const reqHeader = {
        Authorization: `Bearer ${cleanToken}`
      };

      await deleteUserByIdAPI(userId, reqHeader);
      setUsers(users.filter(u => u._id !== userId));
      alert("User deleted successfully");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user");
    }
  };

  return (
    <>
      <AdminHeader />

      <div className="p-10 pt-32 bg-gray-50 min-h-screen">

        {/* Page Title */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3">
            <Users className="w-10 h-10 text-blue-600" />
            Manage Users
          </h1>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-gray-500">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="p-10 text-center text-gray-500">No users found</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="p-4 text-left font-semibold text-gray-700">Name</th>
                  <th className="p-4 text-left font-semibold text-gray-700">Email</th>
                  <th className="p-4 text-left font-semibold text-gray-700">Role</th>
                  <th className="p-4 text-left font-semibold text-gray-700">Join Date</th>
                  <th className="p-4 text-left font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => {
                  const joinDate = user.createdAt 
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A";

                  return (
                    <tr key={user._id} className="border-b hover:bg-gray-50 transition">
                      <td className="p-4 font-medium text-gray-800">
                        {user.name}
                      </td>

                      <td className="p-4 text-gray-600 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {user.email}
                      </td>

                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          user.role === "customer" 
                            ? "bg-blue-100 text-blue-700"
                            : user.role === "admin"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {user.role || "customer"}
                        </span>
                      </td>

                      <td className="p-4 text-gray-600">{joinDate}</td>

                      <td className="p-4 flex gap-3">
                        <Link
                          to={`/admin/users/view/${user._id}`}
                          className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition font-semibold text-sm"
                        >
                          View
                        </Link>

                        <button 
                          onClick={() => handleDelete(user._id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:scale-105 transition"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          )}
        </div>

      </div>
    </>
  );
}

