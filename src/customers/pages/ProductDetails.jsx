import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Heart, Shield, ShoppingCart, Star, Truck } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getProductByIdForUserAPI } from "../../services/allAPI";
import { serverURL } from "../../services/serverURL";

export default function ProductDetails() {
	const { id } = useParams();
	const navigate = useNavigate();

	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [token, setToken] = useState("");

	useEffect(() => {
		const storedToken = sessionStorage.getItem("token");
		if (storedToken) {
			setToken(storedToken.replace(/"/g, ""));
		} else {
			setError("Please log in to view product details.");
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (!id || !token) return;

		const fetchProduct = async () => {
			setLoading(true);
			setError("");
			try {
				const headers = { Authorization: `Bearer ${token}` };
				const response = await getProductByIdForUserAPI(id, headers);

				if (response.status === 200 && response.data?.product) {
					setProduct(response.data.product);
				} else {
					setError("Product not found.");
				}
			} catch (err) {
				console.error("Error fetching product:", err);
				setError("Unable to load this product right now.");
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [id, token]);

	const mainImage =
		product?.images && product.images.length > 0
			? product.images[0].startsWith("http")
				? product.images[0]
				: `${serverURL}/${product.images[0]}`
			: "https://via.placeholder.com/700x500?text=No+Image";

	const discountPercent =
		product?.discountPrice && product.discountPrice > 0
			? Math.round(((product.price - product.discountPrice) / product.price) * 100)
			: 0;

	const finalPrice =
		product?.discountPrice && product.discountPrice > 0
			? product.discountPrice
			: product?.price;

	const averageRating =
		product?.ratings?.length > 0
			? (product.ratings.reduce((sum, r) => sum + (r.stars || 0), 0) / product.ratings.length).toFixed(1)
			: "0.0";

	const handleAddToCart = () => {
		alert("Add to cart flow coming soon.");
	};

	const handleWishlist = () => {
		alert("Wishlist flow coming soon.");
	};

	const renderContent = () => {
		if (loading) {
			return (
				<div className="pt-28 px-6 md:px-12 min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 flex items-center justify-center">
					<p className="text-lg text-gray-700">Loading product details...</p>
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

		if (!product) return null;

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

				<div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
					<div className="space-y-4">
						<div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
							<img src={mainImage} alt={product.title} className="w-full h-[430px] object-cover" />
							{discountPercent > 0 && (
								<span className="absolute top-4 right-4 bg-rose-500 text-white px-3 py-1 rounded-full font-semibold">
									-{discountPercent}%
								</span>
							)}
						</div>

						{product.images && product.images.length > 1 && (
							<div className="flex gap-3 overflow-x-auto pb-2">
								{product.images.map((img, idx) => (
									<img
										key={idx}
										src={img.startsWith("http") ? img : `${serverURL}/${img}`}
										alt={`Thumbnail ${idx + 1}`}
										className="w-20 h-20 rounded-xl object-cover border border-transparent hover:border-orange-500 transition"
									/>
								))}
							</div>
						)}
					</div>

					<div className="flex flex-col gap-6">
						<div>
							<p className="text-sm font-semibold uppercase text-orange-600">{product.category || "Product"}</p>
							<h1 className="text-4xl font-bold text-gray-900 mt-2">{product.title}</h1>
							<p className="text-gray-600 mt-1">By {product.artisan?.fullName || "Unknown artisan"}</p>
						</div>

						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2 bg-white/80 px-3 py-1 rounded-full">
								<Star className="w-4 h-4 text-amber-500" />
								<span className="font-semibold text-gray-800">{averageRating}</span>
							</div>
							<div className="flex items-center gap-2 text-sm text-gray-600">
								<Shield className="w-4 h-4 text-green-600" />
								<span>Secure checkout</span>
							</div>
							<div className="flex items-center gap-2 text-sm text-gray-600">
								<Truck className="w-4 h-4 text-orange-600" />
								<span>Fast delivery</span>
							</div>
						</div>

						<div className="flex items-baseline gap-3">
							<p className="text-4xl font-bold text-orange-600">₹ {finalPrice}</p>
							{product.discountPrice && product.discountPrice > 0 && (
								<p className="text-2xl text-gray-400 line-through">₹ {product.price}</p>
							)}
						</div>

						<div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
							<p className="text-gray-700 leading-relaxed">{product.description}</p>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<div className="flex items-center gap-3 bg-white/80 p-4 rounded-xl">
								<Truck className="w-5 h-5 text-orange-600" />
								<p className="text-gray-700">Free shipping on orders over ₹500</p>
							</div>
							<div className="flex items-center gap-3 bg-white/80 p-4 rounded-xl">
								<Shield className="w-5 h-5 text-green-600" />
								<p className="text-gray-700">30-day return policy</p>
							</div>
						</div>

						<div className="flex flex-col sm:flex-row gap-3">
							<button
								onClick={handleAddToCart}
								className="flex-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white py-3 rounded-xl font-semibold shadow hover:shadow-lg flex items-center justify-center gap-2"
							>
								<ShoppingCart className="w-5 h-5" />
								Add to Cart
							</button>
							<button
								onClick={handleWishlist}
								className="w-full sm:w-14 h-12 sm:h-auto sm:flex-none bg-white/80 border border-gray-200 text-gray-800 rounded-xl flex items-center justify-center hover:bg-white"
							>
								<Heart className="w-5 h-5" />
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
			{renderContent()}
			<Footer />
		</>
	);
}
