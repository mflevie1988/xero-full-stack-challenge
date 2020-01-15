process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../server');
const conn = require('../../db/index');

describe('POST /products', () => {
	before(() => {
		conn.connect()
			.then(() => {
				const resolvingPromise = new Promise((resolve) => {
					resolve('promise resolved');
				});
				resolvingPromise.then((result) => {
					expect(result).to.equal('promise resolved');
					done();
				});
			})
			.catch((err) => console.log(err));
	});

	after((done) => {
		conn.close()
			.then(() => done())
			.catch((err) => done(err));
	});

	it('OK creating a new product works', (done) => {
		request(app)
			.post('/api/products/')
			.send({
				Name: 'TEST',
				Description: 'TEST',
				Price: '100.70',
				DeliveryPrice: '8.99'
			})
			.then((res) => {
				const body = res.body;
				expect(body).to.contain.property('_id');
				expect(body).to.contain.property('Name');
				expect(body).to.contain.property('Description');
				expect(body).to.contain.property('Price');
				expect(body).to.contain.property('DeliveryPrice');
			})
			.finally(done())
			.catch((err) => done(err));
	});
});
