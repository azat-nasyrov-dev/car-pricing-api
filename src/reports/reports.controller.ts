import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportEntity } from './entities/report.entity';

@Controller('Reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  public async create(@Body() body: CreateReportDto): Promise<ReportEntity> {
    return await this.reportsService.createReport(body);
  }
}
