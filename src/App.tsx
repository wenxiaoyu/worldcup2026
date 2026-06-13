import { useState } from 'react'
import { Team, teams } from './data/teams'
import { calculateComposite, CompositeResult } from './engines/composite'
import Header from './components/Header'
import TeamSelector from './components/TeamSelector'
import PredictionResult from './components/PredictionResult'

export default function App() {
  const [teamA, setTeamA] = useState<Team | null>(null)
  const [teamB, setTeamB] = useState<Team | null>(null)
  const [result, setResult] = useState<CompositeResult | null>(null)
  const [isRevealing, setIsRevealing] = useState(false)

  const handlePredict = () => {
    if (!teamA || !teamB) return
    setIsRevealing(true)
    setResult(null)

    setTimeout(() => {
      const prediction = calculateComposite(teamA, teamB)
      setResult(prediction)
      setIsRevealing(false)
    }, 2000)
  }

  const handleReset = () => {
    setTeamA(null)
    setTeamB(null)
    setResult(null)
  }

  return (
    <div className="min-h-screen stars-bg">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8">
        {!result && !isRevealing && (
          <TeamSelector
            teams={teams}
            teamA={teamA}
            teamB={teamB}
            onSelectA={setTeamA}
            onSelectB={setTeamB}
            onPredict={handlePredict}
          />
        )}

        {isRevealing && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl spin-slow mb-8">☯</div>
            <p className="text-xl text-nebula-300 animate-pulse">天机推演中...</p>
            <p className="text-sm text-gray-500 mt-2">星象排列 · 五行推演 · 塔罗占卜 · 命理测算</p>
          </div>
        )}

        {result && teamA && teamB && (
          <PredictionResult
            teamA={teamA}
            teamB={teamB}
            result={result}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  )
}
