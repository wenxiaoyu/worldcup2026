import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Team } from '../data/teams'

interface Props {
  teams: Team[]
  teamA: Team | null
  teamB: Team | null
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
    <div className="flex-1">
      <label className="block text-sm text-nebula-300 mb-2">{label}</label>
      {selected ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="gradient-border rounded-xl p-4 text-center cursor-pointer hover:opacity-80"
          onClick={() => { onSelect(null as unknown as Team); setIsOpen(true) }}
        >
          <div className="text-4xl mb-2">{selected.flag}</div>
          <div className="text-lg font-bold">{selected.name}</div>
          <div className="text-xs text-gray-400">{selected.nameEn} · {selected.group}组</div>
        </motion.div>
      ) : (
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-cosmic-800 border border-cosmic-600 rounded-lg px-4 py-3 text-gray-400 text-left focus:outline-none focus:border-nebula-500"
          >
            点击选择球队...
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-1 bg-cosmic-800 border border-cosmic-600 rounded-lg max-h-60 overflow-y-auto z-10"
              >
                {Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([group, groupTeams]) => (
                  <div key={group}>
                    <div className="px-4 py-1 text-xs text-mystic-400 bg-cosmic-900/50 sticky top-0">{group}组</div>
                    {groupTeams.map(team => (
                      <div
                        key={team.id}
                        onClick={() => { onSelect(team); setIsOpen(false) }}
                        className="px-4 py-2 hover:bg-cosmic-700 cursor-pointer flex items-center gap-3"
                      >
                        <span className="text-xl">{team.flag}</span>
                        <span>{team.name}</span>
                        <span className="text-xs text-gray-500 ml-auto">{team.nameEn}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

export default function TeamSelector({ teams, teamA, teamB, onSelectA, onSelectB, onPredict }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gold-400 mb-2">选择对阵双方</h2>
        <p className="text-gray-400 text-sm">选定两支球队，诚心一拜，开启天机</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-stretch">
        <TeamPicker
          label="主队"
          selected={teamA}
          teams={teams}
          onSelect={onSelectA}
          excludeId={teamB?.id}
        />

        <div className="flex items-center justify-center">
          <div className="text-3xl text-gold-500 font-bold">VS</div>
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
            className="px-8 py-4 bg-gradient-to-r from-nebula-500 via-mystic-500 to-gold-500 rounded-xl text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-nebula-500/30"
          >
            🔮 开启天机推演
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
