const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true
	},
	promoPrice: {
		type: Number,
		default: null
	},
	category: {
		type: String,
		enum: ['phone', 'laptop','headset', 'accessory', 'smartwatch', 'tablet', 'gaming' ],
		default: 'phone'
	},
	condition: {
		type: String,
		enum: ['UK Used', 'Brand New'],
		default: 'UK Used'
	},
	negotiable: {
		type: Boolean,
		default: false
	},
	inStock: {
		type: Boolean,
		default: true
	},
	image: {
		type: String, 
		required: false
	},
	brand: {
		type: String,
		required: false
	},
	stockQuantity: {
		type: Number,
		default: 0
	},
	isDeleted: {
		type: Boolean,
		default: false
	},
	featured: {
		type: Boolean,
		default: false
	}
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema)
module.exports = Product
