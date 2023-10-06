import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportEntity } from './entities/report.entity';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dto/report.dto';
import { ApproveReportDto } from './dto/approve-report.dto';
import { AdminGuard } from '../guards/admin.guard';
import { GetEstimateDto } from './dto/get-estimate.dto';

@Controller('Reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  public async create(
    @Body() body: CreateReportDto,
    @CurrentUser() user: UserEntity,
  ): Promise<ReportEntity> {
    return await this.reportsService.createReport(body, user);
  }

  @Get()
  public async getEstimate(@Query() query: GetEstimateDto) {
    return await this.reportsService.createEstimate(query);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  public async approveReport(
    @Param('id') id: string,
    @Body() body: ApproveReportDto,
  ): Promise<ReportEntity> {
    return await this.reportsService.changeApproval(id, body.approved);
  }
}
