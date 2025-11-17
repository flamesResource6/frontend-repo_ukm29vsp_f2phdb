import React, { useMemo } from 'react'
import { MOODS } from './MoodPicker'

const scoreMap = { ecstatic:5, happy:4, neutral:3, sad:2, down:1, angry:0 }

export default function MoodChart({ items }) {
  const data = useMemo(() => {
    const arr = [...items]
    arr.sort((a,b)=> a.date.localeCompare(b.date))
    return arr.map(i => ({ x: i.date, y: scoreMap[i.mood] }))
  }, [items])

  if (!data.length) {
    return <p className="text-sm text-gray-500">No data yet. Add your first mood above.</p>
  }

  // Simple SVG line chart
  const width = 600
  const height = 200
  const padding = 30

  const xs = data.map(d=>d.x)
  const ys = data.map(d=>d.y)

  const xIndex = x => xs.indexOf(x)
  const xStep = (width - padding*2) / Math.max(xs.length - 1, 1)
  const yMin = 0, yMax = 5
  const yScale = y => height - padding - (y - yMin) / (yMax - yMin) * (height - padding*2)

  const points = data.map((d,i)=> [padding + i*xStep, yScale(d.y)])
  const path = points.map((p,i)=> (i===0 ? `M ${p[0]},${p[1]}` : `L ${p[0]},${p[1]}`)).join(' ')

  return (
    <div className="w-full overflow-x-auto">
      <svg width={width} height={height} className="bg-white rounded-xl border">
        {/* axes */}
        <line x1={padding} y1={height-padding} x2={width-padding} y2={height-padding} stroke="#e5e7eb" />
        <line x1={padding} y1={padding} x2={padding} y2={height-padding} stroke="#e5e7eb" />
        {/* y labels */}
        {[0,1,2,3,4,5].map(v => (
          <g key={v}>
            <line x1={padding-4} y1={yScale(v)} x2={width-padding} y2={yScale(v)} stroke="#f3f4f6" />
            <text x={8} y={yScale(v)+4} fontSize="10" fill="#9ca3af">{v}</text>
          </g>
        ))}
        {/* line */}
        <path d={path} fill="none" stroke="#60a5fa" strokeWidth="2" />
        {/* points */}
        {points.map((p,i)=> (
          <circle key={i} cx={p[0]} cy={p[1]} r={3} fill="#3b82f6" />
        ))}
      </svg>
    </div>
  )
}
