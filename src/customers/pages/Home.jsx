import React from "react";
import { Scissors, Palette, Hammer, Camera, Sparkles, Brush, Shapes } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import {getUserProductsAPI} from "../../services/allAPI";

export default function Home() {
   const [products, setProducts] = useState([]);
   const [token, setToken] = useState("");

  const fetchProducts = async (rawToken) => {
    try {
      const cleanToken = rawToken.replace(/"/g, "");
      const reqHeader = {
        Authorization: `Bearer ${cleanToken}`,
      };
      const response = await getUserProductsAPI(reqHeader);
      if (response.status === 200) {
        const productsData = response.data.products || [];
        setProducts(productsData);
        setProductsData(productsData);
        console.log("User products:", productsData);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchProducts(storedToken);
    }
  }, []);
  
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 relative overflow-hidden">
      
      

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-16 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-[26rem] h-[26rem] bg-rose-200/20 rounded-full blur-3xl"></div>
        <Palette className="absolute top-40 right-1/5 text-orange-200/30 w-24 h-24 rotate-12" />
        <Shapes className="absolute bottom-36 left-1/4 text-amber-200/30 w-28 h-28 -rotate-12" />
      </div>

      {/* ===================== HERO SECTION ===================== */}
      <section className="relative z-10 px-8 py-24 flex flex-col md:flex-row items-center justify-between">

        {/* Left Text Side */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
            Celebrate <span className="text-orange-600">Creativity</span><br /> in Every Form
          </h1>

          <p className="text-gray-700 text-lg max-w-md">
            Discover handcrafted goods, connect with talented artisans, join workshops,
            and bring unique creations to life.
          </p>

          <div className="flex gap-4 mt-6">
            <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-full shadow-lg hover:shadow-xl transition hover:scale-[1.03] font-semibold">
              Explore Artisans
            </button>
            <button className="px-6 py-3 bg-white/60 backdrop-blur-md border border-white rounded-full shadow hover:bg-white/80 transition font-semibold text-gray-800">
            <Link to="/artician/login">
              Join as Artisan
              </Link>
            </button>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
          
        </div>
      </section>

      {/* ===================== CATEGORY SECTION ===================== */}
      <section className="relative z-10 px-8 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Popular Artisan Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">

          {/* Category Card */}
          {[
            { icon: <Palette className="w-10 h-10 text-orange-500" />, title: "Painting" },
            { icon: <Scissors className="w-10 h-10 text-orange-500" />, title: "Crafts" },
            { icon: <Hammer className="w-10 h-10 text-orange-500" />, title: "Woodwork" },
            { icon: <Camera className="w-10 h-10 text-orange-500" />, title: "Photography" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-lg p-6 flex flex-col items-center gap-3 hover:shadow-2xl hover:scale-[1.03] transition cursor-pointer"
            >
              {item.icon}
              <p className="font-semibold text-gray-800">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-8 py-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-14">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
            {products.length > 0 ? (
              products.map((item) => <ProductCard key={item._id} product={item} />)
            ) : (
              <p className="col-span-full text-center text-gray-700 text-xl">
                No products found.
              </p>
            )}
          </div>
        </section>

      {/* ===================== FEATURED ARTISANS ===================== */}
      <section className="relative z-10 px-8 py-20 bg-white/60 backdrop-blur-xl border-y border-white/40">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-14">
          Featured Artisans
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {[ 
            {
              name: "Alicia Woods",
              role: "Woodwork Artist",
              img: "https://magazine.cim.org/media/5359/cropped-alicia-woods-covergalls.jpg?anchor=center&mode=crop&width=1200&height=627&rnd=131672423700000000"
            },
            {
              name: "Arjun Sharma",
              role: "Traditional Painter",
              img: "https://d.ibtimes.com/en/full/4481126/siachen-glacier-silicon-valley-arjun.png?w=1600&h=900&l=50&t=30&q=88&f=cf054e5faddbe0956cec08e48549d25c"
            },
            {
              name: "Anita Dongre",
              role: "Craft Designer",
              img: "https://img.businessoffashion.com/resizer/v2/https%3A%2F%2Fprod-bof-media.s3.eu-west-1.amazonaws.com%2Fimport%2Fprofiles%2Fasset%2F1577070335657137%2Fanita-dongre-1577070492692863.png?auth=0ed15e72dc28b3740290139a41c293a877feccc9146cdeecaaec9fb45055255b&width=960&height=540&smart=true"
            }
          ].map((artisan, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition"
            >
              <img
                src={artisan.img}
                alt="artisan"
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{artisan.name}</h3>
                <p className="text-gray-600 mt-1">{artisan.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== CTA SECTION ===================== */}
      <section className="relative z-10 text-center py-20 px-8 bg-gradient-to-r from-orange-500 to-rose-500 text-white">
        <Sparkles className="w-14 h-14 mx-auto mb-4" />
        <h2 className="text-4xl font-bold mb-4">Are You an Artisan?</h2>
        <p className="text-lg mb-6">
          Join thousands of creators and showcase your handcrafted designs.
        </p>
        <button className="px-10 py-4 bg-white text-orange-600 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition hover:scale-[1.03]">
          Join CraftHub Today
        </button>
      </section>
    </div>
    <Footer />
    </>
  );
}
