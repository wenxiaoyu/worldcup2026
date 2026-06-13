import { Team } from '../data/teams'
import { seededRandom, matchSeed } from '../utils/random'

export interface AstrologyResult {
  teamAZodiac: string
  teamBZodiac: string
  phase: string
  planetInfluence: string
  teamAScore: number
  teamBScore: number
  description: string
}

const zodiacSigns = [
  { name: '白羊座', element: '火', start: [3, 21], end: [4, 19] },
  { name: '金牛座', element: '土', start: [4, 20], end: [5, 20] },
  { name: '双子座', element: '风', start: [5, 21], end: [6, 21] },
  { name: '巨蟹座', element: '水', start: [6, 22], end: [7, 22] },
  { name: '狮子座', element: '火', start: [7, 23], end: [8, 22] },
  { name: '处女座', element: '土', start: [8, 23], end: [9, 22] },
  { name: '天秤座', element: '风', start: [9, 23], end: [10, 23] },
  { name: '天蝎座', element: '水', start: [10, 24], end: [11, 22] },
  { name: '射手座', element: '火', start: [11, 23], end: [12, 21] },
  { name: '摩羯座', element: '土', start: [12, 22], end: [1, 19] },
  { name: '水瓶座', element: '风', start: [1, 20], end: [2, 18] },
  { name: '双鱼座', element: '水', start: [2, 19], end: [3, 20] },
]

function getZodiac(dateStr: string): typeof zodiacSigns[0] {
  const d = new Date(dateStr)
  const month = d.getMonth() + 1
  const day = d.getDate()

  for (const sign of zodiacSigns) {
    if (sign.start[0] === sign.end[0]) {
      if (month === sign.start[0] && day >= sign.start[1] && day <= sign.end[1]) return sign
    } else if (sign.start[0] > sign.end[0]) {
      if ((month === sign.start[0] && day >= sign.start[1]) || (month === sign.end[0] && day <= sign.end[1])) return sign
    } else {
      if ((month === sign.start[0] && day >= sign.start[1]) || (month === sign.end[0] && day <= sign.end[1])) return sign
    }
  }
  return zodiacSigns[0]
}

function getPhaseRelation(indexA: number, indexB: number): { type: string; bonus: number } {
  const diff = Math.abs(indexA - indexB)
  const normalized = Math.min(diff, 12 - diff)

  if (normalized === 4) return { type: '三合（大吉）', bonus: 20 }
  if (normalized === 2) return { type: '六合（吉）', bonus: 10 }
  if (normalized === 6) return { type: '对冲（凶）', bonus: -15 }
  if (normalized === 3) return { type: '刑克（小凶）', bonus: -8 }
  return { type: '平相', bonus: 0 }
}

const planets = ['火星主宰', '金星庇佑', '木星加持', '水星指引', '土星压制', '太阳照耀', '月亮守护']

export function calculateAstrology(teamA: Team, teamB: Team, date?: string): AstrologyResult {
  const rng = seededRandom(matchSeed(teamA.id, teamB.id, date))

  const zodiacA = getZodiac(teamA.founded)
  const zodiacB = getZodiac(teamB.founded)
  const indexA = zodiacSigns.indexOf(zodiacA)
  const indexB = zodiacSigns.indexOf(zodiacB)

  const phase = getPhaseRelation(indexA, indexB)
  const planet = planets[Math.floor(rng() * planets.length)]

  let baseA = 50 + (rng() * 30 - 15)
  let baseB = 50 + (rng() * 30 - 15)

  baseA += phase.bonus
  baseB -= phase.bonus

  const planetBonus = rng() * 15
  if (rng() > 0.5) {
    baseA += planetBonus
  } else {
    baseB += planetBonus
  }

  const teamAScore = Math.max(10, Math.min(100, Math.round(baseA)))
  const teamBScore = Math.max(10, Math.min(100, Math.round(baseB)))

  const stronger = teamAScore > teamBScore ? teamA.name : teamB.name
  const description = `${teamA.name}属${zodiacA.name}（${zodiacA.element}象），${teamB.name}属${zodiacB.name}（${zodiacB.element}象）。双方呈${phase.type}之相，今日${planet}，${stronger}星象更旺。`

  return {
    teamAZodiac: zodiacA.name,
    teamBZodiac: zodiacB.name,
    phase: phase.type,
    planetInfluence: planet,
    teamAScore,
    teamBScore,
    description,
  }
}
