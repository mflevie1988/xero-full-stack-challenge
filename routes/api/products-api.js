const express = require('express');
const router = express.Router();

//Product Model
const Product = require('../../models/product.model');
const ProductOption = require('../../models/product-option.model');

//Product controller
const ProducController = require('../../contollers/products.controller');

//=======================Products Collection related apis================================
/**
 *@route GET api/products
 *@desc Get all products or finds all products matching the specified name
 *@testCaes -  get-all-products.test.js and get-searched-products.test.js
 *@access Public
 *
 */
router.get('/', ProducController.getAllProducts);

/**
 *@route GET api/products/:id
 *@desc Get gets the product that matches the specified ID
 *@testCaes -  get-selected-product.test.js
 *@access Public
 *
 */
router.get('/:id', ProducController.getSelectedProduct);

/**
 *@route POST api/products
 *@desc Create a new product
 *@testCase - cereate-product.test.js
 *@access Public
 *
 */
router.post('/', ProducController.createProduct);

/**
 *@route DELETE api/products/:id
 *@desc Delete a product and it's options
 *@access Public
 *
 */
router.delete('/:id', ProducController.deleteProductAndOptions);

/**
 *@route PUT api/products/:id
 *@desc Update a product
 *@testCase - update-product.test.js
 *@access Public
 *
 */
router.put('/:id', ProducController.updateProduct);

//=======================Product Options Collection related apis================================

/**
 *@route GET /products/{id}/options
 *@desc Get all options for a specified product.
 *@testCase - get-selected-product-option.test.js
 *@access Public
 *
 */
router.get('/:id/options', ProducController.findSelectedProductOptions);

/**
 *@route GET /products/{id}/options/{optionId}
 *@desc finds the specified product option for the specified product.
 *@testCase - get-selected-option-of-a-product.test.js
 *@access Public
 *
 */
router.get(
	'/:id/options/:optionID',
	ProducController.findSelectedOptionOfAProduct
);

/**
 *@route POST api/products/:id/options/
 *@desc Create a product option for a specified product
 *@testCase - create-product-option.test.js
 *@access Public
 *
 */
router.post('/:id/options', ProducController.createAnProductOption);

/**
 *@route PUT api/products/:id/options/:optionID
 *@desc Update a specific option of a product
 *@testCase - update-selected-product-option.test.js
 *@access Public
 *
 */
router.put(
	'/:id/options/:optionID',
	ProducController.updateSelectedProductOption
);

/**
 *@route DELETE api/products/:id/options/{optionId}
 *@desc Delete a the specified product option
 *@access Public
 *
 */
router.delete(
	'/:id/options/:optionID',
	ProducController.deleteSelectedProductOption
);

module.exports = router;
