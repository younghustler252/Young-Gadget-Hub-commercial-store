import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import {
	FiShoppingCart,
	FiUser,
	FiMenu,
	FiX,
	FiSearch,
	FiChevronDown
} from "react-icons/fi";
import logo from "../assets/logo-nobg.jpeg";
import { routes } from "../routes/route";
import CartDrawer from "./CartDrawer";



const Header = () => {
	const { user, logout, isAuthenticated } = useAuth();
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const [menuOpen, setMenuOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const searchRef = useRef();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	const handleSearch = (e) => {
		e.preventDefault();
		if (searchTerm.trim()) {
			navigate(`/search?q=${searchTerm}`);
			setSearchTerm("");
			setSearchOpen(false);
			setMenuOpen(false);
		}
	};

	useEffect(() => {
		function handleClickOutside(e) {
			if (searchRef.current && !searchRef.current.contains(e.target)) {
				setSearchOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<header className="bg-white shadow-md sticky top-0 z-50">
			{/* ========== TOP HEADER ========== */}
			<div className="flex items-center justify-between px-4 md:px-8 py-3 border-b">

				{/* 🔰 LOGO */}
				<Link to="/" className="flex items-center text-xl font-bold text-gray-800">
					<img src={logo} alt="Logo" className="h-10 w-10 mr-2 rounded-full" />
					<span className="hidden md:inline">YoungGadget</span>
				</Link>

				{/* 🔍 SEARCH */}
				<div className="flex-1 mx-2 max-w-[160px] sm:max-w-xs md:max-w-xl">
					{/* ✅ Desktop: full search input */}
					<form
						onSubmit={handleSearch}
						className="hidden md:flex items-center border border-gray-300 rounded-full px-3 py-2"
					>
						<FiSearch className="text-gray-400 mr-2" />
						<input
							type="text"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder="Search gadgets..."
							className="w-full text-sm outline-none"
						/>
					</form>

					{/* ✅ Mobile: icon toggle */}
					<div ref={searchRef} className="md:hidden">
						{searchOpen ? (
							<form onSubmit={handleSearch} className="relative">
								<FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
								<input
									autoFocus
									type="text"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									placeholder="Search..."
									className="w-full pl-10 pr-3 py-2 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</form>
						) : (
							<button
								onClick={() => setSearchOpen(true)}
								className="text-gray-600 hover:text-blue-600 p-2 rounded-full border border-gray-300"
							>
								<FiSearch size={18} />
							</button>
						)}
					</div>
				</div>

				{/* 👤 USER / CART / MENU */}
				<div className="flex items-center space-x-3">
					{/* 🛒 CART */}
					{/* 🛒 CART */}
					<button
					onClick={() => setDrawerOpen(true)}
					className="text-gray-700 hover:text-blue-600"
					>
						<FiShoppingCart size={20} />
					</button>

					<CartDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />


					{/* 👤 USER */}
					{isAuthenticated ? (
						<Link to="/profile" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 text-sm">
							<FiUser size={20} />
							<span className="hidden md:inline">Hi, {user?.data?.name || "User"}</span>
						</Link>
					) : (
						<Link to="/login" className="text-blue-600 text-sm hover:underline">
							Login
						</Link>
					)}

					{/* ☰ MOBILE MENU TOGGLE */}
					<button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl md:hidden">
						{menuOpen ? <FiX /> : <FiMenu />}
					</button>
				</div>
			</div>

			{/* 📱 MOBILE MENU */}
			{menuOpen && (
				<div className="md:hidden bg-white border-t shadow px-4 py-4 flex flex-col space-y-3 text-gray-700 text-sm">
					{/* PRODUCTS DROPDOWN */}
					<div>
						<button
							onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
							className="flex items-center justify-between w-full"
						>
							<span>Products</span>
							<FiChevronDown className={`${mobileProductsOpen ? "rotate-180" : ""} transition-transform`} />
						</button>
						{mobileProductsOpen && (
							<div className="mt-2 ml-4 flex flex-col space-y-2">
								<Link to={routes.Phones} onClick={() => setMenuOpen(false)}>Phones</Link>
								<Link to={routes.Laptops} onClick={() => setMenuOpen(false)}>Laptops</Link>
								<Link to={routes.Smartwatches} onClick={() => setMenuOpen(false)}>Smartwatches</Link>
								<Link to={routes.Audio} onClick={() => setMenuOpen(false)}>Audio</Link>
								<Link to={routes.Gaming} onClick={() => setMenuOpen(false)}>Gaming</Link>
							</div>
						)}
					</div>

					{/* OTHER LINKS */}
					<Link to={routes.Deals} onClick={() => setMenuOpen(false)}>Deals</Link>
					<Link to={routes.Swap} onClick={() => setMenuOpen(false)}>Swap</Link>
					<Link to={routes.Buy} onClick={() => setMenuOpen(false)}>Buy</Link>
					<Link to={routes.Sell} onClick={() => setMenuOpen(false)}>Sell</Link>
					<Link to={routes.cart} onClick={() => setMenuOpen(false)}>Cart</Link>

					{isAuthenticated ? (
						<>
							<Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
							<button
								onClick={() => {
									setMenuOpen(false);
									handleLogout();
								}}
								className="text-red-500 text-left"
							>
								Logout
							</button>
						</>
					) : (
						<Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
					)}
				</div>
			)}

			{/* 🖥️ DESKTOP NAV LINKS */}
			<nav className="hidden md:flex justify-center space-x-8 py-3 bg-gray-50 text-sm font-medium text-gray-700">
				<Link to={routes.Phones} className="hover:text-blue-600">Phones</Link>
				<Link to={routes.Laptops} className="hover:text-blue-600">Laptops</Link>
				<Link to={routes.Smartwatches} className="hover:text-blue-600">Smartwatches</Link>
				<Link to={routes.Audio} className="hover:text-blue-600">Audio</Link>
				<Link to={routes.Gaming} className="hover:text-blue-600">Gaming</Link>
				<Link to={routes.Deals} className="hover:text-blue-600">Deals</Link>
				<Link to={routes.Swap} className="hover:text-blue-600">Swap</Link>
				<Link to={routes.Buy} className="hover:text-blue-600">Buy</Link>
				<Link to={routes.Sell} className="hover:text-blue-600">Sell</Link>
			</nav>
		</header>
	);
};

export default Header;
