import { OrderMapper } from './OrderMapper';
import { Repository } from './Repository';
import { DateTime } from 'luxon';

describe('OrderMapper', () => {
  let repository: Repository;
  let orderMapper: OrderMapper;

  beforeEach(() => {
    repository = new Repository();
    orderMapper = new OrderMapper(repository);

    jest.spyOn(repository, 'fetchCustomers').mockResolvedValue([
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
      },
    ]);

    jest
      .spyOn(repository, 'fetchProducts')
      .mockResolvedValue([
        { id: 1, name: 'Black sport shoes', price: 110 },
        { id: 2, name: 'Cotton t-shirt XL', price: 25.75 },
        { id: 3, name: 'Blue jeans', price: 55.99 },
      ]);
  });

  it('maps all orders on day from repository', async () => {
    jest.spyOn(repository, 'fetchOrders').mockResolvedValue([
      {
        number: '2019/07/1',
        customer: 1,
        createdAt: '2019-08-07',
        products: [1, 2],
      },
      {
        number: '2019/07/2',
        customer: 2,
        createdAt: '2019-08-07',
        products: [1],
      },
    ]);

    expect(
      await orderMapper.allOrdersOnDay(DateTime.fromISO('2019-08-07')),
    ).toEqual([
      {
        number: '2019/07/1',
        customer: { firstName: 'John', lastName: 'Doe' },
        products: [
          { name: 'Black sport shoes', price: 110 },
          { name: 'Cotton t-shirt XL', price: 25.75 },
        ],
      },
      {
        number: '2019/07/2',
        customer: { firstName: 'Jane', lastName: 'Doe' },
        products: [
          { name: 'Black sport shoes', price: 110 },
        ],
      },
    ]);
  });

  it('does not return orders from different day than the given one', async () => {
    jest.spyOn(repository, 'fetchOrders').mockResolvedValue([
      {
        number: '2019/07/1',
        customer: 1,
        createdAt: '2019-08-06',
        products: [1, 2],
      },
      {
        number: '2019/07/2',
        customer: 2,
        createdAt: '2019-08-08',
        products: [1],
      },
    ]);

    expect(await orderMapper.allOrdersOnDay(DateTime.fromISO('2019-08-07'))).toEqual([]);
  });
});
