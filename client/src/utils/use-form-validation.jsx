import React from 'react';
import axios from 'axios';

const UseFormValidation = (initialState, props, validateAddForm) => {
	const [values, setValues] = React.useState(initialState);
	const [errors, setErrors] = React.useState({});
	const [isProductSubmitting, setProductSubmitting] = React.useState(false);
	const [
		isProductOptionSubmitting,
		setProductOptionSubmitting
	] = React.useState(false);

	React.useEffect(() => {
		if (isProductSubmitting) {
			const noErrors = Object.keys(errors).length === 0;
			if (noErrors) {
				const product = {
					Name: values.color,
					Description: values.desc
				};
				const options = {
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Access-Control-Allow-Origin': '*'
					}
				};

				axios
					.post(
						`http://localhost:5000/api/products/${props.match.params.id}/options`,
						JSON.stringify(product),
						options
					)
					.then((res) => {
						const response = JSON.parse(JSON.stringify(res.data));
						console.log(response);
						if (response) {
							window.location = `/${props.match.params.id}/${props.match.params.name}/options`;
							console.log(response);
						} else {
							alert('Error Updating the product');
						}
					});
			}
		} else {
			setProductSubmitting(false);
		}

		if (isProductOptionSubmitting) {
			const noErrors = Object.keys().length === 0;
			if (noErrors) {
				const product = {
					Name: values.name,
					Description: values.desc,
					Price: values.price,
					DeliveryPrice: values.deliveryPrice
				};
				const options = {
					headers: {
						'Content-Type': 'application/json;charset=UTF-8',
						'Access-Control-Allow-Origin': '*'
					}
				};

				axios
					.post(
						`http://localhost:5000/api/products/`,
						JSON.stringify(product),
						options
					)
					.then((res) => {
						const response = JSON.parse(JSON.stringify(res.data));
						if (response) {
							window.location = '/';
						} else {
							alert('Error Updating the product');
						}
					});
			}
		} else {
			setProductOptionSubmitting(false);
		}
	}, [errors]);

	const handleChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};

	//Adding the product option
	const addProductOption = (e) => {
		e.preventDefault();
		const validationErrors = validateAddForm(values, props.match.params.id);
		setErrors(validationErrors);
		setProductSubmitting(true);
	};

	//Adding a product
	const addProduct = (e) => {
		e.preventDefault();
		const validationErrors = validateAddForm(values, props.match.params.id);
		setErrors(validationErrors);
		setProductOptionSubmitting(true);
	};
	//console.log('This is add id', id);
	return {
		handleChange,
		values,
		addProduct,
		addProductOption,
		isProductSubmitting,
		isProductOptionSubmitting,
		errors
	};
};

export default UseFormValidation;
