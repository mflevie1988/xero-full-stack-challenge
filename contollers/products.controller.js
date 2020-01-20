//Product Model
const Product = require('../models/product.model');
const ProductOption = require('../models/product-option.model');
const Validation = require('../utill/validation');

/**
 *@route GET api/products
 *@desc Get all products or finds all products matching the specified name
 *@access Public
 *
 */
function getAllProducts(req, res) {
	if (req.query.name) {
		const error = Validation.getAllProductsValidation(req);

		if (error) {
			res.status(404).json(error);
		} else {
			const query = req.query.name;
			Product.find({ Name: new RegExp(query.replace(/"/g, ''), 'i') })
				.sort('asc')
				.then((products) => res.status(200).json(products))
				.catch((err) => res.status(404).json(err));
		}
	} else {
		Product.find()
			.sort('asc')
			.then((products) => res.status(200).json(products))
			.catch((err) => res.status(404).json(err));
	}
}

/**
 *@route POST api/products
 *@desc Create a new product
 *@access Public
 *
 */
function createProduct(req, res) {
	//Input validation with Joi
	const error = Validation.creaProductValidation(req);

	if (error) {
		res.status(400).json(error);
	} else {
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
					.json({ type: 'Error creating a product', error: err })
			);
	}
}

/**
 *@route DELETE api/products/:id
 *@desc Delete a product and it's options
 *@access Public
 *
 */
function deleteProductAndOptions(req, res) {
	// Input Validation with joi
	const error = Validation.deleteProductAndOptionsValidation(req);

	if (error) {
		res.status(400).json(error);
	} else {
		Product.findById(req.params.id).then((product) =>
			product
				.remove()
				.then(() =>
					ProductOption.deleteMany({
						ProductId: req.params.id
					})
				)
				.then(() => res.json({ success: true }))
				.catch((err) => res.status(404).json({ success: false }))
		);
	}
}

/**
 *@route GET api/products/:id
 *@desc Get gets the project that matches the specified ID
 *@access Public
 *
 */
function getSelectedProduct(req, res) {
	const error = Validation.getSelectedProductValidation(req);
	if (error) {
		res.status(404).json(error);
	} else {
		Product.findById(req.params.id)
			.then((product) => res.status(200).json(product))
			.catch((err) => res.status(404).json({ success: false }));
	}
}

/**
 *@route PUT api/products/:id
 *@desc Update a product
 *@access Public
 *
 */
function updateProduct(req, res) {
	const error = Validation.updateProductValidation(req);

	if (error) {
		res.status(400).json(error);
	} else {
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
						res.json({
							result: 'Product Updated',
							product: product
						})
					)
					.catch((err) => res.status(400).json({ result: 'Error' }));
			})
			.catch((err) => res.status(404).json({ result: 'Error' }));
	}
}

/**
 *@route GET /products/{id}/options
 *@desc Get all options for a specified product.
 *@access Public
 *
 */
function findSelectedProductOptions(req, res) {
	const error = Validation.findSelectedProductOptionsValidation(req);

	if (error) {
		res.status(404).json(error);
	} else {
		ProductOption.find({ ProductId: req.params.id })
			.then((options) => res.status(200).json(options))
			.catch((err) => res.status(404).json({ result: 'Error' }));
	}
}

/**
 *@route GET /products/{id}/options/{optionId}
 *@desc finds the specified product option for the specified product.
 *@access Public
 *
 */
function findSelectedOptionOfAProduct(req, res) {
	const error = Validation.findSelectedOptionOfAProductValidation(req);

	if (error) {
		res.status(404).json(error);
	} else {
		ProductOption.findById(req.params.optionID)
			.then((options) => res.status(200).json(options))
			.catch((err) => res.status(404).json({ result: 'Error' }));
	}
}

/**
 *@route POST api/products/:id/options/
 *@desc Create a product option for a specified product
 *@access Public
 *
 */
function createAnProductOption(req, res) {
	const error = Validation.createAnProductOptionValidation(req);

	if (error) {
		res.status(400).json(error);
	} else {
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
					.json({ type: 'Error creating a product', error: err })
			);
	}
}

/**
 *@route PUT api/products/:id/options/:optionID
 *@desc Update a specific option of a product
 *@access Public
 *
 */
function updateSelectedProductOption(req, res) {
	const error = Validation.updateSelectedProductOptionValidation(req);

	if (error) {
		res.status(400).json(error);
	} else {
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
	}
}

/**
 *@route DELETE api/products/:id/options/{optionId}
 *@desc Delete a the specified product option
 *@access Public
 *
 */
function deleteSelectedProductOption(req, res) {
	const error = deleteSelectedProductOptionValidation(req);

	if (error) {
		res.status(404).json(error);
	} else {
		ProductOption.findById(req.params.optionID).then((option) =>
			option
				.remove()
				.then(() => res.json({ success: true }))
				.catch((err) => res.status(404).json({ success: false }))
		);
	}
}

module.exports = {
	createProduct,
	getAllProducts,
	deleteProductAndOptions,
	getSelectedProduct,
	updateProduct,
	findSelectedProductOptions,
	findSelectedOptionOfAProduct,
	createAnProductOption,
	updateSelectedProductOption,
	deleteSelectedProductOption
};
