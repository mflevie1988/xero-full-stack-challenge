const validateAddForm = (values, id) => {
	let errors = {};
	if (!id) {
		if (!values.price.match(/^([1-9]\d*)(\.\d+)?$/)) {
			errors.price = 'Invalid Price amount';
		} else if (parseFloat(values.price) < 10) {
			errors.price = 'Price must be greater than $10.00';
		} else if (!values.price) {
			errors.price = 'Price Required!';
		}

		if (!values.deliveryPrice.match(/^([1-9]\d*)(\.\d+)?$/)) {
			errors.deliveryPrice = 'Invalid Delivery Price';
		} else if (parseFloat(values.deliveryPrice) < 100) {
			errors.deliveryPrice =
				'Delivery price cannot be higher than $100.00';
		} else if (!values.deliveryPrice) {
			errors.deliveryPrice = 'Delivery Price Required!';
		}

		if (!values.name) {
			errors.name = 'Product Name Requires!';
		} else if (values.name.length < 4) {
			errors.name = 'Product Name should be more than 4 characters';
		}

		if (!values.desc) {
			errors.name = 'Product Description Requires!';
		} else if (values.desc.length < 4) {
			errors.name =
				'Product Description should be more than 4 characters';
		}
	} else {
		console.log('VALIDATION WORKING');
		if (!values.desc) {
			errors.desc = 'Product Description Requires!';
		} else if (values.desc.length < 4) {
			errors.desc =
				'Product Description should be more than 4 characters';
		}

		if (!values.color) {
			errors.color = 'Product Color Requires!';
		} else if (values.color.length < 4) {
			errors.color = 'Product Color should be more than 4 characters';
		}
	}

	// if(values.)

	return errors;
};

export default validateAddForm;
