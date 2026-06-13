import { Team } from '../data/teams'
import { WuxingElement, wuxingRelations, regionToWuxing, tianGan, diZhi, tianGanWuxing, trigramNames, trigramWuxing } from '../data/wuxing'
import { seededRandom, matchSeed } from '../utils/random'

export interface WuxingResult {
  teamAElement: WuxingElement
  teamBElement: WuxingElement
  relation: string
  teamATrigram: string
  teamBTrigram: string
  dayPillar: string
  teamAScore: number
  teamBScore: number
  description: string
}

function colorToElement(hex: string): WuxingElement {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  if (r > 200 && g < 100 && b < 100) return '火'
  if (r > 200 && g > 150 && b < 100) return '土'
  if (g > 150 && r < 100 && b < 100) return '木'
  if (b > 150 && r < 100 && g < 150) return '水'
  if (r > 200 && g > 200 && b > 200) return '金'
  if (r < 50 && g < 50 && b < 50) return '水'
  return '土'
}

function getTeamElement(team: Team): WuxingElement {
  const colorEl = colorToElement(team.primaryColor)
  const regionEl = regionToWuxing[team.confederation]
  const year = new Date(team.founded).getFullYear()
  const ganIndex = (year - 4) % 10
  const ganEl = tianGanWuxing[tianGan[ganIndex]]

  const elements: WuxingElement[] = [colorEl, regionEl, ganEl]
  const count: Record<WuxingElement, number> = { '金': 0, '木': 0, '水': 0, '火': 0, '土': 0 }
  elements.forEach(e => count[e]++)

  return (Object.entries(count) as [WuxingElement, number][])
    .sort((a, b) => b[1] - a[1])[0][0]
}

function getRelation(a: WuxingElement, b: WuxingElement): { type: string; scoreA: number; scoreB: number } {
  if (a === b) return { type: '比和（势均力敌）', scoreA: 0, scoreB: 0 }
  if (wuxingRelations[a].overcomes === b) return { type: `${a}克${b}（主场克制）`, scoreA: 20, scoreB: -10 }
  if (wuxingRelations[b].overcomes === a) return { type: `${b}克${a}（客场克制）`, scoreA: -10, scoreB: 20 }
  if (wuxingRelations[a].generates === b) return { type: `${a}生${b}（暗助对手）`, scoreA: -5, scoreB: 10 }
  if (wuxingRelations[b].generates === a) return { type: `${b}生${a}（对手助攻）`, scoreA: 10, scoreB: -5 }
  return { type: '平局', scoreA: 0, scoreB: 0 }
}

function getDayPillar(date: Date): { gan: string; zhi: string; element: WuxingElement } {
  const base = new Date(1900, 0, 1)
  const days = Math.floor((date.getTime() - base.getTime()) / 86400000)
  const ganIdx = (days + 9) % 10
  const zhiIdx = (days + 11) % 12
  return {
    gan: tianGan[ganIdx],
    zhi: diZhi[zhiIdx],
    element: tianGanWuxing[tianGan[ganIdx]],
  }
}

export function calculateWuxing(teamA: Team, teamB: Team, date?: string): WuxingResult {
  const rng = seededRandom(matchSeed(teamA.id, teamB.id, date))
  const matchDate = new Date()

  const elA = getTeamElement(teamA)
  const elB = getTeamElement(teamB)
  const relation = getRelation(elA, elB)
  const dayPillar = getDayPillar(matchDate)

  const trigramA = trigramNames[Math.floor(rng() * 8)]
  const trigramB = trigramNames[Math.floor(rng() * 8)]

  let baseA = 50 + relation.scoreA + (rng() * 20 - 10)
  let baseB = 50 + relation.scoreB + (rng() * 20 - 10)

  if (dayPillar.element === elA) baseA += 12
  if (dayPillar.element === elB) baseB += 12
  if (wuxingRelations[dayPillar.element].overcomes === elA) baseA -= 8
  if (wuxingRelations[dayPillar.element].overcomes === elB) baseB -= 8

  const trigramElA = trigramWuxing[trigramA]
  const trigramElB = trigramWuxing[trigramB]
  if (trigramElA === elA) baseA += 5
  if (trigramElB === elB) baseB += 5

  const teamAScore = Math.max(10, Math.min(100, Math.round(baseA)))
  const teamBScore = Math.max(10, Math.min(100, Math.round(baseB)))

  const description = `${teamA.name}五行属${elA}，得${trigramA}卦；${teamB.name}五行属${elB}，得${trigramB}卦。${relation.type}。今日${dayPillar.gan}${dayPillar.zhi}日，日主属${dayPillar.element}，${dayPillar.element === elA ? '利' + teamA.name : dayPillar.element === elB ? '利' + teamB.name : '无明显偏助'}。`

  return {
    teamAElement: elA,
    teamBElement: elB,
    relation: relation.type,
    teamATrigram: trigramA,
    teamBTrigram: trigramB,
    dayPillar: `${dayPillar.gan}${dayPillar.zhi}`,
    teamAScore,
    teamBScore,
    description,
  }
}
