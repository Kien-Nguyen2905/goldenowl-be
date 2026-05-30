export class SubjectStatistics {
  constructor(
    public readonly code: string,
    public readonly excellent: number,
    public readonly good: number,
    public readonly average: number,
    public readonly poor: number,
  ) {}

  static fromRaw(
    code: string,
    stats: Record<string, number>,
  ): SubjectStatistics {
    return new SubjectStatistics(
      code,
      Number(stats[`${code}_excellent`] || 0),
      Number(stats[`${code}_good`] || 0),
      Number(stats[`${code}_average`] || 0),
      Number(stats[`${code}_poor`] || 0),
    );
  }
}

export class GroupAStudent {
  public readonly rank: number;
  public readonly sbd: string;
  public readonly mathScore: number;
  public readonly physicsScore: number;
  public readonly chemistryScore: number;
  public readonly totalScore: number;

  constructor(raw: any, index: number) {
    this.rank = index + 1;
    this.sbd = raw.sbd;
    this.mathScore = Number(raw.toan);
    this.physicsScore = Number(raw.vat_ly);
    this.chemistryScore = Number(raw.hoa_hoc);
    this.totalScore = Number(Number(raw.total).toFixed(2));
  }
}
