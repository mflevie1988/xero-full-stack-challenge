import React, { useState, useEffect } from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Label,
	Input
} from 'reactstrap';
import axios from 'axios';

export const AddProductOrOptions = (props) => {
	const [_id, setID] = useState('');
	const [color, setColor] = useState('');
	const [name, setName] = useState('');
	const [desc, setDesc] = useState('');
	const [price, setPrice] = useState('');
	const [deliveryPrice, setDeliveryPrice] = useState('');

	//Adding the product option
	const addProductOption = (e) => {
		e.preventDefault();
		const product = {
			Name: color,
			Description: desc
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
	};

	//Adding a product
	const addProduct = (e) => {
		e.preventDefault();
		const product = {
			Name: name,
			Description: desc,
			Price: price,
			DeliveryPrice: deliveryPrice
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
	};

	if (props.match.params.id) {
		return (
			<Form onSubmit={addProductOption}>
				<FormGroup>
					<Label for='exampleEmail'>Product Colour</Label>
					<Input
						type='text'
						name='prodColor'
						id='prodColor'
						value={color || ''}
						onChange={(e) => setColor(e.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label for='exampleEmail'>Product Option Description</Label>
					<Input
						type='textarea'
						name='optionDesc'
						id='optionDesc'
						value={desc || ''}
						onChange={(e) => setDesc(e.target.value)}
					/>
				</FormGroup>

				<Button color='primary'>Submit</Button>
			</Form>
		);
	} else {
		return (
			<div className='container'>
				<Form onSubmit={addProduct}>
					<FormGroup>
						<Label for='exampleEmail'>Product Name</Label>
						<Input
							type='text'
							name='prodName'
							id='prodName'
							value={name || ''}
							onChange={(e) => setName(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<Label for='exampleEmail'>Product Price</Label>
						<Input
							type='text'
							name='prodPrice'
							id='prodPrice'
							value={price || ''}
							onChange={(e) => setPrice(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<Label for='exampleEmail'>Product Delivery Price</Label>
						<Input
							type='text'
							name='prodDelivery'
							id='prodDelivery'
							value={deliveryPrice || ''}
							onChange={(e) => setDeliveryPrice(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<Label for='exampleText'>Product Description</Label>
						<Input
							type='textarea'
							name='prodDesc'
							id='prodDesc'
							value={desc || ''}
							onChange={(e) => setDesc(e.target.value)}
						/>
					</FormGroup>

					<Button color='primary'>Submit</Button>
				</Form>
			</div>
		);
	}
};
