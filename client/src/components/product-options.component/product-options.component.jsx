import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button } from 'reactstrap';
import { DeleteConfirmation } from '../delete-confirmation.component/delete-confirmation.component';

export const ProductOptions = (props) => {
	const [dataOptions, setOptionData] = useState([]);
	const [modal, setModal] = useState(false);
	const [prodName, setProdName] = useState('');
	const [deleteID, setDeleteID] = useState(false);
	const [prodId, setProdId] = useState('');

	// Get all the products from the database
	function fetchData() {
		axios
			.get(
				`http://localhost:5000/api/products/${props.match.params.id}/options`
			)
			.then((res) => {
				const response = JSON.parse(JSON.stringify(res.data));
				console.log(response);
				setOptionData(response);
				setProdName(props.match.params.name);
				setProdId(props.match.params.id);
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
			.delete(
				`http://localhost:5000/api/products/${prodId}/options/${deleteID}`
			)
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

	return (
		<div className='container'>
			<h3>Product options for {`${prodName}`}</h3>
			<div style={{ textAlign: 'right' }}>
				<Link to={`/add/${prodId}/${prodName}/options`}>
					<Button color='success'>Add New Option</Button>
				</Link>
				{'  '}
				<Link to={`/`}>
					<Button color='success'>Go Back</Button>
				</Link>
			</div>
			<Table bordered>
				<thead>
					<tr>
						<th>#</th>
						<th>Colour Option</th>
						<th>Product Description</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{dataOptions.length > 0 ? (
						dataOptions.map((item, index) => (
							<tr key={item._id}>
								<th scope='row'>{index + 1}</th>
								<td>{item.Name}</td>
								<td>{item.Description}</td>
								<td>
									<Link
										to={`/${item.ProductId}/${prodName}/options/${item._id}`}
									>
										<Button outline color='primary'>
											Edit Option
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
									</Button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colspan='4' style={{ textAlign: 'center' }}>
								<h6>{'No Options to Display'}</h6>
							</td>
						</tr>
					)}
				</tbody>
			</Table>
			<DeleteConfirmation
				modal={modal}
				toggle={toggle}
				deleteProduct={deleteProduct}
				prodName={prodName}
				type={'option'}
			/>
		</div>
	);
};
