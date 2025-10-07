const asyncHandler = require('express-async-handler');
const User = require('../models/User'); // Adjust path based on your project structure

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    res.status(200).json({
        success: true,
        data: user
    });
});



const updateUserProfile = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {name, profilePics} = req.body;
    const user = await User.findOne(id);

    if (!user) {
        res.status(404);
        throw new Error("user not found");
    }

    if (name !== undefined) user.name = name;
    if (profilePics !== undefined) user.profilePics = profilePics;

    const savedUSer = await user.save()

    res.status(201).json({
        message: 'user updated',
        data: user
    })

})

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password'); // omit passwords
    res.status(200).json({
        success: true,
        data: users
    });
});


const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.status(200).json({
        success: true,
        data: user
    });
});


const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: 'User deleted successfully',
    });
});

const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    // Admin can update name, email, role, profilePics, etc.
    const { name, email, role, profilePics } = req.body;

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (role !== undefined) user.role = role;  // 'user' or 'admin'
    if (profilePics !== undefined) user.profilePics = profilePics;

    await user.save();

    res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: user,
    });
});

module.exports = {
    getUserProfile,
    updateUserProfile,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUser
};


