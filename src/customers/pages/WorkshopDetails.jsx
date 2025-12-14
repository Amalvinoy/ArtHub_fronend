import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin, Shield, Users, Wallet } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getWorkshopByIdForUserAPI } from "../../services/allAPI";
import { serverURL } from "../../services/serverURL";

export default function WorkshopDetails() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [workshop, setWorkshop] = useState(null);
	const [token, setToken] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const storedToken = sessionStorage.getItem("token");
		if (storedToken) {
			setToken(storedToken.replace(/"/g, ""));
		} else {
			setError("Please log in to view workshop details.");
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (!id || !token) return;

		const fetchWorkshop = async () => {
			setLoading(true);
			setError("");
			try {
				const headers = { Authorization: `Bearer ${token}` };
				const response = await getWorkshopByIdForUserAPI(id, headers);

				if (response.status === 200 && response.data?.workshop) {
					setWorkshop(response.data.workshop);
				} else {
					setError("Workshop not found.");
				}
			} catch (err) {
				console.error("Error fetching workshop:", err);
				setError("Unable to load this workshop right now.");
			} finally {
				setLoading(false);
			}
		};

		fetchWorkshop();
	}, [id, token]);

	const imageUrl = (() => {
		if (!workshop?.image) return "https://via.placeholder.com/800x500?text=No+Image";
		const img = Array.isArray(workshop.image) ? workshop.image[0] : workshop.image;
		if (!img) return "https://via.placeholder.com/800x500?text=No+Image";
		return typeof img === "string" && img.startsWith("http") ? img : `${serverURL}${img}`;
	})();

	const handleReserve = () => {
		alert("Workshop booking flow coming soon.");
	};

	const renderBody = () => {
		if (loading) {
			return (
				<div className="pt-28 px-6 md:px-12 min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 flex items-center justify-center">
					<p className="text-lg text-gray-700">Loading workshop details...</p>
				</div>
			);
		}

		if (error) {
			return (
				<div className="pt-28 px-6 md:px-12 min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 flex flex-col items-center justify-center gap-4 text-center">
					<p className="text-xl font-semibold text-gray-800">{error}</p>
					<div className="flex gap-3">
						<button
							onClick={() => navigate(-1)}
							className="px-5 py-3 rounded-lg bg-white/80 border border-gray-200 text-gray-800 font-semibold hover:bg-white"
						>
							Go Back
						</button>
						<button
							onClick={() => navigate("/login")}
							className="px-5 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold shadow hover:shadow-lg"
						>
							Login
						</button>
					</div>
				</div>
			);
		}

		if (!workshop) return null;

		return (
			<div className="pt-28 px-6 md:px-12 min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50">
				<div className="max-w-6xl mx-auto mb-10">
					<button
						onClick={() => navigate(-1)}
						className="inline-flex items-center gap-2 text-gray-700 hover:text-orange-600 transition"
					>
						<ArrowLeft className="w-5 h-5" />
						Back
					</button>
				</div>

				<div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
					<div className="bg-white rounded-3xl shadow-xl overflow-hidden">
						<img src={imageUrl} alt={workshop.title} className="w-full h-[420px] object-cover" />
					</div>

					<div className="flex flex-col gap-6">
						<div>
							<p className="text-sm font-semibold uppercase text-orange-600">Workshop</p>
							<h1 className="text-4xl font-bold text-gray-900 mt-2">{workshop.title}</h1>
							<p className="text-gray-600 mt-1">By {workshop.artisan?.name || "Unknown artisan"}</p>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-800">
							<div className="flex items-center gap-3 bg-white/80 p-4 rounded-xl">
								<Calendar className="w-5 h-5 text-orange-600" />
								<span>{workshop.date || "Date to be announced"}</span>
							</div>
							<div className="flex items-center gap-3 bg-white/80 p-4 rounded-xl">
								<Clock className="w-5 h-5 text-rose-500" />
								<span>{workshop.time || "Time to be announced"}</span>
							</div>
							<div className="flex items-center gap-3 bg-white/80 p-4 rounded-xl">
								<MapPin className="w-5 h-5 text-amber-600" />
								<span className="line-clamp-1">{workshop.location || "Location to be announced"}</span>
							</div>
							<div className="flex items-center gap-3 bg-white/80 p-4 rounded-xl">
								<Users className="w-5 h-5 text-green-600" />
								<span>{workshop.seats ? `${workshop.seats} seats available` : "Seats info pending"}</span>
							</div>
						</div>

						<div className="flex items-center gap-3 text-3xl font-bold text-orange-600">
							<Wallet className="w-7 h-7" />
							<span>₹ {workshop.price || 0}</span>
						</div>

						<div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">About this workshop</h3>
							<p className="text-gray-700 leading-relaxed">{workshop.description || "No description provided."}</p>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<div className="flex items-center gap-3 bg-white/80 p-4 rounded-xl">
								<Shield className="w-5 h-5 text-green-600" />
								<p className="text-gray-700">Secure booking & refunds</p>
							</div>
							<div className="flex items-center gap-3 bg-white/80 p-4 rounded-xl">
								<MapPin className="w-5 h-5 text-orange-600" />
								<p className="text-gray-700">Location details shared after booking</p>
							</div>
						</div>

						<div className="flex flex-col sm:flex-row gap-3">
							<button
								onClick={handleReserve}
								className="flex-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white py-3 rounded-xl font-semibold shadow hover:shadow-lg"
							>
								Reserve Spot
							</button>
							<button
								onClick={() => navigate(-1)}
								className="px-5 py-3 bg-white/80 border border-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-white"
							>
								Back
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<>
			<Header />
			{renderBody()}
			<Footer />
		</>
	);
}
