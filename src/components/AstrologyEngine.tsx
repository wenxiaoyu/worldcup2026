import { motion } from 'framer-motion'
import { Team } from '../data/teams'
import { AstrologyResult } from '../engines/astrology'

interface Props {
  result: AstrologyResult
  teamA: Team
  teamB: Team
}

export default function AstrologyEngine({ result, teamA, teamB }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="gradient-border rounded-xl p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">⭐</span>
        <h4 className="text-lg font-bold text-nebula-300">星座星象</h4>
      </div>

      <div className="flex justify-between items-center mb-3">
        <div className="text-center">
          <div className="text-sm text-gray-400">{teamA.name}</div>
          <div className="text-gold-400 font-bold">{result.teamAZodiac}</div>
        </div>
        <div className="text-xs text-mystic-400 px-2 py-1 bg-mystic-500/10 rounded">
          {result.phase}
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-400">{teamB.name}</div>
          <div className="text-gold-400 font-bold">{result.teamBZodiac}</div>
        </div>
      </div>

      <div className="text-xs text-gray-400 mb-2">🪐 {result.planetInfluence}</div>

      <div className="flex gap-2 mb-2">
        <div className="flex-1 bg-cosmic-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.teamAScore}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-nebula-500 rounded-full"
          />
        </div>
        <span className="text-xs text-nebula-300 w-8">{result.teamAScore}</span>
      </div>
      <div className="flex gap-2">
        <div className="flex-1 bg-cosmic-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.teamBScore}%` }}
            transition={{ duration: 1, delay: 0.6 }}
            className="h-full bg-gold-500 rounded-full"
          />
        </div>
        <span className="text-xs text-gold-300 w-8">{result.teamBScore}</span>
      </div>
    </motion.div>
  )
}
