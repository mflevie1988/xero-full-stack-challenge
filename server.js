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

//Mount all routes for api/products
app.use('/api/products', products);

module.exports = app;
