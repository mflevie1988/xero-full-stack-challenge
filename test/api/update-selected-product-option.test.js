process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../server');
const conn = require('../../db/index');

describe('PUT api/products/:id/options/:optionID', () => {
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

	it('OK - updating a selected option works', (done) => {
		request(app)
			.put(
				'/api/products/5e25588f98edc73a7c9494ee/options/5e2567de5138c00fb4320718'
			)
			.send({
				ProductId: '5e25588f98edc73a7c9494ee',
				Name: 'TEST12222',
				Description: 'TES222'
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
			.put(
				'/api/products/5e25588f98edc73a7c9494ee/options/5e2567de5138c00fb4320718'
			)
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
