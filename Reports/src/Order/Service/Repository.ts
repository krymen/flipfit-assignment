import { Injectable } from '@nestjs/common';

/**
 * Data layer - mocked
 */
@Injectable()
export class Repository {
  fetchOrders(): Promise<any[]> {
    return new Promise(resolve => resolve(require('../Resources/Data/orders')));
  }

  fetchProducts(): Promise<any[]> {
    return new Promise(resolve =>
      resolve(require('../Resources/Data/products')),
    );
  }

  fetchCustomers(): Promise<any[]> {
    return new Promise(resolve =>
      resolve(require('../Resources/Data/customers')),
    );
  }
}
