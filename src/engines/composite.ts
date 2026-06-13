import { Team } from '../data/teams'
import { calculateAstrology, AstrologyResult } from './astrology'
import { calculateWuxing, WuxingResult } from './wuxing'
import { calculateTarot, TarotResult } from './tarot'
import { calculateNumerology, NumerologyResult } from './numerology'

export interface CompositeResult {
  astrology: AstrologyResult
  wuxing: WuxingResult
  tarot: TarotResult
  numerology: NumerologyResult
  teamAFinalScore: number
  teamBFinalScore: number
  destinyIndex: number
  predictedScore: [number, number]
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

export function calculateComposite(teamA: Team, teamB: Team, date?: string): CompositeResult {
  const astrology = calculateAstrology(teamA, teamB, date)
  const wuxing = calculateWuxing(teamA, teamB, date)
  const tarot = calculateTarot(teamA, teamB, date)
  const numerology = calculateNumerology(teamA, teamB, date)

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
    verdict,
  }
}
