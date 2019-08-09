import { Injectable, Inject } from '@nestjs/common';
import { Repository } from './Repository';

@Injectable()
export class OrderMapper {
  @Inject() repository: Repository;
}
