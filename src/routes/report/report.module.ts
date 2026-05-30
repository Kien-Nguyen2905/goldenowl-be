import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { ReportRepo } from './report.repo';
import { PrismaService } from '../../services/prisma.service';

@Module({
  controllers: [ReportController],
  providers: [ReportService, ReportRepo, PrismaService],
  exports: [ReportService],
})
export class ReportModule {}
