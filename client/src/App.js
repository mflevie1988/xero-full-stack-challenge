import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { EditProduct } from './components/edit-product.component/edit-product.component';
import { ProductList } from './components/product-list.component/product-list.component';
import { ProductOptions } from './components/product-options.component/product-options.component';
import { EditProductOption } from './components/edit-product-option.component/edit-product-option.component';
import { AddProductOrOptions } from './components/add-product-or-options.component/add-product-or-option.component';
function App() {
	return (
		<Router>
			<div className='container'>
				<h1>Phone Shop</h1>
				<Route path='/' exact component={ProductList} />
				<Route path='/:id' exact component={EditProduct} />
				<Route
					path='/:id/:name/options'
					exact
					component={ProductOptions}
				/>
				<Route
					path='/:id/:prodName/options/:optionID'
					exact
					component={EditProductOption}
				/>
				<Route
					path='/add/:id/:name/options'
					exact
					component={AddProductOrOptions}
				/>
				<Route
					path='/add/product'
					exact
					component={AddProductOrOptions}
				/>
			</div>
		</Router>
	);
}

export default App;
