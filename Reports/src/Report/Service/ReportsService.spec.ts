import { ReportsService } from './ReportsService';
import { OrderMapper } from '../../Order/Service/OrderMapper';
import { DateTime } from 'luxon';
jest.mock('../../Order/Service/OrderMapper');

describe('ReportsService', () => {
  let orderMapper: OrderMapper;
  let reportsService: ReportsService;

  beforeEach(() => {
    // @ts-ignore
    OrderMapper.mockClear();
    // @ts-ignore
    orderMapper = new OrderMapper();
    reportsService = new ReportsService(orderMapper);
  });

  it('gets best selling products ordered by total price', async () => {
    jest.spyOn(orderMapper, 'allOrdersOnDay').mockResolvedValue([
      {
        number: '2019/07/1',
        customer: { id: 1, firstName: 'John', lastName: 'Doe' },
        products: [
          { id: 1, name: 'Black sport shoes', price: 110 },
          { id: 2, name: 'Cotton t-shirt XL', price: 25.75 },
        ],
      },
      {
        number: '2019/07/2',
        customer: { id: 2, firstName: 'Jane', lastName: 'Doe' },
        products: [{ id: 1, name: 'Black sport shoes', price: 110 }],
      },
    ]);
    const day = DateTime.fromISO('2019-08-07');

    expect(
      await reportsService.bestSellingProducts(day),
    ).toEqual([
      {
        productName: 'Black sport shoes',
        quantity: 2,
        totalPrice: 220,
      },
      {
        productName: 'Cotton t-shirt XL',
        quantity: 1,
        totalPrice: 25.75,
      },
    ]);

    expect(orderMapper.allOrdersOnDay).toHaveBeenCalledWith(day);
  });

  it('gets empty best selling products list if no orders available on the given day', async () => {
    jest.spyOn(orderMapper, 'allOrdersOnDay').mockResolvedValue([]);

    expect(
      await reportsService.bestSellingProducts(DateTime.fromISO('2019-08-07')),
    ).toEqual([]);
  });
});
