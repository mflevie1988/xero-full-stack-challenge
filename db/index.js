const mongoose = require('mongoose');

// DB config
const uri = require('../config/keys').mongoURI;
const testuri = require('../config/keys').mongoTestURI;

function connect() {
	return new Promise((resolve, reject) => {
		if (process.env.NODE_ENV === 'test') {
			const Mockgoose = require('mockgoose').Mockgoose;
			const mockgoose = new Mockgoose(mongoose);

			mockgoose.prepareStorage().then(() => {
				mongoose
					.connect(uri, {
						useNewUrlParser: true,
						useCreateIndex: true,
						useUnifiedTopology: true
					})
					.then((res, err) => {
						if (err) return reject(err);
						console.log(
							'MongoDB database connection established successfully'
						);
						resolve('promise resolved');
					});
			});
		} else {
			// Connect to Mongo DB
			mongoose
				.connect(uri, {
					useNewUrlParser: true,
					useCreateIndex: true,
					useUnifiedTopology: true
				})
				.then((res, err) => {
					if (err) return reject(err);
					console.log(
						'MongoDB database connection established successfully'
					);
					resolve('promise resolved');
				});
		}
	});
}

function close() {
	return mongoose.disconnect();
}

module.exports = { connect, close };
