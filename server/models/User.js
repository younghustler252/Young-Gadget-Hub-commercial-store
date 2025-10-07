const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    phone : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['User', 'Admin'], // Capitalize Admin for consistency
        default: 'User'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
   
    verificationCode: {
        type: String,
        select: false // hide from queries by default
    },
    verificationCodeExpires: {
        type: Date,
        select: false
    },
    verifiedAt: {
        type: Date
    }

}, { timestamps: true }) // ✅ fixed

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model('User', userSchema)
module.exports = User
