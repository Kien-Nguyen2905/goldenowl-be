import { Injectable, NotFoundException } from '@nestjs/common';
import { ScoreRepo } from './score.repo';
import { ExamScoreResult } from '../../models/score.model';

@Injectable()
export class ScoreService {
  constructor(private readonly scoreRepo: ScoreRepo) {}

  async getScoresBySbd(sbd: string) {
    try {
      const result = await this.scoreRepo.findBySbd(sbd);

      if (!result) {
        throw new NotFoundException(`Not found exam results with ${sbd}`);
      }

      return new ExamScoreResult(result);
    } catch (error) {
      throw error;
    }
  }
}
