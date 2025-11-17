import React, { useMemo } from 'react'
import { MOODS } from './MoodPicker'

const moodToEmoji = Object.fromEntries(MOODS.map(m => [m.key, m.emoji]))
const moodToColor = {
  ecstatic: 'bg-pink-100',
  happy: 'bg-yellow-100',
  neutral: 'bg-gray-100',
  sad: 'bg-blue-100',
  down: 'bg-indigo-100',
  angry: 'bg-red-100'
}

function monthGrid(year, month) {
  const first = new Date(year, month, 1)
  const startDay = first.getDay() // 0 Sun - 6 Sat
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = []
  for (let i=0;i<startDay;i++) cells.push(null)
  for (let d=1; d<=daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

export default function MoodHistory({ items }) {
  const byDate = useMemo(() => {
    const map = {}
    items.forEach(i => { map[i.date] = i })
    return map
  }, [items])

  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const cells = monthGrid(year, month)

  const monthName = now.toLocaleString(undefined, { month: 'long', year: 'numeric' })

  const avgScore = useMemo(() => {
    const scoreMap = { ecstatic:5, happy:4, neutral:3, sad:2, down:1, angry:0 }
    if (!items.length) return null
    const s = items.reduce((acc,i)=>acc+scoreMap[i.mood],0)
    return (s / items.length).toFixed(2)
  }, [items])

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <h3 className="text-lg font-semibold">This Month • {monthName}</h3>
        {avgScore && <span className="text-sm text-gray-500">Avg mood score: {avgScore}/5</span>}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {["S","M","T","W","T","F","S"].map(d=> (
          <div key={d} className="text-xs text-gray-400 text-center">{d}</div>
        ))}
        {cells.map((d, idx) => {
          const dateStr = d ? new Date(year, month, d).toISOString().slice(0,10) : null
          const entry = dateStr ? byDate[dateStr] : null
          return (
            <div key={idx} className={`aspect-square rounded-lg border flex items-center justify-center text-2xl ${d? 'bg-white' : 'bg-transparent border-none'}`}>
              {d && (
                entry ? (
                  <span title={`${entry.mood}${entry.note ? ' • ' + entry.note : ''}`} className="select-none">
                    {moodToEmoji[entry.mood]}
                  </span>
                ) : (
                  <span className="text-xs text-gray-300">{d}</span>
                )
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
