import { Match, namesMatch } from './matchData'
import { Team, teams as localTeams, groups } from '../data/teams'

export interface TeamRow {
  team: string
  teamLocal: Team | null
  p: number
  w: number
  d: number
  l: number
  gf: number
  ga: number
  gd: number
  pts: number
}

export interface GroupStanding {
  group: string
  teams: TeamRow[]
}

function findLocal(jsonName: string): Team | null {
  return localTeams.find(t => namesMatch(t.nameEn, jsonName)) ?? null
}

function emptyRow(team: string): TeamRow {
  return { team, teamLocal: findLocal(team), p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 }
}

export function computeStandings(matches: Match[]): GroupStanding[] {
  const map = new Map<string, Map<string, TeamRow>>()

  for (const g of groups) {
    const groupTeams = localTeams.filter(t => t.group === g)
    const rows = new Map<string, TeamRow>()
    for (const t of groupTeams) {
      rows.set(t.nameEn, emptyRow(t.nameEn))
    }
    map.set(g, rows)
  }

  const groupMatches = matches.filter(m => m.group && m.score?.ft)

  for (const m of groupMatches) {
    const groupName = m.group!.replace('Group ', '')
    const rows = map.get(groupName)
    if (!rows) continue

    const [s1, s2] = m.score!.ft
    let t1Row: TeamRow | undefined
    let t2Row: TeamRow | undefined

    for (const [nameEn, row] of rows) {
      if (namesMatch(nameEn, m.team1)) t1Row = row
      if (namesMatch(nameEn, m.team2)) t2Row = row
    }

    if (!t1Row || !t2Row) continue

    t1Row.p++; t2Row.p++
    t1Row.gf += s1; t1Row.ga += s2
    t2Row.gf += s2; t2Row.ga += s1
    t1Row.gd = t1Row.gf - t1Row.ga
    t2Row.gd = t2Row.gf - t2Row.ga

    if (s1 > s2) { t1Row.w++; t2Row.l++; t1Row.pts += 3 }
    else if (s2 > s1) { t2Row.w++; t1Row.l++; t2Row.pts += 3 }
    else { t1Row.d++; t2Row.d++; t1Row.pts += 1; t2Row.pts += 1 }
  }

  const standings: GroupStanding[] = []
  for (const g of groups) {
    const rows = map.get(g)!
    const sorted = Array.from(rows.values()).sort((a, b) =>
      b.pts - a.pts || b.gd - a.gd || b.gf - a.gf
    )
    standings.push({ group: g, teams: sorted })
  }

  return standings
}
