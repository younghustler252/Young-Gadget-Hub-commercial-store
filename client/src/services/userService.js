import API from "../api/axios";
import handleError from "../utils/handleError";

// Get current logged-in user profile
export const getUserProfile = async () => {
  try {
    const { data } = await API.get('/user/profile');
    return data;
  } catch (error) {
    throw handleError(error);
  }
};

// Update current logged-in user profile
export const updateUserProfile = async (updateData) => {
  try {
    const { data } = await API.put('/user/profile', updateData);
    return data;
  } catch (error) {
    throw handleError(error);
  }
};

// Admin: get all users
export const getAllUsers = async () => {
  try {
    const { data } = await API.get('/user');
    return data;
  } catch (error) {
    throw handleError(error);
  }
};

// Admin: get user by ID
export const getUserById = async (userId) => {
  try {
    const { data } = await API.get(`/user/${userId}`);
    return data;
  } catch (error) {
    throw handleError(error);
  }
};

// Admin: update user by ID
export const updateUserById = async (userId, updateData) => {
  try {
    const { data } = await API.put(`/user/${userId}`, updateData);
    return data;
  } catch (error) {
    throw handleError(error);
  }
};

// Admin: delete user by ID
export const deleteUser = async (userId) => {

    try {
        const { data } = await API.delete(`/user/${userId}`);
        return data;
    } catch (error) {
        throw handleError(error);
    }
};
