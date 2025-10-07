import API from "../api/axios";
import handleError from "../utils/handleError";

export const registerUser = async (formData) => {
    try {
        const {data} = await API.post('/auth/register', formData);
        return data;
    } catch (error) {
        throw handleError(error)
    }
}

export const loginUser = async (formData) => {
    try {
        const {data} = await API.post('/auth/login', formData);
        return data;
    } catch (error) {
        throw handleError(error)
    }
}

// ✅ POST /auth/verify
export const verifyUser = async ({ identifier, code }) => {
    try {
        const { data } = await API.post('/auth/verify', { identifier, code });
        return data;
    } catch (error) {
        throw handleError(error);
    }
};

// ✅ POST /auth/resend-code
export const resendCode = async ({ identifier, method = 'email' }) => {
    try {
        const { data } = await API.post('/auth/resend-code', { identifier, method });
        return data;
    } catch (error) {
        throw handleError(error);
    }
};