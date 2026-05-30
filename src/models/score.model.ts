import { GRADE_LEVELS, GradeLevel } from '../constants/general';

export class Score {
  public readonly score: number | null;
  public readonly gradeLevel: GradeLevel | null;

  constructor(rawValue: any) {
    if (rawValue === null || rawValue === undefined) {
      this.score = null;
      this.gradeLevel = null;
    } else {
      this.score = Number(rawValue);
      this.gradeLevel = this.calculateGradeLevel(this.score);
    }
  }

  private calculateGradeLevel(score: number): GradeLevel {
    if (score >= GRADE_LEVELS.EXCELLENT.cond)
      return GRADE_LEVELS.EXCELLENT.label;
    if (score >= GRADE_LEVELS.GOOD.cond) return GRADE_LEVELS.GOOD.label;
    if (score >= GRADE_LEVELS.AVERAGE.cond) return GRADE_LEVELS.AVERAGE.label;
    return GRADE_LEVELS.POOR.label;
  }
}

export class ExamScoreResult {
  public readonly sbd: string;
  public readonly maNgoaiNgu: string | null;
  public readonly scores: Record<string, Score>;

  constructor(dbRecord: any) {
    this.sbd = dbRecord.sbd;
    this.maNgoaiNgu = dbRecord.ma_ngoai_ngu || null;
    this.scores = {
      toan: new Score(dbRecord.toan),
      ngu_van: new Score(dbRecord.ngu_van),
      ngoai_ngu: new Score(dbRecord.ngoai_ngu),
      vat_ly: new Score(dbRecord.vat_ly),
      hoa_hoc: new Score(dbRecord.hoa_hoc),
      sinh_hoc: new Score(dbRecord.sinh_hoc),
      lich_su: new Score(dbRecord.lich_su),
      dia_ly: new Score(dbRecord.dia_ly),
      gdcd: new Score(dbRecord.gdcd),
    };
  }
}
