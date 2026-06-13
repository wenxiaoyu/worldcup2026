import { useState } from 'react'
import { Team, teams } from './data/teams'
import { calculateComposite, CompositeResult } from './engines/composite'
import { fetchWorldCupMatches, findMatch, Match } from './services/matchData'
import Header from './components/Header'
import TeamSelector from './components/TeamSelector'
import PredictionResult from './components/PredictionResult'
import RealMatchResult from './components/RealMatchResult'
import MysticalBackground from './components/MysticalBackground'

export default function App() {
  const [teamA, setTeamA] = useState<Team | null>(null)
  const [teamB, setTeamB] = useState<Team | null>(null)
  const [result, setResult] = useState<CompositeResult | null>(null)
  const [realMatch, setRealMatch] = useState<Match | null>(null)
  const [isRevealing, setIsRevealing] = useState(false)

  const handlePredict = async () => {
    if (!teamA || !teamB) return
    setIsRevealing(true)
    setResult(null)
    setRealMatch(null)

    try {
      const matches = await fetchWorldCupMatches()
      const match = findMatch(teamA.nameEn, teamB.nameEn, matches)
      if (match) {
        setRealMatch(match)
        setIsRevealing(false)
        return
      }
    } catch {
      // fallback to prediction
    }

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
    setRealMatch(null)
  }

  return (
    <div className="min-h-screen stars-bg">
      <MysticalBackground />
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8">
        {!result && !realMatch && !isRevealing && (
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

        {realMatch && teamA && teamB && (
          <RealMatchResult
            teamA={teamA}
            teamB={teamB}
            match={realMatch}
            onReset={handleReset}
          />
        )}

        {result && teamA && teamB && !realMatch && (
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
