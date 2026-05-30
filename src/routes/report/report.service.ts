import { Injectable } from '@nestjs/common';
import { ReportRepo } from './report.repo';
import { SubjectStatistics, GroupAStudent } from '../../models/report.model';
import { SUBJECT_KEYS } from '../../constants/general';

@Injectable()
export class ReportService {
  constructor(private readonly reportRepo: ReportRepo) {}

  /**
   * Retrieves range-based score statistics (4 levels) for all 9 subjects.
   * Leverages repository for database operations and maps the result within try-catch.
   */
  async getScoreStatistics() {
    try {
      const stats = await this.reportRepo.getScoreStatisticsRaw();

      // Map back into beautiful structured domain statistics
      return SUBJECT_KEYS.map((code) => SubjectStatistics.fromRaw(code, stats));
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lists the top 10 students of Group A (Toán, Vật Lý, Hóa Học) ordered by sum score descending.
   */
  async getTopGroupA() {
    try {
      const topStudents = await this.reportRepo.getTopGroupARaw();

      return topStudents.map(
        (student, index) => new GroupAStudent(student, index),
      );
    } catch (error) {
      throw error;
    }
  }
}
