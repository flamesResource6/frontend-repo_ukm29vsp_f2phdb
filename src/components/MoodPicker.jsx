import React from 'react'

const MOODS = [
  { key: 'ecstatic', label: 'Ecstatic', emoji: '🤩', color: 'bg-pink-100 text-pink-700 border-pink-200' },
  { key: 'happy', label: 'Happy', emoji: '😊', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { key: 'neutral', label: 'Neutral', emoji: '😐', color: 'bg-gray-100 text-gray-700 border-gray-200' },
  { key: 'sad', label: 'Sad', emoji: '🙁', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { key: 'down', label: 'Down', emoji: '😢', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  { key: 'angry', label: 'Angry', emoji: '😡', color: 'bg-red-100 text-red-700 border-red-200' },
]

export default function MoodPicker({ value, onChange }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {MOODS.map(m => (
        <button
          type="button"
          key={m.key}
          onClick={() => onChange(m.key)}
          className={`flex items-center gap-2 p-3 rounded-xl border transition hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 ${m.color} ${value===m.key ? 'ring-2 ring-offset-2 ring-black/10' : ''}`}
        >
          <span className="text-2xl">{m.emoji}</span>
          <span className="font-medium">{m.label}</span>
        </button>
      ))}
    </div>
  )
}

export { MOODS }
