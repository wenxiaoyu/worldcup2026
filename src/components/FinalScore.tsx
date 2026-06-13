import { motion } from 'framer-motion'
import { Team } from '../data/teams'
import { CompositeResult } from '../engines/composite'

interface Props {
  teamA: Team
  teamB: Team
  result: CompositeResult
}

export default function FinalScore({ teamA, teamB, result }: Props) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="gradient-border rounded-2xl p-8 text-center card-glow"
    >
      <h3 className="text-sm text-nebula-300 mb-4 uppercase tracking-widest">天命预测比分</h3>

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
          <span className="text-5xl md:text-6xl font-bold text-gold-400 glow-text">
            {result.predictedScore[0]}
          </span>
          <span className="text-3xl text-gray-500">:</span>
          <span className="text-5xl md:text-6xl font-bold text-gold-400 glow-text">
            {result.predictedScore[1]}
          </span>
        </motion.div>

        <div className="text-center">
          <div className="text-2xl mb-1">{teamB.flag}</div>
          <div className="text-sm text-gray-400">{teamB.name}</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{teamA.name} 天命指数 {result.teamAFinalScore}</span>
          <span>{teamB.name} 天命指数 {result.teamBFinalScore}</span>
        </div>
        <div className="h-3 bg-cosmic-700 rounded-full overflow-hidden flex">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(result.teamAFinalScore / (result.teamAFinalScore + result.teamBFinalScore)) * 100}%` }}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-full bg-gradient-to-r from-nebula-500 to-mystic-400"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(result.teamBFinalScore / (result.teamAFinalScore + result.teamBFinalScore)) * 100}%` }}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-full bg-gradient-to-r from-gold-500 to-gold-300"
          />
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-lg text-gold-300 font-bold"
      >
        {result.verdict}
      </motion.p>
    </motion.div>
  )
}
