export interface MatchGoal {
  name: string
  minute: string
  owngoal?: boolean
}

export interface MatchScore {
  ft: [number, number]
  ht?: [number, number]
}

export interface Match {
  round: string
  date: string
  time: string
  team1: string
  team2: string
  group?: string
  ground: string
  score?: MatchScore
  goals1?: MatchGoal[]
  goals2?: MatchGoal[]
  num?: number
}

interface WorldCupData {
  name: string
  matches: Match[]
}

const API_URL = 'https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json'

const nameAliases: Record<string, string[]> = {
  'USA': ['United States'],
  "Côte d'Ivoire": ['Ivory Coast', 'Cote d\'Ivoire'],
  'Curaçao': ['Curacao'],
  'DR Congo': ['Congo DR', 'Democratic Republic of the Congo'],
  'South Korea': ['Korea Republic', 'Korea Rep'],
  'Bosnia and Herzegovina': ['Bosnia-Herzegovina', 'Bosnia & Herzegovina'],
  'Czech Republic': ['Czechia'],
  'Iran': ['IR Iran'],
  'Tanzania': ['Tanzania'],
}

let cachedMatches: Match[] | null = null

export async function fetchWorldCupMatches(): Promise<Match[]> {
  if (cachedMatches) return cachedMatches
  try {
    const res = await fetch(API_URL)
    if (!res.ok) return []
    const data: WorldCupData = await res.json()
    cachedMatches = data.matches ?? []
    return cachedMatches
  } catch {
    return []
  }
}

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/[^\w\s]/g, '').trim()
}

export function namesMatch(localName: string, jsonName: string): boolean {
  const a = normalizeName(localName)
  const b = normalizeName(jsonName)
  if (a === b) return true
  const aliases = nameAliases[localName] ?? []
  return aliases.some(alias => normalizeName(alias) === b)
}

export function findMatch(teamANameEn: string, teamBNameEn: string, matches: Match[]): Match | null {
  return matches.find(m => {
    if (!m.score?.ft) return false
    const forward = namesMatch(teamANameEn, m.team1) && namesMatch(teamBNameEn, m.team2)
    const reverse = namesMatch(teamANameEn, m.team2) && namesMatch(teamBNameEn, m.team1)
    return forward || reverse
  }) ?? null
}

export function getMatchScoreForTeams(match: Match, teamANameEn: string): [number, number] | null {
  if (!match.score?.ft) return null
  const [s1, s2] = match.score.ft
  if (namesMatch(teamANameEn, match.team1)) return [s1, s2]
  return [s2, s1]
}

export function findNextMatch(matches: Match[]): Match | null {
  const now = new Date()
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  return matches
    .filter(m => !m.score?.ft && m.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))[0] ?? null
}

export function findLocalTeam(jsonTeamName: string, localTeams: { nameEn: string }[]): { nameEn: string } | null {
  return localTeams.find(t => namesMatch(t.nameEn, jsonTeamName)) ?? null
}

export function toBeijingTime(timeStr: string): string {
  const match = timeStr.match(/(\d{1,2}):(\d{2})\s*UTC([+-]\d{1,2})/)
  if (!match) return timeStr
  const hours = parseInt(match[1])
  const minutes = parseInt(match[2])
  const utcOffset = parseInt(match[3])
  const totalMinutes = hours * 60 + minutes - utcOffset * 60 + 8 * 60
  const bjHours = ((totalMinutes / 60) % 24 + 24) % 24
  const bjMinutes = totalMinutes % 60
  return `${String(Math.floor(bjHours)).padStart(2, '0')}:${String(Math.abs(bjMinutes)).padStart(2, '0')}`
}
