import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const AddProductOrOptions = (props) => {
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
							name='prodColor'
							id='prodColor'
							value={color || ''}
							required
							onChange={(e) => setColor(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Product Option Description</Label>
						<Input
							type='textarea'
							name='optionDesc'
							id='optionDesc'
							value={desc || ''}
							required
							onChange={(e) => setDesc(e.target.value)}
						/>
					</FormGroup>

					<Button color='primary'>Submit</Button>
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
							name='prodName'
							id='prodName'
							value={name || ''}
							required
							onChange={(e) => setName(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Product Price</Label>
						<Input
							type='text'
							name='prodPrice'
							id='prodPrice'
							value={price || ''}
							required
							onChange={(e) => setPrice(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<Label>Product Delivery Price</Label>
						<Input
							type='text'
							name='prodDelivery'
							id='prodDelivery'
							value={deliveryPrice || ''}
							required
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
							required
							onChange={(e) => setDesc(e.target.value)}
						/>
					</FormGroup>

					<Button color='primary'>Submit</Button>
				</Form>
			</div>
		);
	}
};
