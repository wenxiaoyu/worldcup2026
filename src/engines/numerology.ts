import { Team } from '../data/teams'
import { seededRandom, matchSeed } from '../utils/random'

export interface NumerologyResult {
  teamANumber: number
  teamBNumber: number
  teamAEnergy: string
  teamBEnergy: string
  dateEnergy: number
  teamAScore: number
  teamBScore: number
  description: string
}

function reduceToSingle(n: number): number {
  while (n > 9 && n !== 11 && n !== 22) {
    n = String(n).split('').reduce((s, d) => s + parseInt(d), 0)
  }
  return n
}

function getNameNumber(name: string): number {
  const sum = name.split('').reduce((s, c) => {
    const code = c.charCodeAt(0)
    return s + (code % 9) + 1
  }, 0)
  return reduceToSingle(sum)
}

function getDateEnergy(date: Date): number {
  const digits = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`
  return reduceToSingle(digits.split('').reduce((s, d) => s + parseInt(d), 0))
}

const numberMeanings: Record<number, string> = {
  1: '领袖之数，开创力强',
  2: '合作之数，平衡稳定',
  3: '创造之数，进攻华丽',
  4: '稳固之数，防守坚实',
  5: '变化之数，灵活多变',
  6: '和谐之数，团队默契',
  7: '神秘之数，暗藏玄机',
  8: '权力之数，统治力强',
  9: '完成之数，大器晚成',
  11: '大师之数，天赋异禀',
  22: '建筑师之数，架构大师',
}

export function calculateNumerology(teamA: Team, teamB: Team, date?: string): NumerologyResult {
  const rng = seededRandom(matchSeed(teamA.id, teamB.id, date))
  const matchDate = date ? new Date(date) : new Date()

  const numA = getNameNumber(teamA.nameEn)
  const numB = getNameNumber(teamB.nameEn)
  const dateNum = getDateEnergy(matchDate)

  let baseA = 50
  let baseB = 50

  // number compatibility with date
  if (numA === dateNum) baseA += 15
  if (numB === dateNum) baseB += 15
  if (Math.abs(numA - dateNum) === 1) baseA += 8
  if (Math.abs(numB - dateNum) === 1) baseB += 8

  // master numbers bonus
  if (numA === 11 || numA === 22) baseA += 10
  if (numB === 11 || numB === 22) baseB += 10

  // odd numbers = attack, even = defense
  if (numA % 2 === 1) baseA += rng() * 12
  else baseA += rng() * 8

  if (numB % 2 === 1) baseB += rng() * 12
  else baseB += rng() * 8

  baseA += rng() * 10 - 5
  baseB += rng() * 10 - 5

  const teamAScore = Math.max(10, Math.min(100, Math.round(baseA)))
  const teamBScore = Math.max(10, Math.min(100, Math.round(baseB)))

  const energyA = numberMeanings[numA] || '普通之数'
  const energyB = numberMeanings[numB] || '普通之数'

  const description = `${teamA.name}命理数为${numA}（${energyA}），${teamB.name}命理数为${numB}（${energyB}）。今日能量数为${dateNum}，${dateNum === numA ? '与' + teamA.name + '共振' : dateNum === numB ? '与' + teamB.name + '共振' : '双方皆需自寻能量'}。`

  return {
    teamANumber: numA,
    teamBNumber: numB,
    teamAEnergy: energyA,
    teamBEnergy: energyB,
    dateEnergy: dateNum,
    teamAScore,
    teamBScore,
    description,
  }
}
