import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Match, namesMatch, toBeijingDateTime, adjustDate } from '../services/matchData'
import { teams as localTeams, groups } from '../data/teams'

interface Props {
  matches: Match[]
  onMatchClick?: (match: Match) => void
}

function findFlag(jsonName: string): string {
  const t = localTeams.find(lt => namesMatch(lt.nameEn, jsonName))
  return t?.flag ?? '🏳'
}

function findLocalName(jsonName: string): string {
  const t = localTeams.find(lt => namesMatch(lt.nameEn, jsonName))
  return t?.name ?? jsonName
}

function getGroupLabel(match: Match): string {
  return match.group?.replace('Group ', '') ?? ''
}

export default function ScheduleView({ matches, onMatchClick }: Props) {
  const [filterGroup, setFilterGroup] = useState<string>('all')

  const today = useMemo(() => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }, [])

  const enriched = useMemo(() =>
    matches.map(m => {
      const bj = toBeijingDateTime(m.time)
      return { match: m, bjTime: bj.time, bjDate: adjustDate(m.date, bj.dateShift) }
    }), [matches])

  const filtered = useMemo(() => {
    let list = enriched
    if (filterGroup !== 'all') {
      list = list.filter(e => getGroupLabel(e.match) === filterGroup)
    }
    return list.sort((a, b) => a.bjDate.localeCompare(b.bjDate) || a.bjTime.localeCompare(b.bjTime))
  }, [enriched, filterGroup])

  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>()
    for (const e of filtered) {
      const arr = map.get(e.bjDate) ?? []
      arr.push(e)
      map.set(e.bjDate, arr)
    }
    return Array.from(map.entries())
  }, [filtered])

  const nextMatchDate = useMemo(() => {
    const upcoming = filtered
      .filter(e => !e.match.score?.ft)
      .map(e => e.bjDate)
      .sort()
    return upcoming[0] ?? null
  }, [filtered])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-3"
    >
      <div className="flex gap-1.5 overflow-x-auto pb-2 -mx-3 px-3 scrollbar-none">
        <button
          onClick={() => setFilterGroup('all')}
          className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            filterGroup === 'all' ? 'bg-gold-500/20 text-gold-400 border border-gold-500/40' : 'bg-cosmic-800 text-gray-400 border border-cosmic-600'
          }`}
        >
          全部
        </button>
        {groups.map(g => (
          <button
            key={g}
            onClick={() => setFilterGroup(g)}
            className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              filterGroup === g ? 'bg-gold-500/20 text-gold-400 border border-gold-500/40' : 'bg-cosmic-800 text-gray-400 border border-cosmic-600'
            }`}
          >
            {g}组
          </button>
        ))}
      </div>

      {grouped.map(([date, dayEntries]) => (
        <div key={date}>
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`text-xs font-medium ${date === nextMatchDate ? 'text-gold-400' : 'text-gray-500'}`}>
              {date}{date === today ? ' 今天' : date === nextMatchDate ? ' 下一轮' : ''}
            </span>
            <div className="flex-1 h-px bg-cosmic-700" />
          </div>
          <div className="space-y-1">
            {dayEntries.map(({ match: m, bjTime }, i) => {
              const hasScore = !!m.score?.ft
              const isLive = date === nextMatchDate && !hasScore
              const clickable = !hasScore && onMatchClick
              return (
                <div
                  key={i}
                  onClick={clickable ? () => onMatchClick!(m) : undefined}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isLive ? 'bg-gold-500/5 border border-gold-500/20' : 'bg-cosmic-800/50 border border-cosmic-700/50'
                  } ${clickable ? 'cursor-pointer active:bg-cosmic-700/60 hover:border-nebula-500/30' : ''}`}
                >
                  <div className="w-12 shrink-0 text-center">
                    <div className="text-[10px] text-gray-500">{bjTime}</div>
                  </div>
                  <div className="flex-1 min-w-0 flex items-center gap-1.5">
                    <span className="text-base">{findFlag(m.team1)}</span>
                    <span className="text-sm truncate">{findLocalName(m.team1)}</span>
                  </div>
                  <div className="shrink-0">
                    {hasScore ? (
                      <div className="px-2 py-0.5 bg-emerald-500/15 rounded text-sm font-bold text-emerald-400">
                        {m.score!.ft[0]} - {m.score!.ft[1]}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-600">vs</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 flex items-center gap-1.5 justify-end">
                    <span className="text-sm truncate text-right">{findLocalName(m.team2)}</span>
                    <span className="text-base">{findFlag(m.team2)}</span>
                  </div>
                  {m.group && (
                    <span className="shrink-0 text-[10px] text-gray-600 w-6 text-center">{getGroupLabel(m)}</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-8 text-sm">暂无赛程数据</p>
      )}
    </motion.div>
  )
}
