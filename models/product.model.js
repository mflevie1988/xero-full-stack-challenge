const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const productSchema = new Schema(
	{
		Name: { type: String, required: true },
		Description: { type: String, required: false },
		Price: { type: Number, required: true },
		DeliveryPrice: { type: Number, required: true }
	},
	{
		timestamps: true
	}
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
