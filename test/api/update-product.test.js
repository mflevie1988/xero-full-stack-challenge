process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../server');
const conn = require('../../db/index');

describe('PUT api/products/:id', () => {
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

	it('OK - updating a new product works', (done) => {
		request(app)
			.put('/api/products/5e2566764af1e12b581fe91e')
			.send({
				Name: 'TEST123',
				Description: 'TEST123',
				Price: '104.70',
				DeliveryPrice: '7.99'
			})
			.then((res) => {
				const body = res.body;

				expect(body.product).to.contain.property('_id');
				expect(body.product).to.contain.property('Name');
				expect(body.product).to.contain.property('Description');
				expect(body.product).to.contain.property('Price');
				expect(body.product).to.contain.property('DeliveryPrice');
				done();
			})
			.catch((err) => done(err));
	});

	it('Fail, creating a new product', (done) => {
		request(app)
			.put('/api/products/5e2566764af1e12b581fe91e')
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
