process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../server');
const conn = require('../../db/index');

describe('GET /products/:id', () => {
	// before(() => {
	// 	conn.connect()
	// 		.then(() => {
	// 			const resolvingPromise = new Promise((resolve) => {
	// 				resolve('promise resolved');
	// 			});
	// 			resolvingPromise.then((result) => {
	// 				expect(result).to.equal('promise resolved');
	// 				done();
	// 			});
	// 		})
	// 		.catch((err) => console.log(err));
	// });
	before((done) => {
		conn.connect()
			.then(() => done())
			.catch((err) => done(err));
	});

	after((done) => {
		conn.close()
			.then(() => done())
			.catch((err) => done(err));
	});

	it('OK - gets the product that matches the specified ID', (done) => {
		request(app)
			.get('/api/products/5e25588f98edc73a7c9494ee')
			.then((res) => {
				const body = res.body;
				// console.log(body);
				// expect(body.length).to.greaterThan(0);
				expect(body).to.contain.property('_id');
				expect(body).to.contain.property('Name');
				expect(body).to.contain.property('Description');
				expect(body).to.contain.property('Price');
				expect(body).to.contain.property('DeliveryPrice');
				done();
			})
			.catch((err) => done(err));
	});

	it('Fail - gets the product that matches the specified ID', (done) => {
		request(app)
			.get('/api/products/5/')
			.then((res) => {
				const body = res.body;
				expect(body.success).to.equal(false);
				done();
			})
			.catch((err) => done(err));
	});
});
