import { Customer } from './Customer';
import { Product } from './Product';

export interface Order {
  number: string;
  customer: Customer;
  products: Product[];
}
