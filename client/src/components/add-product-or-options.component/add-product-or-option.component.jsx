import React, { useState } from 'react';
import {
	Button,
	Form,
	FormGroup,
	FormFeedback,
	Label,
	Input
} from 'reactstrap';
import { Link } from 'react-router-dom';
//import UseFormValidation from '../../utils/use-form-validation';
import UseFormValidation from '../../utils/use-form-validation';
import validateAddForm from '../../utils/validateAddForm';

const initialState = {
	color: '',
	name: '',
	desc: '',
	price: '',
	deliveryPrice: ''
};

export const AddProductOrOptions = (props) => {
	const {
		handleChange,
		values,
		addProduct,
		addProductOption,
		isProductSubmitting,
		isProductOptionSubmitting,
		errors
	} = UseFormValidation(initialState, props, validateAddForm);

	console.log(errors);

	// //Adding the product option
	// const addProductOption = (e) => {
	// 	e.preventDefault();
	// 	const product = {
	// 		Name: values.color,
	// 		Description: values.desc
	// 	};
	// 	const options = {
	// 		headers: {
	// 			'Content-Type': 'application/json;charset=UTF-8',
	// 			'Access-Control-Allow-Origin': '*'
	// 		}
	// 	};

	// 	axios
	// 		.post(
	// 			`http://localhost:5000/api/products/${props.match.params.id}/options`,
	// 			JSON.stringify(product),
	// 			options
	// 		)
	// 		.then((res) => {
	// 			const response = JSON.parse(JSON.stringify(res.data));
	// 			console.log(response);
	// 			if (response) {
	// 				window.location = `/${props.match.params.id}/${props.match.params.name}/options`;
	// 				console.log(response);
	// 			} else {
	// 				alert('Error Updating the product');
	// 			}
	// 		});
	// };

	// //Adding a product
	// const addProduct = (e) => {
	// 	e.preventDefault();
	// 	const product = {
	// 		Name: values.name,
	// 		Description: values.desc,
	// 		Price: values.price,
	// 		DeliveryPrice: values.deliveryPrice
	// 	};
	// 	const options = {
	// 		headers: {
	// 			'Content-Type': 'application/json;charset=UTF-8',
	// 			'Access-Control-Allow-Origin': '*'
	// 		}
	// 	};

	// 	axios
	// 		.post(
	// 			`http://localhost:5000/api/products/`,
	// 			JSON.stringify(product),
	// 			options
	// 		)
	// 		.then((res) => {
	// 			const response = JSON.parse(JSON.stringify(res.data));
	// 			if (response) {
	// 				window.location = '/';
	// 			} else {
	// 				alert('Error Updating the product');
	// 			}
	// 		});
	// };

	if (props.match.params.id) {
		return (
			<div className='conntainer'>
				<div style={{ textAlign: 'right' }}>
					<Link
						to={`/${props.match.params.id}/${props.match.params.name}/options`}
					>
						<Button color='success'>Go Back</Button>
					</Link>
				</div>
				<Form onSubmit={addProductOption}>
					<FormGroup>
						<Label>Product Colour</Label>
						<Input
							type='text'
							name='color'
							id='color'
							value={values.color || ''}
							onChange={handleChange}
						/>
						{errors.color && (
							<span style={{ color: 'red' }}>
								<i>{errors.color}</i>
							</span>
						)}
					</FormGroup>
					<FormGroup>
						<Label>Product Option Description</Label>
						<Input
							type='textarea'
							name='desc'
							id='desc'
							value={values.desc || ''}
							onChange={handleChange}
						/>
						{errors.desc && (
							<span style={{ color: 'red' }}>
								<i>{errors.desc}</i>
							</span>
						)}
					</FormGroup>

					<Button
						disabled={isProductOptionSubmitting}
						color='primary'
					>
						Submit
					</Button>
				</Form>
			</div>
		);
	} else {
		return (
			<div className='container'>
				<div style={{ textAlign: 'right' }}>
					<Link to={`/`}>
						<Button color='success'>Go Back</Button>
					</Link>
				</div>
				<Form onSubmit={addProduct}>
					<FormGroup>
						<Label>Product Name</Label>
						<Input
							type='text'
							name='name'
							id='name'
							value={values.name || ''}
							required
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Product Price</Label>
						<Input
							type='text'
							name='price'
							id='price'
							value={values.price || ''}
							required
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Product Delivery Price</Label>
						<Input
							type='text'
							name='deliveryPrice'
							id='deliveryPrice'
							value={values.deliveryPrice || ''}
							required
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label for='exampleText'>Product Description</Label>
						<Input
							type='textarea'
							name='desc'
							id='desc'
							value={values.desc || ''}
							required
							onChange={handleChange}
						/>
					</FormGroup>

					<Button disabled={isProductSubmitting} color='primary'>
						Submit
					</Button>
				</Form>
			</div>
		);
	}
};
