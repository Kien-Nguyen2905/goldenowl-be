import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { SUBJECT_KEYS, GRADE_LEVELS } from '../../constants/general';

@Injectable()
export class ReportRepo {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Performs range-based aggregation across subjects.
   */
  async getScoreStatisticsRaw() {
    const selectFields = SUBJECT_KEYS.map(
      (code) => `
      COUNT(CASE WHEN ${code} >= ${GRADE_LEVELS.EXCELLENT.cond} THEN 1 END)::int as "${code}_${GRADE_LEVELS.EXCELLENT.label}",
      COUNT(CASE WHEN ${code} >= ${GRADE_LEVELS.GOOD.cond} AND ${code} < ${GRADE_LEVELS.EXCELLENT.cond} THEN 1 END)::int as "${code}_${GRADE_LEVELS.GOOD.label}",
      COUNT(CASE WHEN ${code} >= ${GRADE_LEVELS.AVERAGE.cond} AND ${code} < ${GRADE_LEVELS.GOOD.cond} THEN 1 END)::int as "${code}_${GRADE_LEVELS.AVERAGE.label}",
      COUNT(CASE WHEN ${code} < ${GRADE_LEVELS.AVERAGE.cond} THEN 1 END)::int as "${code}_${GRADE_LEVELS.POOR.label}"
    `,
    ).join(',\n');

    const query = `SELECT ${selectFields} FROM exam_results`;
    const rawResult =
      await this.prisma.$queryRawUnsafe<Record<string, number>[]>(query);
    return rawResult[0] || {};
  }

  /**
   * Queries top 10 students of Group A.
   */
  async getTopGroupARaw() {
    return await this.prisma.$queryRaw<any[]>`
      SELECT sbd, 
             toan::float as toan, 
             vat_ly::float as vat_ly, 
             hoa_hoc::float as hoa_hoc,
             (toan + vat_ly + hoa_hoc)::float as total
      FROM exam_results
      WHERE toan IS NOT NULL AND vat_ly IS NOT NULL AND hoa_hoc IS NOT NULL
      ORDER BY (toan + vat_ly + hoa_hoc) DESC
      LIMIT 10
    `;
  }
}
