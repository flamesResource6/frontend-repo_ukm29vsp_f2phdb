import { Smile, Calendar, BarChart3, Download } from "lucide-react";

export default function Header() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 grid place-items-center rounded-xl bg-blue-600 text-white">
          <Smile size={20} />
        </div>
        <div>
          <div className="text-xl font-bold text-gray-900">Mood Journal</div>
          <div className="text-sm text-gray-500">Track how you feel each day</div>
        </div>
      </div>
    </div>
  );
}
