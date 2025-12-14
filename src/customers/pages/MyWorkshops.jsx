import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import WorkshopCard from "../components/WorkshopCard";
import { CalendarCheck } from "lucide-react";
import { getUserWorkshopsAPI } from "../../services/allAPI";

export default function MyWorkshops() {
	const [workshops, setWorkshops] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const fetchWorkshops = async (rawToken) => {
		try {
			const cleanToken = rawToken.replace(/"/g, "");
			const reqHeader = {
				Authorization: `Bearer ${cleanToken}`,
			};
			const response = await getUserWorkshopsAPI(reqHeader);
			if (response.status === 200) {
				setWorkshops(response.data.workshops || []);
				console.log("User workshops:", response.data.workshops);
			} else {
				setError("Failed to load workshops");
			}
		} catch (err) {
			console.error("Error fetching workshops:", err);
			setError("Error fetching workshops");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const storedToken = sessionStorage.getItem("token");
		if (storedToken) {
			fetchWorkshops(storedToken);
		} else {
			setLoading(false);
			setError("You need to log in to view workshops.");
		}
	}, []);

	return (
		<>
			<Header />

			<div className="pt-28 px-10 min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 relative">
				{/* Decorative Background */}
				<div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
					<div className="absolute top-24 left-24 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl"></div>
					<div className="absolute bottom-24 right-16 w-[26rem] h-[26rem] bg-rose-200/25 rounded-full blur-3xl"></div>
				</div>

				{/* Page Header */}
				<h1 className="text-5xl font-extrabold text-gray-900 mb-12 flex items-center gap-4">
					<CalendarCheck className="w-10 h-10 text-orange-600" />
					Workshops
				</h1>

				{/* Content */}
				{loading ? (
					<p className="text-gray-700 text-lg">Loading workshops...</p>
				) : error ? (
					<p className="text-rose-600 text-lg">{error}</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
						{workshops.length > 0 ? (
							workshops.map((ws) => <WorkshopCard key={ws._id} workshop={ws} />)
						) : (
							<p className="text-gray-600">No workshops found.</p>
						)}
					</div>
				)}
			</div>

			<Footer />
		</>
	);
}

