import { Team } from '../data/teams'
import { calculateAstrology, AstrologyResult } from './astrology'
import { calculateWuxing, WuxingResult } from './wuxing'
import { calculateTarot, TarotResult } from './tarot'
import { calculateNumerology, NumerologyResult } from './numerology'
import { generateDivinationId } from '../utils/random'

export interface CompositeResult {
  astrology: AstrologyResult
  wuxing: WuxingResult
  tarot: TarotResult
  numerology: NumerologyResult
  teamAFinalScore: number
  teamBFinalScore: number
  destinyIndex: number
  predictedScore: [number, number]
  predictedScores: [number, number][]
  verdict: string
}

const WEIGHTS = {
  astrology: 0.25,
  wuxing: 0.30,
  tarot: 0.25,
  numerology: 0.20,
}

function predictScore(indexA: number, indexB: number): [number, number] {
  const diff = indexA - indexB
  const total = Math.round((indexA + indexB) / 30)
  const clampedTotal = Math.max(1, Math.min(7, total))

  if (Math.abs(diff) < 5) {
    const half = Math.floor(clampedTotal / 2)
    return [half, half]
  }

  const winnerGoals = Math.min(5, Math.round(clampedTotal * 0.65))
  const loserGoals = Math.max(0, clampedTotal - winnerGoals)

  if (diff > 0) return [winnerGoals, loserGoals]
  return [loserGoals, winnerGoals]
}

function predictTop3Scores(indexA: number, indexB: number): [number, number][] {
  const primary = predictScore(indexA, indexB)
  const diff = indexA - indexB
  const total = Math.round((indexA + indexB) / 30)
  const clampedTotal = Math.max(1, Math.min(7, total))
  const results: [number, number][] = [primary]

  const seen = new Set(`${primary[0]}-${primary[1]}`)

  const tryAdd = (score: [number, number]) => {
    const key = `${score[0]}-${score[1]}`
    if (!seen.has(key) && score[0] >= 0 && score[1] >= 0 && score[0] <= 6 && score[1] <= 6) {
      seen.add(key)
      results.push(score)
    }
  }

  if (Math.abs(diff) < 5) {
    const half1 = Math.floor((clampedTotal + 1) / 2)
    const half2 = Math.ceil((clampedTotal + 1) / 2)
    tryAdd([half1, half2])
    tryAdd([half2, half1])
    if (clampedTotal > 1) {
      const h = Math.floor((clampedTotal - 1) / 2)
      tryAdd([h, h])
    }
    tryAdd([half1 + 1, half2])
    tryAdd([half1, half2 + 1])
  } else {
    const winnerIsA = diff > 0
    const wG = Math.min(5, Math.round(clampedTotal * 0.65))
    const lG = Math.max(0, clampedTotal - wG)

    if (wG > 0) tryAdd(winnerIsA ? [wG - 1, lG] : [lG, wG - 1])
    tryAdd(winnerIsA ? [wG + 1, lG] : [lG, wG + 1])
    if (lG > 0) tryAdd(winnerIsA ? [wG, lG - 1] : [lG - 1, wG])
    tryAdd(winnerIsA ? [wG, lG + 1] : [lG + 1, wG])
    if (clampedTotal > 1) {
      const w2 = Math.min(5, Math.round((clampedTotal - 1) * 0.65))
      const l2 = Math.max(0, (clampedTotal - 1) - w2)
      tryAdd(winnerIsA ? [w2, l2] : [l2, w2])
    }
  }

  return results.slice(0, 3)
}

export function calculateComposite(teamA: Team, teamB: Team, date?: string): CompositeResult {
  const seed = date || generateDivinationId()
  const astrology = calculateAstrology(teamA, teamB, seed)
  const wuxing = calculateWuxing(teamA, teamB, seed)
  const tarot = calculateTarot(teamA, teamB, seed)
  const numerology = calculateNumerology(teamA, teamB, seed)

  const teamAFinalScore = Math.round(
    astrology.teamAScore * WEIGHTS.astrology +
    wuxing.teamAScore * WEIGHTS.wuxing +
    tarot.teamAScore * WEIGHTS.tarot +
    numerology.teamAScore * WEIGHTS.numerology
  )

  const teamBFinalScore = Math.round(
    astrology.teamBScore * WEIGHTS.astrology +
    wuxing.teamBScore * WEIGHTS.wuxing +
    tarot.teamBScore * WEIGHTS.tarot +
    numerology.teamBScore * WEIGHTS.numerology
  )

  const destinyIndex = Math.abs(teamAFinalScore - teamBFinalScore)
  const predictedScore = predictScore(teamAFinalScore, teamBFinalScore)
  const predictedScores = predictTop3Scores(teamAFinalScore, teamBFinalScore)

  let verdict: string
  if (destinyIndex < 5) {
    verdict = '天命难分，势均力敌，平局之象！'
  } else if (destinyIndex < 15) {
    const winner = teamAFinalScore > teamBFinalScore ? teamA.name : teamB.name
    verdict = `${winner}略占天时，险胜之局！`
  } else if (destinyIndex < 30) {
    const winner = teamAFinalScore > teamBFinalScore ? teamA.name : teamB.name
    verdict = `${winner}天命所归，当取胜局！`
  } else {
    const winner = teamAFinalScore > teamBFinalScore ? teamA.name : teamB.name
    verdict = `${winner}星耀命旺，碾压之势！天命不可违！`
  }

  return {
    astrology,
    wuxing,
    tarot,
    numerology,
    teamAFinalScore,
    teamBFinalScore,
    destinyIndex,
    predictedScore,
    predictedScores,
    verdict,
  }
}
