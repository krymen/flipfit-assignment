import { Module } from '@nestjs/common';
import { ReportController } from './Controller/ReportController';
import { OrderModule } from '../Order/OrderModule';
import { ReportsService } from './Service/ReportsService';

@Module({
  imports: [OrderModule],
  controllers: [ReportController],
  providers: [ReportsService],
})
export class ReportModule {
}
