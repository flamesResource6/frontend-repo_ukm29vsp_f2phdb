import React, { useState } from 'react'
import MoodPicker from './MoodPicker'

export default function MoodForm({ onSave }) {
  const [mood, setMood] = useState('happy')
  const [note, setNote] = useState('')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await onSave({ date, mood, note: note.trim() || null })
      setNote('')
    } catch (e) {
      setError(e?.message || 'Failed to save')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="flex items-center gap-3">
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="px-3 py-2 rounded-lg border w-44" />
        <span className="text-sm text-gray-500">Pick a date and mood, add a note if you like.</span>
      </div>
      <MoodPicker value={mood} onChange={setMood} />
      <textarea
        value={note}
        onChange={e=>setNote(e.target.value)}
        placeholder="Optional note (what influenced your mood?)"
        className="w-full min-h-[90px] rounded-xl border px-3 py-2"
      />
      <div className="flex justify-end">
        <button disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50">
          {loading ? 'Saving...' : 'Save Entry'}
        </button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  )
}
