import { Team } from '../data/teams'
import { calculateAstrology, AstrologyResult } from './astrology'
import { calculateWuxing, WuxingResult } from './wuxing'
import { calculateTarot, TarotResult } from './tarot'
import { calculateNumerology, NumerologyResult } from './numerology'
import { generateDivinationId, seededRandom } from '../utils/random'

export interface Odds {
  home: number
  draw: number
  away: number
}

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
  userOdds?: Odds
}

const WEIGHTS = {
  astrology: 0.25,
  wuxing: 0.30,
  tarot: 0.25,
  numerology: 0.20,
}

function computeProbabilities(indexA: number, indexB: number, odds?: Odds) {
  const total = indexA + indexB
  const rawA = indexA / total
  const rawB = indexB / total
  const diff = Math.abs(rawA - rawB)
  const drawProb = Math.max(0.12, 0.32 - diff * 0.8)
  const remaining = 1 - drawProb
  let probA = rawA / (rawA + rawB) * remaining
  let probB = rawB / (rawA + rawB) * remaining
  let probDraw = drawProb

  if (odds) {
    const invH = 1 / odds.home
    const invD = 1 / odds.draw
    const invA = 1 / odds.away
    const invSum = invH + invD + invA
    probA = 0.5 * probA + 0.5 * (invH / invSum)
    probB = 0.5 * probB + 0.5 * (invA / invSum)
    probDraw = 0.5 * probDraw + 0.5 * (invD / invSum)
  }

  return { probA, probB, probDraw }
}

function generateScoreFromOutcome(outcome: 'A' | 'draw' | 'B', rng: () => number): [number, number] {
  const r = rng()
  const total = r < 0.15 ? 1 : r < 0.35 ? 2 : r < 0.6 ? 3 : r < 0.8 ? 4 : r < 0.93 ? 5 : 6

  if (outcome === 'draw') {
    const half = Math.floor(total / 2)
    return [half, half]
  }

  const winnerGoals = Math.min(5, Math.round(total * (0.55 + rng() * 0.2)))
  const loserGoals = Math.max(0, total - winnerGoals)
  return outcome === 'A' ? [winnerGoals, loserGoals] : [loserGoals, winnerGoals]
}

function predictOutcome(probA: number, probB: number, probDraw: number): 'A' | 'draw' | 'B' {
  if (probA >= probB && probA >= probDraw) return 'A'
  if (probB >= probA && probB >= probDraw) return 'B'
  return 'draw'
}

function predictScore(indexA: number, indexB: number, odds?: Odds): [number, number] {
  const { probA, probB, probDraw } = computeProbabilities(indexA, indexB, odds)
  const outcome = predictOutcome(probA, probB, probDraw)
  const rng = seededRandom(`primary:${indexA}:${indexB}`)
  return generateScoreFromOutcome(outcome, rng)
}

function predictTop3Scores(indexA: number, indexB: number, seed: string, odds?: Odds): [number, number][] {
  const { probA, probDraw } = computeProbabilities(indexA, indexB, odds)
  const results: [number, number][] = []
  const seen = new Set<string>()

  for (let i = 0; i < 3; i++) {
    const rng = seededRandom(`${seed}:div${i}`)
    const r = rng()
    const outcome: 'A' | 'draw' | 'B' =
      r < probA ? 'A' : r < probA + probDraw ? 'draw' : 'B'

    for (let attempt = 0; attempt < 10; attempt++) {
      const score = generateScoreFromOutcome(outcome, rng)
      const key = `${score[0]}-${score[1]}`
      if (!seen.has(key)) {
        seen.add(key)
        results.push(score)
        break
      }
    }
  }

  return results
}

