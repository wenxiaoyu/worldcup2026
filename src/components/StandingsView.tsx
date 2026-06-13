import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Match } from '../services/matchData'
import { computeStandings, GroupStanding } from '../services/standings'

interface Props {
  matches: Match[]
}

function GroupTable({ standing }: { standing: GroupStanding }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-cosmic-800/50 rounded-xl border border-cosmic-700/50 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-3 py-2 hover:bg-cosmic-700/30 transition-colors"
      >
        <span className="text-sm font-bold text-gold-400">{standing.group}组</span>
        <span className="text-xs text-gray-500">{expanded ? '收起' : '展开'}</span>
      </button>
      {(expanded || true) && (
        <div className="overflow-x-auto">
          <table className="w-full text-xs md:text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-cosmic-700/50">
                <th className="py-1.5 px-2 text-left w-6">#</th>
                <th className="py-1.5 px-2 text-left">球队</th>
                <th className="py-1.5 px-1 text-center">场</th>
                <th className="py-1.5 px-1 text-center">胜</th>
                <th className="py-1.5 px-1 text-center">平</th>
                <th className="py-1.5 px-1 text-center">负</th>
                <th className="py-1.5 px-1 text-center hidden md:table-cell">进</th>
                <th className="py-1.5 px-1 text-center hidden md:table-cell">失</th>
                <th className="py-1.5 px-1 text-center">净</th>
                <th className="py-1.5 px-1 text-center font-bold">分</th>
              </tr>
            </thead>
            <tbody>
              {standing.teams.map((t, i) => (
                <tr
                  key={t.team}
                  className={`border-b border-cosmic-700/20 ${
                    i < 2 ? 'bg-emerald-500/5' : ''
                  }`}
                >
                  <td className="py-1.5 px-2 text-gray-500">{i + 1}</td>
                  <td className="py-1.5 px-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">{t.teamLocal?.flag ?? '🏳'}</span>
                      <span className={`truncate max-w-[80px] md:max-w-none ${i < 2 ? 'text-white font-medium' : 'text-gray-300'}`}>
                        {t.teamLocal?.name ?? t.team}
                      </span>
                    </div>
                  </td>
                  <td className="py-1.5 px-1 text-center text-gray-400">{t.p}</td>
                  <td className="py-1.5 px-1 text-center text-gray-400">{t.w}</td>
                  <td className="py-1.5 px-1 text-center text-gray-400">{t.d}</td>
                  <td className="py-1.5 px-1 text-center text-gray-400">{t.l}</td>
                  <td className="py-1.5 px-1 text-center text-gray-400 hidden md:table-cell">{t.gf}</td>
                  <td className="py-1.5 px-1 text-center text-gray-400 hidden md:table-cell">{t.ga}</td>
                  <td className={`py-1.5 px-1 text-center ${t.gd > 0 ? 'text-emerald-400' : t.gd < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                    {t.gd > 0 ? `+${t.gd}` : t.gd}
                  </td>
                  <td className="py-1.5 px-1 text-center font-bold text-gold-400">{t.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default function StandingsView({ matches }: Props) {
  const standings = useMemo(() => computeStandings(matches), [matches])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm md:text-base font-bold text-gold-400">小组积分榜</h2>
        <span className="text-[10px] md:text-xs text-gray-500">前两名晋级</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {standings.map(s => (
          <GroupTable key={s.group} standing={s} />
        ))}
      </div>
    </motion.div>
  )
}
