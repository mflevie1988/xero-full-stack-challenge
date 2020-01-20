process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../server');
const conn = require('../../db/index');

describe('GET /products/{id}/options', () => {
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

	it('OK - getting all products options works', (done) => {
		request(app)
			.get('/api/products/5e25588f98edc73a7c9494ee/options')
			.then((res) => {
				const body = res.body;
				expect(body.length).to.greaterThan(0);
				done();
			})
			.catch((err) => done(err));
	});
});
