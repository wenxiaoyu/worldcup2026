import { motion } from 'framer-motion'
import { Team } from '../data/teams'
import { NumerologyResult } from '../engines/numerology'

interface Props {
  result: NumerologyResult
  teamA: Team
  teamB: Team
}

export default function NumerologyEngine({ result, teamA, teamB }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="gradient-border rounded-xl p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🔢</span>
        <h4 className="text-lg font-bold text-nebula-300">数字命理</h4>
      </div>

      <div className="flex justify-between items-center mb-3">
        <div className="text-center">
          <div className="text-sm text-gray-400">{teamA.name}</div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 1 }}
            className="text-3xl font-bold text-nebula-400"
          >
            {result.teamANumber}
          </motion.div>
          <div className="text-xs text-gray-500">{result.teamAEnergy}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500">今日能量数</div>
          <div className="text-2xl font-bold text-gold-400">{result.dateEnergy}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-400">{teamB.name}</div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 1.1 }}
            className="text-3xl font-bold text-gold-400"
          >
            {result.teamBNumber}
          </motion.div>
          <div className="text-xs text-gray-500">{result.teamBEnergy}</div>
        </div>
      </div>

      <div className="flex gap-2 mb-2">
        <div className="flex-1 bg-cosmic-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.teamAScore}%` }}
            transition={{ duration: 1, delay: 1.2 }}
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
            transition={{ duration: 1, delay: 1.3 }}
            className="h-full bg-gold-500 rounded-full"
          />
        </div>
        <span className="text-xs text-gold-300 w-8">{result.teamBScore}</span>
      </div>
    </motion.div>
  )
}
