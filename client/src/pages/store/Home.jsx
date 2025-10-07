import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import banner from "../../assets/banner.jpeg";
import { FiArrowRight } from "react-icons/fi";
import { categories } from "../../data/categories";
import { FiBox, FiRefreshCcw, FiSmartphone } from "react-icons/fi";
import { fetchFeaturedProducts, fetchPromoProducts } from "../../services/productService";


function Home() {
	const [featured, setFeatured] = useState([]);
	const [loading, setLoading] = useState(true);
	const [promos, setPromos] = useState([]);
	const [promoLoading, setPromoLoading] = useState(true);

	useEffect(() => {
		const loadFeatured = async () => {
			const response = await fetchFeaturedProducts();
			setFeatured(response.data); // ✅ instead of setting whole response
			setLoading(false);
		};


		loadFeatured();
	}, []);

	useEffect(() => {
		const loadPromos = async () => {
			const data = await fetchPromoProducts();
			setPromos(data);
			setPromoLoading(false);
		};

		loadPromos();
	}, []);

	return (
		<div className="min-h-screen">
			{/* ================================ 🔥 HERO SECTION ======================================= */}

			<div className="relative bg-white h-80 md:h-[26rem] overflow-hidden">
				<img
					src={banner}
					alt="Gadget Deals"
					loading="lazy"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-r to-black/30 z-0" />

				<div className="absolute inset-0 flex flex-col items-center md:items-start justify-center text-white px-6 md:px-16 text-center md:text-left z-10">
					<span className="bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full mb-3 shadow-md">
						New Arrivals
					</span>

					<h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight 
						bg-gradient-to-r from-sky-400 to-blue-600 
						bg-clip-text text-transparent drop-shadow-lg">
						Premium Gadgets.  
						Pure Innovation.
					</h1>

					<p className="text-lg md:text-xl mb-6 text-gray-200 max-w-xl">
						Young Gadget — the future of tech at unbeatable value.
					</p>

					<Link 
						to="/products"
						aria-label="Explore gadgets"
						className="bg-gradient-to-r from-blue-600 to-blue-700
						px-8 py-3 rounded-2xl font-medium
						hover:from-blue-700 hover:to-blue-800 
						flex items-center transition-all duration-300 ease-in-out 
						transform hover:scale-105 shadow-lg hover:shadow-blue-700/50"
					>
						Explore Gadgets <FiArrowRight className="ml-2 text-xl" />
					</Link>
				</div>
			</div>

			{/* ================================ 📦 CATEGORIES SECTION ======================================= */}
			<section className="px-6 md:px-16 py-12 bg-gray-50">
				<h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Top Categories</h2>
				<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4">
					{categories.map((cat) => {
						const Icon = cat.icon;
						return (
							<Link
								key={cat.slug}
								to={`/products?category=${cat.slug}`}
								className="group flex flex-col items-center text-center p-4 rounded-xl bg-white hover:bg-blue-50 transition-all shadow-sm hover:shadow-md"
							>
								<Icon className="text-3xl md:text-4xl text-blue-600 group-hover:scale-110 transition-transform duration-300 mb-2" />
								<span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
									{cat.title}
								</span>
							</Link>
						);
					})}
				</div>
			</section>


			{/* ================================ 🌟 FEATURED PRODUCTS ======================================= */}
			<section className="px-6 md:px-16 py-12 bg-white">
				<h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Featured Products</h2>

				{loading ? (
					<p className="text-gray-500">Loading featured products...</p>
				) : featured.length === 0 ? (
					<p className="text-gray-500">No featured products available.</p>
				) : (
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
						{featured.map(product => (
							<Link
								to={`/product/${product._id}`}
								key={product._id}
								className="bg-gray-50 hover:bg-blue-50 border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
							>
								<img
									src={product.image}
									alt={product.name}
									className="w-full h-40 object-cover mb-3 rounded"
								/>
								<h3 className="text-md font-semibold text-gray-800">{product.name}</h3>

								<div className="text-sm text-gray-600 mt-1">
									<span className="capitalize">{product.condition}</span> •{" "}
									<span>{product.category}</span>
								</div>

								<div className="mt-2">
									{product.promoPrice ? (
										<>
											<p className="text-blue-600 font-bold text-lg">
												₦{product.promoPrice.toLocaleString()}
											</p>
											<p className="text-sm line-through text-gray-400">
												₦{product.price.toLocaleString()}
											</p>
										</>
									) : (
										<p className="text-blue-600 font-bold text-lg">
											₦{product.price.toLocaleString()}
										</p>
									)}
								</div>
							</Link>
						))}
					</div>
				)}
			</section>


			<section className="px-6 md:px-16 py-12 bg-gray-50">
				<h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Shop by Condition</h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* Left Big Box - Brand New */}
					<Link
						to="/products?condition=brand-new"
						className="md:col-span-2 bg-white rounded-xl overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-all"
					>
						<img
							src="https://i.pinimg.com/736x/54/10/39/5410390e574236724a4c4b1f1247e7de.jpg"
							alt="Brand New Phones"
							className="w-full md:w-1/2 object-cover h-52 md:h-auto"
						/>
						<div className="p-6 flex flex-col justify-center">
							<h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Brand New</h3>
							<p className="text-gray-600 text-sm md:text-base">
								Factory-sealed, untouched smartphones with full warranty. Shop confidently.
							</p>
						</div>
					</Link>

					<div className="flex flex-col gap-6">
						{/* Top Right - UK Used */}
						<Link
							to="/products?condition=uk-used"
							className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all"
						>
							<img
								src="https://i.pinimg.com/1200x/40/61/e6/4061e6da3d4fa3f43234516cf38e34ab.jpg"
								alt="UK Used Phones"
								className="w-full object-cover h-40"
							/>
							<div className="p-4">
								<h3 className="text-lg font-semibold text-gray-800 mb-1">UK Used</h3>
								<p className="text-sm text-gray-600">
									Top-quality pre-owned phones, tested and trusted.
								</p>
							</div>
						</Link>

						{/* Bottom Right - Swap Deals */}
						<Link
							to="/products?condition=swap"
							className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all"
						>
							<img
								src="/images/swap.jpg"
								alt="Swap Deals"
								className="w-full object-cover h-40"
							/>
							<div className="p-4">
								<h3 className="text-lg font-semibold text-gray-800 mb-1">Swap Deals</h3>
								<p className="text-sm text-gray-600">
									Upgrade your phone easily by swapping your old device.
								</p>
							</div>
						</Link>
					</div>
				</div>
			</section>

			<section className="px-6 md:px-16 py-12 bg-white">
	<h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Hot Deals 🔥</h2>

	{promoLoading ? (
		<p className="text-gray-500">Loading deals...</p>
	) : promos.length === 0 ? (
		<p className="text-gray-500">No promo deals available at the moment.</p>
	) : (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
			{promos.map(product => (
				<Link
					to={`/product/${product._id}`}
					key={product._id}
					className="bg-gray-50 hover:bg-red-50 border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
				>
					<img
						src={product.image}
						alt={product.name}
						className="w-full h-40 object-cover mb-3 rounded"
					/>
					<h3 className="text-md font-semibold text-gray-800">{product.name}</h3>

					<div className="text-sm text-gray-600 mt-1">
						<span className="capitalize">{product.condition}</span> •{" "}
						<span>{product.category}</span>
					</div>

					<div className="mt-2">
						<p className="text-red-600 font-bold text-lg">
							₦{product.promoPrice.toLocaleString()}
						</p>
						<p className="text-sm line-through text-gray-400">
							₦{product.price.toLocaleString()}
						</p>
					</div>
				</Link>
			))}
		</div>
	)}
</section>


			
			{/* <section className="bg-blue-600 text-white py-6 text-center px-4">
				<h3 className="text-xl font-semibold mb-2">Need Help Choosing?</h3>
				<p className="mb-4">Talk to us on WhatsApp now. We'll recommend the best gadget for your budget.</p>
				<a href="https://wa.me/8080061178" className="bg-white text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition">
					Chat on WhatsApp
				</a>
			</section> */}

		</div>
	);
}

export default Home;
