import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScoreModule } from './routes/score/score.module';
import { ReportModule } from './routes/report/report.module';

@Module({
  imports: [ScoreModule, ReportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
