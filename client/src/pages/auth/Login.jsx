import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { routes } from "../../routes/route";

function Login() {
	const navigate = useNavigate();
	const { login, isAuthenticated } = useAuth();

	const [formData, setFormData] = useState({
		identifier: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

		


	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

	try {
		const response = await login(formData);
		const userData = response.data.user;
		console.log("🧠 userData:", userData);

		if (!userData.isVerified) {
			// Redirect to verification page
			navigate('/verify', {
				state: {
					identifier: formData.identifier,
					source: 'login'
				}
			});
		} else {
			// ✅ Redirect based on role
			if (userData.role === 'admin') {
				navigate('/admin/dashboard');
			} else {
				navigate('/');
			}
		}
		} catch (err) {
			setError(err.message || "Login failed. Try again.");
		} finally {
			setLoading(false);
		}
	};

        


	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
			<div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
				<h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
					Sign in to <span className="text-blue-600">GadgetZone</span>
				</h2>

				<form onSubmit={handleSubmit} className="space-y-5">
					<div>
						<label className="block text-gray-600 mb-1">Email or Phone</label>
						<input
							type="text"
							name="identifier"
							value={formData.identifier}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
							required
						/>
					</div>

					<div>
						<label className="block text-gray-600 mb-1">Password</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
							required
						/>
					</div>

					{error && (
						<div className="text-red-500 text-sm text-center">{error}</div>
					)}

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
					>
						{loading ? "Signing in..." : "Sign In"}
					</button>
				</form>

				<div className="text-center text-sm text-gray-600 mt-4">
					Don’t have an account?{" "}
					<Link to={routes.register} className="text-blue-600 hover:underline">
						Sign up
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
