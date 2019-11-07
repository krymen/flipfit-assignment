import { Injectable, Inject } from '@nestjs/common';
import { Repository } from './Repository';
import { Order } from '../Model/Order';
import { DateTime } from 'luxon';
import { Customer } from '../Model/Customer';
import { Product } from '../Model/Product';

@Injectable()
export class OrderMapper {
  constructor(@Inject() readonly repository: Repository) {}

  public async allOrdersOnDay(day: DateTime): Promise<Order[]> {
    const orders = ((await this.repository.fetchOrders()) as unknown) as Array<{
      number: string;
      createdAt: string;
      customer: number;
      products: number[];
    }>;

    const products = await this.repository.fetchProducts();
    const customers = await this.repository.fetchCustomers();

    return Promise.all(
      orders
        .filter(order => order.createdAt === day.toFormat('yyyy-MM-dd'))
        .map(async order => ({
          number: order.number,
          customer: this.customerWithId(customers, order.customer),
          products: order.products.map(product => this.productWithId(products, product)),
        })),
    );
  }

  private customerWithId(customers: any[], customerId: number): Customer {
    return customers.find(c => c.id === customerId);
  }

  private productWithId(products: any[], productId: number): Product {
    return products.find(product => product.id === productId);
  }
}
