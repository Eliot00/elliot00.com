const ZHI = '子丑寅卯辰巳午未申酉戌亥'

export function yearToDiZhi(year: number): string {
  return ZHI[(year - 4) % 12]
}
