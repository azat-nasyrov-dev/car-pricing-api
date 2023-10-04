import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportEntity } from './entities/report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ReportEntity)
    private readonly reportRepository: Repository<ReportEntity>,
  ) {}

  public async createReport(reportDto: CreateReportDto): Promise<ReportEntity> {
    const report = this.reportRepository.create(reportDto);

    return await this.reportRepository.save(report);
  }
}
