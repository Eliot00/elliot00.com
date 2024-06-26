const YANG = [
  '閼逢',
  '旃蒙',
  '柔兆',
  '強圉',
  '著雍',
  '屠維',
  '上章',
  '重光',
  '玄黓',
  '昭陽 ',
]
const YING = [
  '困敦',
  '赤奮若',
  '攝提格',
  '單閼',
  '執徐',
  '大荒落',
  '敦牂',
  '恊洽',
  '涒灘',
  '作噩',
  '閹茂',
  '大淵獻',
]

export function yearToTaiSui(year: number): string {
  return `${YANG[(year - 4) % 10]} ${YING[(year - 4) % 12]}`
}
