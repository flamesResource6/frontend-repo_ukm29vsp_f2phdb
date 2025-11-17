import { useState } from "react";

const moods = [
  { key: "ecstatic", label: "Ecstatic", emoji: "🤩", color: "bg-pink-100 text-pink-700 border-pink-200" },
  { key: "happy", label: "Happy", emoji: "😊", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  { key: "calm", label: "Calm", emoji: "😌", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { key: "meh", label: "Meh", emoji: "😐", color: "bg-gray-100 text-gray-700 border-gray-200" },
  { key: "sad", label: "Sad", emoji: "😢", color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  { key: "angry", label: "Angry", emoji: "😠", color: "bg-red-100 text-red-700 border-red-200" },
];

export default function MoodSelector({ value, onChange }) {
  const [selected, setSelected] = useState(value || "");

  const handleSelect = (key) => {
    setSelected(key);
    onChange?.(key);
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
      {moods.map((m) => (
        <button
          key={m.key}
          type="button"
          onClick={() => handleSelect(m.key)}
          className={`border rounded-xl p-3 flex flex-col items-center justify-center transition-all hover:shadow ${m.color} ${selected === m.key ? "ring-2 ring-offset-2 ring-blue-400" : ""}`}
        >
          <span className="text-2xl">{m.emoji}</span>
          <span className="text-xs mt-1 font-medium">{m.label}</span>
        </button>
      ))}
    </div>
  );
}

export { moods };
