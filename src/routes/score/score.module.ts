import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';
import { ScoreRepo } from './score.repo';
import { PrismaService } from '../../services/prisma.service';

@Module({
  controllers: [ScoreController],
  providers: [ScoreService, ScoreRepo, PrismaService],
  exports: [ScoreService],
})
export class ScoreModule {}
