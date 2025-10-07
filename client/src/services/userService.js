import API from "../api/axios";
import handleError from "../utils/handleError";


export const getUserProfile = async () => {
    try {
        const { data } = await API.get('/user/profile')
        return data;
    } catch (error) {
        throw handleError(error)
    }
}

export const updateUserProfile = async () => {
    try {
        const { data } = await API.get('/user/profile')
        return data;
    } catch (error) {
        throw handleError(error)
    }
}