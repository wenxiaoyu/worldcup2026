import { Team } from '../data/teams'
import { majorArcana, TarotCard } from '../data/tarot'
import { seededRandom, matchSeed } from '../utils/random'

export interface DrawnCard {
  card: TarotCard
  isUpright: boolean
  position: '过去' | '现在' | '未来'
}

export interface TarotResult {
  cards: [DrawnCard, DrawnCard, DrawnCard]
  teamAScore: number
  teamBScore: number
  description: string
}

export function calculateTarot(teamA: Team, teamB: Team, date?: string): TarotResult {
  const rng = seededRandom(matchSeed(teamA.id, teamB.id, date))

  const shuffled = [...majorArcana].sort(() => rng() - 0.5)
  const positions: Array<'过去' | '现在' | '未来'> = ['过去', '现在', '未来']

  const cards = positions.map((pos, i) => ({
    card: shuffled[i],
    isUpright: rng() > 0.4,
    position: pos,
  })) as [DrawnCard, DrawnCard, DrawnCard]

  let teamAInfluence = 0
  let teamBInfluence = 0

  cards.forEach((drawn, i) => {
    const weight = i === 2 ? 1.5 : i === 1 ? 1.2 : 0.8 // future matters most
    const baseScore = drawn.card.score * weight
    const score = drawn.isUpright ? baseScore : -baseScore * 0.6

    if (rng() > 0.5) {
      teamAInfluence += score
    } else {
      teamBInfluence += score
    }
  })

  const teamAScore = Math.max(10, Math.min(100, Math.round(50 + teamAInfluence * 3)))
  const teamBScore = Math.max(10, Math.min(100, Math.round(50 + teamBInfluence * 3)))

  const cardDescs = cards.map(c => {
    const orient = c.isUpright ? '正位' : '逆位'
    const meaning = c.isUpright ? c.card.upright : c.card.reversed
    return `【${c.position}】${c.card.name}（${orient}）—— ${meaning}`
  })

  const description = `塔罗三牌阵揭示：\n${cardDescs.join('\n')}`

  return { cards, teamAScore, teamBScore, description }
}
