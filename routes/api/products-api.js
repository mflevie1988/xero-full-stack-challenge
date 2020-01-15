const express = require('express');
const router = express.Router();

//Product Model
const Product = require('../../models/product.model');
const ProductOption = require('../../models/product-option.model');

//=======================Products Collection related apis================================
/**
 *@route GET api/products
 *@desc Get all products or finds all products matching the specified name
 *@access Public
 *
 */
router.get('/', (req, res) => {
	if (req.query.name) {
		const query = req.query.name;
		Product.find({ Name: new RegExp(query.replace(/"/g, ''), 'i') })
			.sort('asc')
			.then((products) => res.json(products));
	} else {
		Product.find()
			.sort('asc')
			.then((products) => res.json(products));
	}
});

/**
 *@route GET api/products
 *@desc Get all products
 *@access Public
 *
 */
router.get('/:id', (req, res) => {
	Product.findById(req.params.id)
		.then((product) => res.status(200).json(product))
		.catch((err) => res.status(404).json({ success: false }));
});

/**
 *@route POST api/products
 *@desc Create a new product
 *@access Public
 *
 */
router.post('/', (req, res) => {
	const newProduct = new Product({
		Name: req.body.Name,
		Description: req.body.Description,
		Price: Number(req.body.Price),
		DeliveryPrice: Number(req.body.DeliveryPrice)
	});

	newProduct
		.save()
		.then((product) => res.status(200).json(product))
		.catch((err) =>
			res
				.status(400)
				.res.json({ type: 'Error creating a product', error: err })
		);
});

/**
 *@route DELETE api/products/:id
 *@desc Delete a product and it's options
 *@access Public
 *
 */
router.delete('/:id', (req, res) => {
	Product.findById(req.params.id).then((product) =>
		product
			.remove()
			.then(() => ProductOption.deleteMany({ ProductId: req.params.id }))
			.then(() => res.json({ success: true }))
			.catch((err) => res.status(404).json({ success: false }))
	);
});

/**
 *@route PUT api/products/:id
 *@desc Update a product and it's options
 *@access Public
 *
 */
router.put('/:id', (req, res) => {
	const newProduct = new Product({
		Name: req.body.Name,
		Description: req.body.Description,
		Price: Number(req.body.Price),
		DeliveryPrice: Number(req.body.DeliveryPrice)
	});
	Product.findById(req.params.id)
		.then((product) => {
			product.Name = newProduct.Name;
			product.Description = newProduct.Description;
			product.Price = newProduct.Price;
			product.DeliveryPrice = newProduct.DeliveryPrice;

			product
				.save()
				.then((product) =>
					res.json({ result: 'Product Updated', product: product })
				)
				.catch((err) => res.status(400).json({ result: 'Error' }));
		})
		.catch((err) => res.status(404).json({ result: 'Error' }));
});

//=======================Product Options Collection related apis================================

/**
 *@route GET /products/{id}/options
 *@desc Get all options for a specified product.
 *@access Public
 *
 */
router.get('/:id/options', (req, res) => {
	ProductOption.find({ ProductId: req.params.id })
		.then((options) => res.status(200).json(options))
		.catch((err) => res.status(404).json({ result: 'Error' }));
});

/**
 *@route GET /products/{id}/options/{optionId}
 *@desc finds the specified product option for the specified product.
 *@access Public
 *
 */
router.get('/:id/options/:optionID', (req, res) => {
	ProductOption.findById(req.params.optionID)
		.then((options) => res.status(200).json(options))
		.catch((err) => res.status(404).json({ result: 'Error' }));
});

/**
 *@route POST api/products
 *@desc Create a product option for a specified product
 *@access Public
 *
 */
router.post('/:id/options', (req, res) => {
	const newProductOption = new ProductOption({
		ProductId: req.params.id,
		Name: req.body.Name,
		Description: req.body.Description
	});

	newProductOption
		.save()
		.then((option) => res.json(option))
		.catch((err) =>
			res
				.status(400)
				.res.json({ type: 'Error creating a product', error: err })
		);
});

/**
 *@route PUT api/products/:id/options/:optionID
 *@desc Update a product and it's options
 *@access Public
 *
 */
router.put('/:id/options/:optionID', (req, res) => {
	const newProductOption = new ProductOption({
		ProductId: req.params.id,
		Name: req.body.Name,
		Description: req.body.Description
	});
	ProductOption.findById(req.params.optionID)
		.then((option) => {
			option.ProductId = newProductOption.ProductId;
			option.Name = newProductOption.Name;
			option.Description = newProductOption.Description;

			option
				.save()
				.then((option) => res.status(200).json(option))
				.catch((err) => res.status(400).json({ result: 'Error' }));
		})
		.catch((err) => res.status(404).json({ result: 'Error' }));
});

/**
 *@route DELETE api/products/:id/options/{optionId}
 *@desc Delete a the specified product option
 *@access Public
 *
 */
router.delete('/:id/options/:optionID', (req, res) => {
	ProductOption.findById(req.params.optionID).then((option) =>
		option
			.remove()
			.then(() => res.json({ success: true }))
			.catch((err) => res.status(404).json({ success: false }))
	);
});

module.exports = router;
