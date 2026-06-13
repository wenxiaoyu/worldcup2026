import { useState, useEffect } from 'react'
import { Team, teams } from './data/teams'
import { calculateComposite, CompositeResult } from './engines/composite'
import { fetchWorldCupMatches, findMatch, findNextMatch, findLocalTeam, namesMatch, Match } from './services/matchData'
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
  const [nextMatch, setNextMatch] = useState<Match | null>(null)

  useEffect(() => {
    fetchWorldCupMatches().then(matches => {
      const next = findNextMatch(matches)
      if (next) setNextMatch(next)
      if (!next) return
      const a = findLocalTeam(next.team1, teams) as Team | undefined
      const b = findLocalTeam(next.team2, teams) as Team | undefined
      if (a && b) {
        setTeamA(a)
        setTeamB(b)
      }
    })
  }, [])

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
      try {
        const isNext = nextMatch && teamA && teamB && (
          (namesMatch(teamA.nameEn, nextMatch.team1) && namesMatch(teamB.nameEn, nextMatch.team2)) ||
          (namesMatch(teamA.nameEn, nextMatch.team2) && namesMatch(teamB.nameEn, nextMatch.team1))
        )
        const matchTime = isNext ? `${nextMatch!.date} ${nextMatch!.time}` : undefined
        const prediction = calculateComposite(teamA, teamB, matchTime)
        setResult(prediction)
      } catch (e) {
        console.error('推演失败:', e)
      }
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
            nextMatch={nextMatch}
            onSelectA={setTeamA}
            onSelectB={setTeamB}
            onPredict={handlePredict}
          />
        )}

        {isRevealing && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl spin-slow mb-8">☯</div>
            <p className="text-xl text-nebula-300 animate-pulse">气运流转，卦象推演中...</p>
            <p className="text-sm text-gray-500 mt-2">观星象 · 演五行 · 翻塔罗 · 起六爻</p>
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
