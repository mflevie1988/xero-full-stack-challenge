const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const db = require('./db/index');
const products = require('./routes/api/products-api');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// =============Database - Mongo DB==============================

// DB config
const uri = require('./config/keys').mongoURI;

// // Connect to Mongo DB
db.connect().then(() => {
	app.listen(port, () => console.log(`Server is running on port: ${port}`));
});

// app.post('/notes', (req, res) => {
// 	return {
// 		_id: '5e1e8aefa90ab91c88975d35',
// 		Name: 'Oppo',
// 		Description: 'Newest mobile product from Oppo.',
// 		Price: 899.99,
// 		DeliveryPrice: 8.99
// 	};
// });

//use routes
app.use('/api/products', products);

module.exports = app;
