import { motion } from 'framer-motion'
import { Team } from '../data/teams'
import { Match, getMatchScoreForTeams, namesMatch } from '../services/matchData'

interface Props {
  teamA: Team
  teamB: Team
  match: Match
  onReset: () => void
}

export default function RealMatchResult({ teamA, teamB, match, onReset }: Props) {
  const score = getMatchScoreForTeams(match, teamA.nameEn) ?? [0, 0]
  const teamAIsTeam1 = namesMatch(teamA.nameEn, match.team1)
  const goalsA = teamAIsTeam1 ? match.goals1 ?? [] : match.goals2 ?? []
  const goalsB = teamAIsTeam1 ? match.goals2 ?? [] : match.goals1 ?? []

  let resultText: string
  if (score[0] > score[1]) {
    resultText = `${teamA.name} 天命所归，拿下此局！`
  } else if (score[1] > score[0]) {
    resultText = `${teamB.name} 天命所归，拿下此局！`
  } else {
    resultText = '势均力敌，平局收场！'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center mb-4">
        <div className="inline-block px-4 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-sm mb-4">
          真实比分 · 天命已定
        </div>
        <div className="flex items-center justify-center gap-4 text-3xl mb-2">
          <span>{teamA.flag}</span>
          <span className="text-gold-400 font-bold">{teamA.name}</span>
          <span className="text-nebula-300 text-xl">VS</span>
          <span className="text-gold-400 font-bold">{teamB.name}</span>
          <span>{teamB.flag}</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">{match.date} · {match.round}{match.group ? ` · ${match.group}` : ''}</p>
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="rounded-2xl p-8 text-center border border-emerald-500/30 bg-gradient-to-br from-cosmic-900 via-cosmic-800 to-cosmic-900 shadow-lg shadow-emerald-500/10"
      >
        <h3 className="text-sm text-emerald-400 mb-4 uppercase tracking-widest">最终比分</h3>

        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="text-center">
            <div className="text-2xl mb-1">{teamA.flag}</div>
            <div className="text-sm text-gray-400">{teamA.name}</div>
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.5 }}
            className="flex items-center gap-3"
          >
            <span className="text-5xl md:text-6xl font-bold text-emerald-400 glow-text">
              {score[0]}
            </span>
            <span className="text-3xl text-gray-500">:</span>
            <span className="text-5xl md:text-6xl font-bold text-emerald-400 glow-text">
              {score[1]}
            </span>
          </motion.div>

          <div className="text-center">
            <div className="text-2xl mb-1">{teamB.flag}</div>
            <div className="text-sm text-gray-400">{teamB.name}</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{teamA.name}</span>
            <span>{teamB.name}</span>
          </div>
          <div className="h-3 bg-cosmic-700 rounded-full overflow-hidden flex">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score[0] + score[1] > 0 ? (score[0] / (score[0] + score[1])) * 100 : 50}%` }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score[0] + score[1] > 0 ? (score[1] / (score[0] + score[1])) * 100 : 50}%` }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-400"
            />
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-lg text-emerald-300 font-bold"
        >
          {resultText}
        </motion.p>
      </motion.div>

      {(goalsA.length > 0 || goalsB.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="bg-cosmic-800/50 rounded-xl p-4 border border-cosmic-700">
            <h4 className="text-sm text-gray-400 mb-3 flex items-center gap-2">
              <span>{teamA.flag}</span> {teamA.name} 进球
            </h4>
            {goalsA.length === 0 ? (
              <p className="text-xs text-gray-600">无进球</p>
            ) : (
              <ul className="space-y-1">
                {goalsA.map((g, i) => (
                  <li key={i} className="text-sm text-gray-300">
                    <span className="text-emerald-400">{g.minute}'</span> {g.name}{g.owngoal ? ' (乌龙)' : ''}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="bg-cosmic-800/50 rounded-xl p-4 border border-cosmic-700">
            <h4 className="text-sm text-gray-400 mb-3 flex items-center gap-2">
              <span>{teamB.flag}</span> {teamB.name} 进球
            </h4>
            {goalsB.length === 0 ? (
              <p className="text-xs text-gray-600">无进球</p>
            ) : (
              <ul className="space-y-1">
                {goalsB.map((g, i) => (
                  <li key={i} className="text-sm text-gray-300">
                    <span className="text-emerald-400">{g.minute}'</span> {g.name}{g.owngoal ? ' (乌龙)' : ''}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      )}

      <div className="text-center pt-4">
        <button
          onClick={onReset}
          className="px-6 py-3 border border-nebula-500 text-nebula-300 rounded-lg hover:bg-nebula-500/10 transition-colors"
        >
          重新选择
        </button>
      </div>
    </motion.div>
  )
}
