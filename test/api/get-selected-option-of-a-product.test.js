process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../server');
const conn = require('../../db/index');

describe('GET /products/{id}/options/{optionId}', () => {
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

	it('OK - finds the specified product option for the specified product', (done) => {
		request(app)
			.get(
				'/api/products/5e25588f98edc73a7c9494ee/options/5e2566db9209103ff44cc6fd'
			)
			.then((res) => {
				const body = res.body;
				expect(body).to.contain.property('_id');
				expect(body).to.contain.property('ProductId');
				expect(body).to.contain.property('Name');
				expect(body).to.contain.property('Description');
				done();
			})
			.catch((err) => done(err));
	});
});
