const Joi = require('joi');

function creaProductValidation(req) {
	//Input validation with Joi
	const schema = Joi.object().keys({
		Name: Joi.string()
			.trim()
			.required(),
		Description: Joi.string().trim(),
		Price: Joi.number().required(),
		DeliveryPrice: Joi.number().required()
	});
	const { value, error } = Joi.validate(req.body, schema);
	if (error) {
		return error;
	}
}

function getAllProductsValidation(req) {
	const schema = Joi.object().keys({
		name: Joi.string()
			.trim()
			.required()
	});
	const { value, error } = Joi.validate(req.query, schema);

	return error;
}

function deleteProductAndOptionsValidation(req) {
	const schema = Joi.object().keys({
		id: Joi.string()
			.trim()
			.required()
	});
	const { value, error } = Joi.validate(req.params, schema);

	return error;
}

function getSelectedProductValidation(req) {
	const schema = Joi.object().keys({
		id: Joi.string()
			.trim()
			.required()
	});
	const { value, error } = Joi.validate(req.params, schema);

	return error;
}

function updateProductValidation(req) {
	//Input validation with Joi
	const schema = Joi.object().keys({
		Name: Joi.string()
			.trim()
			.required(),
		Description: Joi.string().trim(),
		Price: Joi.number().required(),
		DeliveryPrice: Joi.number().required()
	});
	const { value, error } = Joi.validate(req.body, schema);
	if (error) {
		return error;
	}
}

function findSelectedProductOptionsValidation(req) {
	const schema = Joi.object().keys({
		id: Joi.string()
			.trim()
			.required()
	});
	const { value, error } = Joi.validate(req.params, schema);

	return error;
}

function findSelectedOptionOfAProductValidation(req) {
	const schema = Joi.object().keys({
		optionID: Joi.string()
			.trim()
			.required(),
		id: Joi.string()
			.trim()
			.required()
	});
	const { value, error } = Joi.validate(req.params, schema);

	return error;
}

function createAnProductOptionValidation(req) {
	const schemaParams = Joi.object().keys({
		ProductId: Joi.string()
			.trim()
			.required()
	});
	const schemaBody = Joi.object().keys({
		Name: Joi.string()
			.trim()
			.required(),
		Description: Joi.string().trim()
	});
	const { error } = Joi.validate(req.params, schemaParams);
	if (!error) {
		const { error } = Joi.validate(req.body, schemaBody);
		if (error) {
			console.log(error);
			return error;
		}
	} else {
		return error;
	}
}

function updateSelectedProductOptionValidation(req) {
	const schemaBody = Joi.object().keys({
		Name: Joi.string()
			.trim()
			.required(),
		Description: Joi.string().trim()
	});

	const schemaParams = Joi.object().keys({
		ProductId: Joi.string()
			.trim()
			.required(),
		optionID: Joi.string()
			.trim()
			.required()
	});
	const { value, error } = Joi.validate(req.params, schemaParams);
	if (!error) {
		const { value, error } = Joi.validate(req.body, schemaBody);
		if (error) {
			console.log(error);
			return error;
		}
	} else {
		console.log('ID', error);
		return error;
	}
}

function deleteSelectedProductOptionValidation(req) {
	const schema = Joi.object().keys({
		optionID: Joi.string()
			.trim()
			.required(),
		id: Joi.string()
			.trim()
			.required()
	});
	const { value, error } = Joi.validate(req.params, schema);

	return error;
}

module.exports = {
	creaProductValidation,
	getAllProductsValidation,
	deleteProductAndOptionsValidation,
	getSelectedProductValidation,
	updateProductValidation,
	findSelectedProductOptionsValidation,
	findSelectedOptionOfAProductValidation,
	createAnProductOptionValidation,
	updateSelectedProductOptionValidation,
	deleteSelectedProductOptionValidation
};
