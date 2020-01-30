import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

export const EditProduct = (props) => {
	const [_id, setID] = useState('');
	const [name, setName] = useState('');
	const [desc, setDesc] = useState('');
	const [price, setPrice] = useState('');
	const [deliveryPrice, setDeliveryPrice] = useState('');

	const fetchData = useCallback(() => {
		axios
			.get(`http://localhost:5000/api/products/${props.match.params.id}`)
			.then((res) => {
				const response = JSON.parse(JSON.stringify(res.data));
				console.log(response);
				setID(response._id);
				setName(response.Name);
				setDesc(response.Description);
				setPrice(response.Price);
				setDeliveryPrice(response.DeliveryPrice);
			});
	}, [props.match.params.id]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const updateProduct = (e) => {
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
			.put(
				`http://localhost:5000/api/products/${_id}`,
				JSON.stringify(product),
				options
			)
			.then((res) => {
				const response = JSON.parse(JSON.stringify(res.data));
				if (response.product) {
					window.location = '/';
				} else {
					alert('Error Updating the product');
				}
			});
	};

	return (
		<div className='container'>
			<div style={{ textAlign: 'right' }}>
				<Link to={`/`}>
					<Button color='success'>Go Back</Button>
				</Link>
			</div>
			<Form onSubmit={updateProduct}>
				<FormGroup>
					<Label>Product ID</Label>
					<Input
						type='text'
						name='prodID'
						id='prodID'
						value={_id || ''}
						disabled
						onChange={(e) => setID(e.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label>Product Name</Label>
					<Input
						type='text'
						name='prodName'
						id='prodName'
						value={name || ''}
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

				<Button>Submit</Button>
			</Form>
		</div>
	);
};
