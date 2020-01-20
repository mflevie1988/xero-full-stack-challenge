process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../server');
const conn = require('../../db/index');

describe('GET /products', () => {
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

	it('OK - getting all products works', (done) => {
		request(app)
			.get('/api/products/')
			.then((res) => {
				const body = res.body;
				expect(body.length).to.greaterThan(0);
				done();
			})
			.catch((err) => done(err));
	});
});
