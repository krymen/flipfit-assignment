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

    return Promise.all(
      orders
        .filter(order => order.createdAt === day.toFormat('yyyy-MM-dd'))
        .map(async order => ({
          number: order.number,
          customer: await this.customerWithId(order.customer),
          products: await Promise.all(
            order.products.map(
              async orderedProduct => await this.productWithId(orderedProduct),
            ),
          ),
        })),
    );
  }

  private async customerWithId(customerId: number): Promise<Customer> {
    const customers = await this.repository.fetchCustomers();
    const { id, ...rest } = customers.find(c => c.id === customerId);

    return rest;
  }

  private async productWithId(productId: number): Promise<Product> {
    const products = await this.repository.fetchProducts();
    const { id, ...rest } = products.find(product => product.id === productId);

    return rest;
  }
}