export function calculateComposite(teamA: Team, teamB: Team, matchTime?: string, odds?: Odds): CompositeResult {
  const divinationId = generateDivinationId()
  const seed = matchTime ? `${matchTime}:${divinationId}` : divinationId
  const astrology = calculateAstrology(teamA, teamB, seed)
  const wuxing = calculateWuxing(teamA, teamB, seed)
  const tarot = calculateTarot(teamA, teamB, seed)
  const numerology = calculateNumerology(teamA, teamB, seed)

  let teamAFinalScore = Math.round(
    astrology.teamAScore * WEIGHTS.astrology +
    wuxing.teamAScore * WEIGHTS.wuxing +
    tarot.teamAScore * WEIGHTS.tarot +
    numerology.teamAScore * WEIGHTS.numerology
  )

  let teamBFinalScore = Math.round(
    astrology.teamBScore * WEIGHTS.astrology +
    wuxing.teamBScore * WEIGHTS.wuxing +
    tarot.teamBScore * WEIGHTS.tarot +
    numerology.teamBScore * WEIGHTS.numerology
  )

  const rankGap = Math.abs(teamA.fifaRanking - teamB.fifaRanking)
  if (rankGap > 5) {
    if (rankGap > 20) {
      const betterIsA = teamA.fifaRanking < teamB.fifaRanking
      const factor = Math.min(0.8, rankGap / 100)
      const fifaA = betterIsA ? 70 : 30
      const fifaB = betterIsA ? 30 : 70
      teamAFinalScore = Math.round(teamAFinalScore * (1 - factor) + fifaA * factor)
      teamBFinalScore = Math.round(teamBFinalScore * (1 - factor) + fifaB * factor)
    } else {
      const boost = Math.round((rankGap - 5) * 0.8)
      if (teamA.fifaRanking < teamB.fifaRanking) {
        teamAFinalScore += boost
        teamBFinalScore -= boost
      } else {
        teamBFinalScore += boost
        teamAFinalScore -= boost
      }
    }
    teamAFinalScore = Math.max(10, Math.min(100, teamAFinalScore))
    teamBFinalScore = Math.max(10, Math.min(100, teamBFinalScore))
  }

  if (odds) {
    const total = teamAFinalScore + teamBFinalScore
    const rawA = teamAFinalScore / total
    const rawB = teamBFinalScore / total
    const diff = Math.abs(rawA - rawB)
    const drawProb = Math.max(0.12, 0.32 - diff * 0.8)
    const remaining = 1 - drawProb
    const mysticProbA = rawA / (rawA + rawB) * remaining
    const mysticProbB = rawB / (rawA + rawB) * remaining

    const invH = 1 / odds.home
    const invD = 1 / odds.draw
    const invA = 1 / odds.away
    const invSum = invH + invD + invA
    const oddsProbA = invH / invSum
    const oddsProbB = invA / invSum
    const oddsProbDraw = invD / invSum

    const blendedA = 0.5 * mysticProbA + 0.5 * oddsProbA
    const blendedB = 0.5 * mysticProbB + 0.5 * oddsProbB
    const blendedDraw = 0.5 * drawProb + 0.5 * oddsProbDraw

    const s = teamAFinalScore + teamBFinalScore
    const mysticFavorA = teamAFinalScore > teamBFinalScore
    const oddsFavorA = oddsProbA > oddsProbB

    if (oddsFavorA !== mysticFavorA) {
      teamAFinalScore = oddsFavorA ? Math.round(s * 0.58) : Math.round(s * 0.42)
      teamBFinalScore = s - teamAFinalScore
    }

    const currentSpread = Math.abs(teamAFinalScore - teamBFinalScore)
    const maxProb = Math.max(blendedA, blendedB)

    if (blendedDraw > maxProb) {
      const factor = Math.max(0, 1 - (blendedDraw - maxProb) * 4)
      const newSpread = Math.max(2, Math.round(currentSpread * factor))
      if (teamAFinalScore >= teamBFinalScore) {
        teamAFinalScore = Math.round((s + newSpread) / 2)
        teamBFinalScore = s - teamAFinalScore
      } else {
        teamBFinalScore = Math.round((s + newSpread) / 2)
        teamAFinalScore = s - teamBFinalScore
      }
    } else {
      const winnerMargin = maxProb - Math.min(blendedA, blendedB)
      const targetSpread = Math.round(6 + winnerMargin * 30)
      const newSpread = Math.max(6, Math.round(currentSpread * 0.3 + targetSpread * 0.7))
      if (teamAFinalScore >= teamBFinalScore) {
        teamAFinalScore = Math.round((s + newSpread) / 2)
        teamBFinalScore = s - teamAFinalScore
      } else {
        teamBFinalScore = Math.round((s + newSpread) / 2)
        teamAFinalScore = s - teamBFinalScore
      }
    }

    teamAFinalScore = Math.max(10, Math.min(100, teamAFinalScore))
    teamBFinalScore = Math.max(10, Math.min(100, teamBFinalScore))
  }

  const destinyIndex = Math.abs(teamAFinalScore - teamBFinalScore)
  const predictedScore = predictScore(teamAFinalScore, teamBFinalScore, odds)
  const predictedScores = predictTop3Scores(teamAFinalScore, teamBFinalScore, seed, odds)

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
    userOdds: odds,
  }
}
