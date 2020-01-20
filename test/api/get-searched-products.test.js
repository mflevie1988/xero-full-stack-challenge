process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../server');
const conn = require('../../db/index');

describe('GET /products?name={name}', () => {
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

	it('OK - finds all products matching the specified name (No Found Product)', (done) => {
		request(app)
			.get('/api/products?name=pp')
			.then((res) => {
				const body = res.body;
				console.log(body);
				expect(body.length).to.equal(0);
				done();
			})
			.catch((err) => done(err));
	});

	it('OK - finds all products matching the specified name', (done) => {
		request(app)
			.get('/api/products?name=t')
			.then((res) => {
				const body = res.body;
				// console.log(body);
				expect(body.length).to.greaterThan(1);
				done();
			})
			.catch((err) => done(err));
	});
});
