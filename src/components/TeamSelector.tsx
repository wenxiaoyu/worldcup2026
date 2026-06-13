import { motion } from 'framer-motion'
import { Team } from '../data/teams'
import { Match, namesMatch, toBeijingDateTime, adjustDate } from '../services/matchData'

interface Props {
  teamA: Team | null
  teamB: Team | null
  nextMatch: Match | null
  selectedMatch: Match | null
  odds: { home: string; draw: string; away: string }
  onOddsChange: (field: 'home' | 'draw' | 'away', value: string) => void
  onPredict: () => void
  onGoToSchedule: () => void
}

export default function TeamSelector({ teamA, teamB, nextMatch, selectedMatch, odds, onOddsChange, onPredict, onGoToSchedule }: Props) {
  const isNextMatch = !!(nextMatch && teamA && teamB && (
    (namesMatch(teamA.nameEn, nextMatch.team1) && namesMatch(teamB.nameEn, nextMatch.team2)) ||
    (namesMatch(teamA.nameEn, nextMatch.team2) && namesMatch(teamB.nameEn, nextMatch.team1))
  ))

  if (!teamA || !teamB) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="text-4xl mb-4">🔮</div>
        <p className="text-gray-400 text-sm mb-4">前往赛程选择一场比赛，开启天机推演</p>
        <button
          onClick={onGoToSchedule}
          className="px-6 py-3 bg-gradient-to-r from-nebula-500 via-mystic-500 to-gold-500 rounded-lg text-white font-bold text-base hover:opacity-90 transition-opacity shadow-lg shadow-nebula-500/30 active:opacity-80"
        >
          查看赛程
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-3 md:space-y-8"
    >
      {selectedMatch && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="inline-block px-3 py-1 md:px-4 md:py-2 rounded-full bg-nebula-500/10 border border-nebula-500/30">
            <span className="text-[10px] md:text-xs text-nebula-300 mr-1 md:mr-2">{isNextMatch ? '下一场' : '比赛时间'}</span>
            <span className="text-xs md:text-sm text-white font-medium">{selectedMatch.round}</span>
            <span className="text-[10px] md:text-xs text-gray-400 ml-1 md:ml-2">{(() => {
              const bj = toBeijingDateTime(selectedMatch.time)
              return `${adjustDate(selectedMatch.date, bj.dateShift)} ${bj.time}`
            })()}</span>
          </div>
        </motion.div>
      )}

      <div className="flex gap-2 md:gap-6 items-stretch">
        <div className="flex-1 min-w-0">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="gradient-border rounded-lg md:rounded-xl p-2 md:p-4 text-center"
          >
            <div className="text-2xl md:text-4xl mb-0.5 md:mb-2">{teamA.flag}</div>
            <div className="text-sm md:text-lg font-bold truncate">{teamA.name}</div>
            <div className="text-[10px] md:text-xs text-gray-400 truncate">{teamA.nameEn} · {teamA.group}组</div>
          </motion.div>
        </div>

        <div className="flex items-center justify-center shrink-0">
          <div className="text-xl md:text-3xl text-gold-500 font-bold">VS</div>
        </div>

        <div className="flex-1 min-w-0">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="gradient-border rounded-lg md:rounded-xl p-2 md:p-4 text-center"
          >
            <div className="text-2xl md:text-4xl mb-0.5 md:mb-2">{teamB.flag}</div>
            <div className="text-sm md:text-lg font-bold truncate">{teamB.name}</div>
            <div className="text-[10px] md:text-xs text-gray-400 truncate">{teamB.nameEn} · {teamB.group}组</div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-cosmic-800/60 border border-cosmic-700/50 rounded-xl p-3 md:p-4"
      >
        <div className="text-[10px] md:text-xs text-gray-500 mb-2 text-center">盘口赔率（可选，辅助推演）</div>
        <div className="grid grid-cols-3 gap-2 md:gap-3">
          {[
            { field: 'home' as const, label: '主胜' },
            { field: 'draw' as const, label: '平局' },
            { field: 'away' as const, label: '客胜' },
          ].map(({ field, label }) => (
            <div key={field} className="text-center">
              <div className="text-[10px] text-gray-500 mb-1">{label}</div>
              <input
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                value={odds[field]}
                onChange={e => {
                  const v = e.target.value
                  if (v === '' || /^\d*\.?\d{0,2}$/.test(v)) {
                    onOddsChange(field, v)
                  }
                }}
                className="w-full bg-cosmic-900/60 border border-cosmic-600 rounded-lg px-2 py-1.5 md:py-2 text-center text-sm md:text-base font-medium text-white placeholder:text-gray-600 focus:outline-none focus:border-nebula-500/50 transition-colors"
              />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center pt-4 md:pt-6"
      >
        <button
          onClick={onPredict}
          className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-nebula-500 via-mystic-500 to-gold-500 rounded-lg md:rounded-xl text-white font-bold text-base md:text-lg hover:opacity-90 transition-opacity shadow-lg shadow-nebula-500/30 active:opacity-80"
        >
          🔮 开启天机推演
        </button>
        <p className="text-[10px] md:text-[11px] text-gray-400 mt-3 leading-relaxed max-w-sm mx-auto">
          推演结果纯属娱乐，仅供观赛参考，不构成任何投注建议。球赛存在大量随机因素，预测概率不等同于必然结果。
        </p>
      </motion.div>
    </motion.div>
  )
}
