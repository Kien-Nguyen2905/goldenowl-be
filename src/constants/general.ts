export const SUBJECT_KEYS = [
  'toan',
  'ngu_van',
  'ngoai_ngu',
  'vat_ly',
  'hoa_hoc',
  'sinh_hoc',
  'lich_su',
  'dia_ly',
  'gdcd',
] as const;

export const GRADE_LEVELS = {
  EXCELLENT: {
    cond: 8,
    label: 'excellent' as const,
  },
  GOOD: {
    cond: 6,
    label: 'good' as const,
  },
  AVERAGE: {
    cond: 4,
    label: 'average' as const,
  },
  POOR: {
    cond: 0,
    label: 'poor' as const,
  },
} as const;

export type GradeLevel =
  (typeof GRADE_LEVELS)[keyof typeof GRADE_LEVELS]['label'];
