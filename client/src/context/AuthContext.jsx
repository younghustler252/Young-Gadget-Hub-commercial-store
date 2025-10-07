import { createContext, useContext, useState, useEffect } from "react";
import {
    registerUser,
    loginUser,
    verifyUser,
    resendCode,
} from "../services/authService";
import { getUserProfile } from "../services/userService";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    const profile = await getUserProfile(); // Assumes this returns user object
                    setUser(profile);
                } catch (err) {
                    logout(); // token might be invalid or expired
                }
            }
            setLoading(false);
        };
        loadUser();
    }, [token]);
                    

    // Register (basic pass-through)
    const register = async (formData) => {
        const response = await registerUser(formData);
        return response; // returns message, userId
    };
    // Verify (gets token + user inside `data`)

    const verify = async ({ identifier, code }) => {
        const response = await verifyUser({ identifier, code });
        const { token, user } = response.data;

        setToken(token);
        setUser(user);
        localStorage.setItem("token", token);

        return response;
    };

    // Login (expects structured response)
    const login = async (credentials) => {
        const response = await loginUser(credentials);
        const { token, user } = response.data;
        // console.log("👉 Full login response:", response);

        setToken(token);
        setUser(user);
        localStorage.setItem("token", token);

        return response;
    };

    const resendVerificationCode = async ({ identifier, method }) => {
        return await resendCode({ identifier, method });
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider
        value={{

            user,
            token,
            isAuthenticated: !!user,
            loading,
            register,
            verify,
            login,
            resendVerificationCode,
            logout,
        }}
        >
      {children}
    </AuthContext.Provider>
  );
};
        
export default AuthProvider;

