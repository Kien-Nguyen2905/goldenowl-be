import { Controller, Get, Param } from '@nestjs/common';
import { ScoreService } from './score.service';
import { SearchScoreDto } from './score.dto';

@Controller('api/scores')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get(':sbd')
  async getScores(@Param() params: SearchScoreDto) {
    return this.scoreService.getScoresBySbd(params.sbd);
  }
}
