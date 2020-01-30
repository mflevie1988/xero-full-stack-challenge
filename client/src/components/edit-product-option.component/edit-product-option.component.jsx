import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

export const EditProductOption = (props) => {
	const [_id, setID] = useState('');
	const [optionID, setOptionID] = useState('');
	const [color, setColor] = useState('');
	const [desc, setDesc] = useState('');

	const fetchData = useCallback(() => {
		axios
			.get(
				`http://localhost:5000/api/products/${props.match.params.id}/options/${props.match.params.optionID}`
			)
			.then((res) => {
				const response = JSON.parse(JSON.stringify(res.data));
				console.log(response);
				setID(response.ProductId);
				setOptionID(response._id);
				setColor(response.Name);
				setDesc(response.Description);
			});
	}, [props.match.params.id, props.match.params.optionID]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const updateProduct = (e) => {
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

		console.log(JSON.stringify(product));

		axios
			.put(
				`http://localhost:5000/api/products/${_id}/options/${optionID}`,
				JSON.stringify(product),
				options
			)
			.then((res) => {
				const response = JSON.parse(JSON.stringify(res.data));
				console.log(response);
				if (response) {
					window.location = `/${_id}/${props.match.params.prodName}/options`;
					console.log(response);
				} else {
					alert('Error Updating the product');
				}
			});
	};

	return (
		<div className='container'>
			<div style={{ textAlign: 'right' }}>
				<Link to={`/${_id}/${props.match.params.prodName}/options`}>
					<Button color='success'>Go Back</Button>
				</Link>
			</div>
			<Form onSubmit={updateProduct}>
				<FormGroup>
					<Label>Option ID</Label>
					<Input
						type='text'
						name='prodID'
						id='prodID'
						value={optionID || ''}
						disabled
						onChange={(e) => setOptionID(e.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label>Product Colour</Label>
					<Input
						type='text'
						name='prodColor'
						id='prodColor'
						value={color || ''}
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
						onChange={(e) => setDesc(e.target.value)}
					/>
				</FormGroup>

				<Button color='primary'>Submit</Button>
			</Form>
		</div>
	);
};
