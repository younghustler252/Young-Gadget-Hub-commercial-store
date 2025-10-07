import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

function VerifyPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const { resendVerificationCode, verify } = useAuth();

	const locationState = location.state || {};
	const initialIdentifier = locationState.identifier || localStorage.getItem('verify_identifier');
	const source = locationState.source || localStorage.getItem('verify_source');

	const [identifier, setIdentifier] = useState(initialIdentifier);
	const [otp, setOtp] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');

	useEffect(() => {
		if (!identifier) {
			// If no identifier even after fallback, redirect home
			navigate('/');
		} else {
			// Save identifier in localStorage so it persists on reload
			localStorage.setItem('verify_identifier', identifier);
			if (source) {
				localStorage.setItem('verify_source', source);
			}

			// Optional: Show simple feedback (replace with toast if you use it)
			alert(`Verification code sent to ${identifier}`);
		}
	}, [identifier, source, navigate]);

	const handleVerify = async () => {
		try {
			setLoading(true);
			setError('');
			const response = await verify(identifier, otp);
			setSuccessMessage('✅ Verified successfully!');
			
			// Clear storage and redirect
			localStorage.removeItem('verify_identifier');
			localStorage.removeItem('verify_source');

			// Delay a bit before redirecting
			setTimeout(() => {
				navigate('/', { replace: true });
			}, 1000);
		} catch (err) {
			console.error(err);
			setError(err?.message || 'Verification failed. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const handleResend = async () => {
		try {
			await resendVerificationCode(identifier);
			alert(`OTP resent to ${identifier}`);
		} catch (err) {
			console.error(err);
			setError('Failed to resend OTP. Please try again.');
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center px-4">
			<div className="max-w-md w-full bg-white shadow p-6 rounded-md">
				<h2 className="text-xl font-bold mb-4 text-center">
					Verify Your {identifier?.includes('@') ? 'Email' : 'Phone'}
				</h2>

				<p className="text-sm text-gray-600 mb-6 text-center">
					We sent a verification code to <strong>{identifier}</strong>
				</p>

				<input
					type="text"
					value={otp}
					onChange={(e) => setOtp(e.target.value)}
					className="w-full border px-4 py-2 rounded mb-4"
					placeholder="Enter OTP"
				/>

				{error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
				{successMessage && <p className="text-green-600 text-sm text-center mb-2">{successMessage}</p>}

				<button
					onClick={handleVerify}
					className="w-full bg-blue-600 text-white py-2 rounded mb-2 disabled:opacity-60"
					disabled={loading || !otp}
				>
					{loading ? 'Verifying...' : 'Verify'}
				</button>

				<button
					onClick={handleResend}
					className="w-full text-blue-600 hover:underline text-sm"
					disabled={loading}
				>
					Resend OTP
				</button>
			</div>
		</div>
	);
}

export default VerifyPage;
