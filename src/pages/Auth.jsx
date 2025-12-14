import React, { useState } from "react";
import { User, Mail, Lock, LogIn, Palette, Scissors, Sparkles } from "lucide-react";
import { registerUserAPI, loginUserAPI,googleAuthAPI } from "../services/allAPI";
import { Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode";


export default function Auth() {
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ---------------------------------------------------
      //  REGISTER
      // ---------------------------------------------------
      if (mode === "register") {
        if (!formData.fullName || !formData.email || !formData.password) {
          alert("Please fill all fields");
          return;
        }

        const response = await registerUserAPI({
          name: formData.fullName,
          email: formData.email,
          password: formData.password
        });
        console.log("REGISTER SUCCESS:", response.data);

        alert("Registration successful!");
        setMode("login");
        return;
      }

      // ---------------------------------------------------
      //  LOGIN
      // ---------------------------------------------------
      if (!formData.email || !formData.password) {
        alert("Please enter email & password");
        return;
      }

      const response = await loginUserAPI({
        email: formData.email,
        password: formData.password,
      });

      console.log("LOGIN SUCCESS:", response.data);

      const { token, user } = response.data;

      // Save token
      sessionStorage.setItem("token", JSON.stringify(token));
      sessionStorage.setItem("user", JSON.stringify(user));

      alert("Login successful!");

      // Redirect based on role
      if (user.role === "admin") {
        window.location.href = "/admin";
      } 
      else if (user.role === "artician") {
        window.location.href = "/artician";
      } 
      else {
        window.location.href = "/";
      }

    } catch (error) {
      console.error("AUTH ERROR:", error);
      alert("Authentication failed!");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      console.log("GOOGLE CREDENTIAL RESPONSE:", credentialResponse);
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("DECODED CREDENTIAL:", decoded);
      const response = await googleAuthAPI({
        email: decoded.email,
        password: "googlepswd",
        username: decoded.name,
      });
      console.log("GOOGLE AUTH SUCCESS:", response.data);
    } catch (error) {
      console.error("GOOGLE LOGIN ERROR:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 p-4 relative overflow-hidden">

      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl"></div>
        <Scissors className="absolute top-32 right-1/4 text-orange-200/40 w-16 h-16 rotate-12" />
        <Palette className="absolute bottom-32 left-1/4 text-amber-200/40 w-20 h-20 -rotate-12" />
      </div>

      {/* Main Card */}
      <div className="w-full max-w-5xl bg-white/70 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden border border-white/50 relative z-10">
        <div className="flex flex-col md:flex-row">

          {/* Left Panel */}
          <div className="md:w-1/2 bg-gradient-to-br from-orange-500 via-amber-500 to-rose-500 p-12 text-white flex flex-col justify-center items-center relative">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
              <div className="absolute bottom-20 right-10 w-40 h-40 border-4 border-white rotate-45"></div>
              <div className="absolute top-1/2 left-1/3 w-24 h-24 border-4 border-white rounded-lg -rotate-12"></div>
            </div>

            <div className="relative z-10 text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                  <Scissors className="text-orange-500 w-10 h-10" />
                </div>
              </div>

              <h1 className="text-4xl font-bold mb-4">CraftHub</h1>
              <p className="text-amber-100 text-lg mb-8 leading-relaxed">
                Your local marketplace for artisans, workshops, and creative communities
              </p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="md:w-1/2 p-12 flex flex-col justify-center">

            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-rose-400 rounded-xl flex items-center justify-center">
                  {mode === "register" ? <User className="text-white w-6 h-6" /> : <LogIn className="text-white w-6 h-6" />}
                </div>

                <h2 className="text-3xl font-bold text-gray-800">
                  {mode === "register" ? "Join the Community" : "Welcome Back"}
                </h2>
              </div>

              <p className="text-gray-600">
                {mode === "register"
                  ? "Create your account to start exploring"
                  : "Sign in to continue your creative journey"}
              </p>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-5">

              {mode === "register" && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                type="button"
                className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white py-3.5 rounded-xl shadow-lg hover:scale-[1.02] transition font-semibold text-lg flex items-center justify-center gap-2"
              >
                {mode === "register" ? (
                  <>
                    <Sparkles className="w-5 h-5" /> Create Account
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" /> Sign In
                  </>
                )}
              </button>
              <div className="w-full flex justify-center mt-4 bg-transparent relative z-50">
                <GoogleLogin onClick={() => handleGoogleLogin(credentialResponse)}
                  onSuccess={(credentialResponse) => {
                    handleGoogleLogin(credentialResponse);
                  }}
                  onError={() => {
                    console.log("GOOGLE FAILED");
                  }}
                />
              </div>

              {/* Toggle Mode */}
              <p className="text-center mt-8 text-gray-600">
                {mode === "register" ? (
                  <>
                    Already have an account?{" "}
                    <button onClick={() => setMode("login")} className="text-orange-600 font-semibold">
                      Sign In
                    </button>
                  </>
                ) : (
                  <>
                    Don’t have an account?{" "}
                    <button onClick={() => setMode("register")} className="text-orange-600 font-semibold">
                      Create One
                    </button>
                  </>
                )}
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
