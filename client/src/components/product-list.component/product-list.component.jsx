import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	Table,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter
} from 'reactstrap';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

export const ProductList = (props) => {
	const [data, setData] = useState([]);
	const [modal, setModal] = useState(false);
	const [prodName, setProdName] = useState('');

	useEffect(() => {
		function fetchData() {
			axios.get('http://localhost:5000/api/products/').then((res) => {
				const response = JSON.parse(JSON.stringify(res.data));
				console.log(response);
				setData(response);
			});
		}
		fetchData();
	}, []);
	const deleteProduct = () => {
		axios.delete();
	};
	// const show = (name) => {
	// 	setModal(!modal);
	// 	//setProdName(name);
	// };
	const toggle = () => setModal(!modal);
	return (
		<div className='App'>
			<Table bordered>
				<thead>
					<tr>
						<th>#</th>
						<th>Product Name</th>
						<th>Product Description</th>
						<th>Price</th>
						<th>Delivery Price</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => (
						<tr key={item._id}>
							<th scope='row'>{index + 1}</th>
							<td>{item.Name}</td>
							<td>{item.Description}</td>
							<td>{item.Price}</td>
							<td>{item.DeliveryPrice}</td>
							<td>
								<Link to={`/${item._id}`}>
									<Button outline color='primary'>
										Edit
									</Button>
								</Link>{' '}
								<Button
									outline
									color='danger'
									onClick={() => {
										setModal(!modal);
										setProdName(item.Name);
									}}
								>
									Delete
								</Button>{' '}
								<Link to={`/${item._id}`}>
									<Button outline color='info'>
										View Options
									</Button>
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Modal isOpen={modal}>
				<ModalHeader toggle={toggle}>Modal title</ModalHeader>
				<ModalBody>
					<h4>Do you want to delete {`${prodName}`} product?</h4>
				</ModalBody>
				<ModalFooter>
					<Button color='danger' onClick={toggle}>
						Delete
					</Button>{' '}
					<Button color='primary' onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
};
