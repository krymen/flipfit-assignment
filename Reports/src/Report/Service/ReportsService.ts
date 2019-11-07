import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import * as R from 'ramda';
import { OrderMapper } from '../../Order/Service/OrderMapper';
import { Order } from '../../Order/Model/Order';
import { Product } from '../../Order/Model/Product';
import { IBestSellers, IBestBuyers } from '../Model/IReports';

@Injectable()
export class ReportsService {
  constructor(private readonly orderMapper: OrderMapper) {}

  public async bestSellingProducts(day: DateTime): Promise<IBestSellers[]> {
    const orders = await this.orderMapper.allOrdersOnDay(day);

    return R.pipe(
      R.map(R.prop('products')),
      R.flatten,
      sumQuantityAndTotalPricePerProduct,
      R.sort(R.descend(R.prop('totalPrice'))),
    )(orders);
  }

  public async bestBuyer(day: DateTime): Promise<IBestBuyers> {
    const orders = await this.orderMapper.allOrdersOnDay(day);

    if (orders.length === 0) {
      return {
        customerName: '',
        totalPrice: 0,
      };
    }

    return R.pipe(
      sumTotalPricePerCustomer,
      R.sort(R.descend(R.prop('totalPrice'))),
      R.head,
    )(orders);
  }
}

const sumProductQuantityAndTotalPrice = (
  acc: IBestSellers,
  { price, name }: Product,
) => ({
  ...acc,
  productName: name,
  quantity: acc.quantity + 1,
  totalPrice: acc.totalPrice + price,
});

const sumQuantityAndTotalPricePerProduct = (products: ReadonlyArray<Product>) =>
  R.pipe(
    R.reduceBy(
      sumProductQuantityAndTotalPrice,
      { totalPrice: 0, quantity: 0, productName: '' },
      R.pipe(
        R.prop('id'),
        R.toString,
      ),
    ),
    R.values,
  )(products);

const sumBy = <T extends object>(func: (obj: T) => number, list: T[]): number =>
  R.pipe(
    R.map(func),
    R.sum,
  )(list);

const sumCustomerTotalPrice = (
  acc: IBestBuyers,
  { customer, products }: Order,
) => ({
  ...acc,
  customerName: `${customer.firstName} ${customer.lastName}`,
  totalPrice: acc.totalPrice + sumBy(R.prop('price'), products),
});

const sumTotalPricePerCustomer = (products: ReadonlyArray<Order>) =>
  R.pipe(
    R.reduceBy(
      sumCustomerTotalPrice,
      { customerName: '', totalPrice: 0 },
      R.pipe(
        R.prop('customer'),
        R.toString,
      ),
    ),
    R.values,
  )(products);
