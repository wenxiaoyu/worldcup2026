export type WuxingElement = '金' | '木' | '水' | '火' | '土'

export interface WuxingRelation {
  generates: WuxingElement  // 我生
  overcomes: WuxingElement  // 我克
  generatedBy: WuxingElement // 生我
  overcomedBy: WuxingElement // 克我
}

export const wuxingRelations: Record<WuxingElement, WuxingRelation> = {
  '金': { generates: '水', overcomes: '木', generatedBy: '土', overcomedBy: '火' },
  '木': { generates: '火', overcomes: '土', generatedBy: '水', overcomedBy: '金' },
  '水': { generates: '木', overcomes: '火', generatedBy: '金', overcomedBy: '土' },
  '火': { generates: '土', overcomes: '金', generatedBy: '木', overcomedBy: '水' },
  '土': { generates: '金', overcomes: '水', generatedBy: '火', overcomedBy: '木' },
}

export const colorToWuxing: Record<string, WuxingElement> = {
  red: '火',
  orange: '火',
  yellow: '土',
  green: '木',
  blue: '水',
  purple: '火',
  white: '金',
  black: '水',
  gold: '金',
}

export const regionToWuxing: Record<string, WuxingElement> = {
  'UEFA': '金',
  'CONMEBOL': '火',
  'CONCACAF': '土',
  'AFC': '水',
  'CAF': '木',
  'OFC': '水',
}

export const tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] as const
export const diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'] as const

export const tianGanWuxing: Record<string, WuxingElement> = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水',
}

export const trigramNames = ['乾', '坤', '震', '巽', '坎', '离', '艮', '兑'] as const
export type Trigram = typeof trigramNames[number]

export const trigramWuxing: Record<Trigram, WuxingElement> = {
  '乾': '金', '兑': '金',
  '震': '木', '巽': '木',
  '坎': '水',
  '离': '火',
  '艮': '土', '坤': '土',
}
