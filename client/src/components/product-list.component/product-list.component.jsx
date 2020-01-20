import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'reactstrap';
import axios from 'axios';

import { DeleteConfirmation } from '../delete-confirmation.component/delete-confirmation.component';
import { SearchBox } from '../search-box.component/search-box.component';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ProductList = (props) => {
	const [data, setData] = useState([]);
	const [modal, setModal] = useState(false);
	const [prodName, setProdName] = useState('');
	const [deleteID, setDeleteID] = useState(false);
	const [searchField, setSearchField] = useState('');

	// Get all the products from the database
	function fetchData() {
		axios
			.get('http://localhost:5000/api/products/')
			.then((res) => {
				const response = JSON.parse(JSON.stringify(res.data));
				setData(response);
			})
			.catch((err) => {
				alert('Error fetching data from database>');
			});
	}

	useEffect(() => {
		fetchData();
	}, []);

	// Delete a product
	const deleteProduct = () => {
		axios
			.delete(`http://localhost:5000/api/products/${deleteID}`)
			.then((res) => {
				const response = JSON.parse(JSON.stringify(res.data));
				if (response.success) {
					fetchData();
					setModal(!modal);
				}
			});
	};
	//Open or Close delete confirmation dialog
	const toggle = () => setModal(!modal);

	const searchClick = () => {
		axios
			.get(`http://localhost:5000/api/products?name=${searchField}`)
			.then((res) => {
				const response = JSON.parse(JSON.stringify(res.data));
				console.log(response);
				setData(response);
			})
			.catch((err) => {
				alert('Error fetching data from database>');
			});
	};

	// const filteredProducts = data.filter((product) =>
	// 	product.Name.toLowerCase().includes(searchField.toLowerCase())
	// );

	return (
		<div className='App'>
			<div style={{ textAlign: 'right', paddingBottom: '20px' }}>
				<SearchBox
					placeholder='Search Products'
					handleChange={(e) => setSearchField(e.target.value)}
					searchClick={searchClick}
				/>
			</div>
			<div style={{ textAlign: 'right' }}>
				<Link to={`/add/product`}>
					<Button color='success'>Add New Product</Button>
				</Link>
			</div>
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
										setDeleteID(item._id);
									}}
								>
									Delete
								</Button>{' '}
								<Link to={`/${item._id}/${item.Name}/options`}>
									<Button outline color='info'>
										View Options
									</Button>
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<DeleteConfirmation
				modal={modal}
				toggle={toggle}
				deleteProduct={deleteProduct}
				prodName={prodName}
				type={'product'}
			/>
		</div>
	);
};
