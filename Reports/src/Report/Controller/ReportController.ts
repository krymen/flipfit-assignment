import { Controller, Get, Param } from '@nestjs/common';
import { ReportsService } from '../Service/ReportsService';
import { DateTime } from 'luxon';
import { ParseDatePipe } from './ParseDatePipe';

@Controller()
export class ReportController {
  constructor(private readonly service: ReportsService) {}

  @Get('/report/products/:date')
  bestSellers(@Param('date', new ParseDatePipe()) date: DateTime) {
    return this.service.bestSellingProducts(date);
  }

  @Get('/report/customer/:date')
  bestBuyers(@Param('date', new ParseDatePipe()) date: DateTime) {
    return this.service.bestBuyer(date);
  }
}
