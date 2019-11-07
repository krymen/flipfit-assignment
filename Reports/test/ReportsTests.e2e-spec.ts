import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { ReportModule } from './../src/Report/ReportModule';

describe('Reports', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [ReportModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('gets best selling products', () => {
    return request(app.getHttpServer())
      .get('/report/products/2019-08-07')
      .expect(HttpStatus.OK)
      .expect('Content-Type', /json/)
      .expect([
        { totalPrice: 220, quantity: 2, productName: 'Black sport shoes' },
        { totalPrice: 25.75, quantity: 1, productName: 'Cotton t-shirt XL' },
      ]);
  });

  it('throws not found error when getting best selling products with invalid date', () => {
    return request(app.getHttpServer())
      .get('/report/products/invalid-date')
      .expect(HttpStatus.NOT_FOUND);
  });

  it('gets best buyer', () => {
    return request(app.getHttpServer())
      .get('/report/customer/2019-08-07')
      .expect(HttpStatus.OK)
      .expect('Content-Type', /json/)
      .expect({ totalPrice: 135.75, customerName: 'John Doe' });
  });

  it('throws not found error when getting best customer with invalid date', () => {
    return request(app.getHttpServer())
      .get('/report/customer/invalid-date')
      .expect(HttpStatus.NOT_FOUND);
  });

  afterAll(async () => {
    await app.close();
  });
});
