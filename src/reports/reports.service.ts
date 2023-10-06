import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportEntity } from './entities/report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { UserEntity } from '../users/entities/user.entity';
import { REPORT_NOT_FOUND_ERROR } from './reports.constants';
import { GetEstimateDto } from './dto/get-estimate.dto';

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

  public async createEstimate({
    make,
    model,
    longitude,
    latitude,
    year,
    mileage,
  }: GetEstimateDto): Promise<ReportEntity> {
    return await this.reportRepository
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('longitude - :longitude BETWEEN -5 AND 5', { longitude })
      .andWhere('latitude - :latitude BETWEEN -5 AND 5', { latitude })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
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
