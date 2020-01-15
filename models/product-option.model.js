const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const productOptionsSchema = new Schema(
	{
		ProductId: { type: String, required: true },
		Name: { type: String, required: true },
		Description: { type: String, required: false }
	},
	{
		timestamps: true
	}
);

const ProductOptions = mongoose.model('ProductOptions', productOptionsSchema);

module.exports = ProductOptions;
