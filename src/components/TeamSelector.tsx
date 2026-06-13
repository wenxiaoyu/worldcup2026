import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Team } from '../data/teams'
import { Match, namesMatch } from '../services/matchData'

interface Props {
  teams: Team[]
  teamA: Team | null
  teamB: Team | null
  nextMatch: Match | null
  onSelectA: (team: Team) => void
  onSelectB: (team: Team) => void
  onPredict: () => void
}

function TeamPicker({ label, selected, teams, onSelect, excludeId }: {
  label: string
  selected: Team | null
  teams: Team[]
  onSelect: (team: Team) => void
  excludeId?: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  const grouped = teams.filter(t => t.id !== excludeId).reduce<Record<string, Team[]>>((acc, t) => {
    (acc[t.group] ||= []).push(t)
    return acc
  }, {})

  return (
    <div className="flex-1 min-w-0">
      <label className="block text-xs md:text-sm text-nebula-300 mb-1 md:mb-2">{label}</label>
      {selected ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="gradient-border rounded-lg md:rounded-xl p-2 md:p-4 text-center cursor-pointer hover:opacity-80 active:opacity-70"
          onClick={() => { onSelect(null as unknown as Team); setIsOpen(true) }}
        >
          <div className="text-2xl md:text-4xl mb-0.5 md:mb-2">{selected.flag}</div>
          <div className="text-sm md:text-lg font-bold truncate">{selected.name}</div>
          <div className="text-[10px] md:text-xs text-gray-400 truncate">{selected.nameEn} · {selected.group}组</div>
        </motion.div>
      ) : (
        <>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-full bg-cosmic-800 border border-cosmic-600 rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base text-gray-400 text-left focus:outline-none focus:border-nebula-500"
          >
            点击选择球队...
          </button>
          <AnimatePresence>
            {isOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 z-40"
                  onClick={() => setIsOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="fixed bottom-0 left-0 right-0 z-50 bg-cosmic-800 rounded-t-2xl max-h-[70vh] flex flex-col md:bottom-auto md:top-1/2 md:left-1/2 md:right-auto md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:max-h-[70vh] md:w-96 md:max-w-[90vw]"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-cosmic-600">
                    <span className="text-sm text-nebula-300 font-medium">{label}</span>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="text-gray-500 hover:text-white text-xl leading-none px-2"
                    >
                      ×
                    </button>
                  </div>
                  <div className="overflow-y-auto flex-1">
                    {Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([group, groupTeams]) => (
                      <div key={group}>
                        <div className="px-4 py-2 text-xs text-mystic-400 bg-cosmic-900/80 sticky top-0 font-medium">{group}组</div>
                        {groupTeams.map(team => (
                          <div
                            key={team.id}
                            onClick={() => { onSelect(team); setIsOpen(false) }}
                            className="px-4 py-3 hover:bg-cosmic-700 cursor-pointer flex items-center gap-3 active:bg-cosmic-600"
                          >
                            <span className="text-2xl">{team.flag}</span>
                            <span className="text-base">{team.name}</span>
                            <span className="text-xs text-gray-500 ml-auto">{team.nameEn}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  )
}

export default function TeamSelector({ teams, teamA, teamB, nextMatch, onSelectA, onSelectB, onPredict }: Props) {
  const isNextMatch = !!(nextMatch && teamA && teamB && (
    (namesMatch(teamA.nameEn, nextMatch.team1) && namesMatch(teamB.nameEn, nextMatch.team2)) ||
    (namesMatch(teamA.nameEn, nextMatch.team2) && namesMatch(teamB.nameEn, nextMatch.team1))
  ))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-3 md:space-y-8"
    >
      <div className="text-center mb-3 md:mb-8">
        <h2 className="text-lg md:text-2xl font-bold text-gold-400 mb-0.5 md:mb-2">选择对阵双方</h2>
        <p className="text-gray-400 text-xs md:text-sm">选定两支球队，诚心一拜，开启天机</p>
      </div>

      {isNextMatch && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="inline-block px-3 py-1 md:px-4 md:py-2 rounded-full bg-nebula-500/10 border border-nebula-500/30">
            <span className="text-[10px] md:text-xs text-nebula-300">下一场</span>
            <span className="text-xs md:text-sm text-white font-medium mx-1 md:mx-2">{nextMatch.round}</span>
            <span className="text-[10px] md:text-xs text-gray-400">{nextMatch.date} {nextMatch.time}</span>
          </div>
        </motion.div>
      )}

      <div className="flex gap-2 md:gap-6 items-stretch">
        <TeamPicker
          label="主队"
          selected={teamA}
          teams={teams}
          onSelect={onSelectA}
          excludeId={teamB?.id}
        />

        <div className="flex items-center justify-center shrink-0">
          <div className="text-xl md:text-3xl text-gold-500 font-bold">VS</div>
        </div>

        <TeamPicker
          label="客队"
          selected={teamB}
          teams={teams}
          onSelect={onSelectB}
          excludeId={teamA?.id}
        />
      </div>

      {teamA && teamB && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <button
            onClick={onPredict}
            className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-nebula-500 via-mystic-500 to-gold-500 rounded-lg md:rounded-xl text-white font-bold text-base md:text-lg hover:opacity-90 transition-opacity shadow-lg shadow-nebula-500/30 active:opacity-80"
          >
            🔮 开启天机推演
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
