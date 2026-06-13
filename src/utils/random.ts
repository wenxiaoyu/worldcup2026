export function seededRandom(seed: string): () => number {
  let h = 0
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0
  }
  return () => {
    h = Math.imul(h ^ (h >>> 15), h | 1)
    h ^= h + Math.imul(h ^ (h >>> 7), h | 61)
    h = h ^ (h >>> 14)
    return ((h >>> 0) / 4294967296)
  }
}

export function todaySeed(): string {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

export function matchSeed(teamA: string, teamB: string, date?: string): string {
  const d = date || todaySeed()
  return `${d}:${teamA}:${teamB}`
}
