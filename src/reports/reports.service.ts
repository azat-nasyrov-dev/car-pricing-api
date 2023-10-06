import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportEntity } from './entities/report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { UserEntity } from '../users/entities/user.entity';
import { REPORT_NOT_FOUND_ERROR } from './reports.constants';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ReportEntity)
    private readonly reportRepository: Repository<ReportEntity>,
  ) {}

  public async createReport(
    reportDto: CreateReportDto,
    user: UserEntity,
  ): Promise<ReportEntity> {
    const report = this.reportRepository.create(reportDto);
    report.user = user;

    return await this.reportRepository.save(report);
  }

  public async changeApproval(
    id: string,
    approved: boolean,
  ): Promise<ReportEntity> {
    const report = await this.reportRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!report) {
      throw new NotFoundException(REPORT_NOT_FOUND_ERROR);
    }

    report.approved = approved;
    return await this.reportRepository.save(report);
  }
}
