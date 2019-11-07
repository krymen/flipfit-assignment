import { Inject } from '@nestjs/common';
import { DateTime } from 'luxon';
import * as R from 'ramda';
import { OrderMapper } from '../../Order/Service/OrderMapper';
import { Product } from '../../Order/Model/Product';
import { IBestSellers } from '../Model/IReports';

export class ReportsService {
  constructor(@Inject() readonly orderMapper: OrderMapper) {}

  public async bestSellingProducts(day: DateTime): Promise<IBestSellers[]> {
    const orders = await this.orderMapper.allOrdersOnDay(day);

    return R.pipe(
      R.map(R.prop('products')),
      R.flatten,
      sumQuantityAndTotalPricePerProduct,
      R.sort(R.descend(R.prop('totalPrice'))),
    )(orders);
  }
}

const sumQuantityAndTotalPrice = (
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
      sumQuantityAndTotalPrice,
      { totalPrice: 0, quantity: 0, productName: '' },
      R.pipe(R.prop('id'), R.toString),
    ),
    R.values,
  )(products);
