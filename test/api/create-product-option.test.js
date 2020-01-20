process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../server');
const conn = require('../../db/index');

describe('POST api/products/:id/options', () => {
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

	it('OK - creating a new product option works', (done) => {
		request(app)
			.post('/api/products/5e25588f98edc73a7c9494ee/options')
			.send({
				ProductId: '5e25588f98edc73a7c9494ee',
				Name: 'Test Option23',
				Description: 'Test Option Desc23'
			})
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

	it('Fail, creating a new product', (done) => {
		request(app)
			.post('/api/products/5e254bc26c417836509015a9/options')
			.send({
				Name: 'TEST'
			})
			.then((res) => {
				const body = res.body;
				expect(body.isJoi).to.equal(true);
				expect(body.name).to.equal('ValidationError');
				done();
			})
			.catch((err) => done(err));
	});
});
