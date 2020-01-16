import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { EditProduct } from './components/edit-product.component/edit-product.component';
import { ProductList } from './components/product-list.component/product-list.component';

function App() {
	return (
		<Router>
			<div className='container'>
				<h1>Phone Shop</h1>
				<Route path='/' exact component={ProductList} />
				<Route path='/:id' exact component={EditProduct} />
			</div>
		</Router>
	);
}

export default App;
