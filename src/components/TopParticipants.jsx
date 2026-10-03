import { useMemo, useEffect, useState } from "react";
import { Trophy, Medal, Award } from "lucide-react";

// Per participant we have: name, institution, total (string/number).
// Total adalah rata-rata 5 kategori, sehingga maksimumnya 100.
const MAX_TOTAL = 100;
const RANK_META = [
  {
    icon: Trophy,
    ring: "ring-amber-300",
    bg: "from-amber-400 to-yellow-500",
    text: "text-amber-600",
    bar: "from-amber-400 via-yellow-400 to-amber-500",
    badge: "bg-amber-500",
    label: "Juara 1",
  },
  {
    icon: Medal,
    ring: "ring-slate-300",
    bg: "from-slate-300 to-slate-400",
    text: "text-slate-600",
    bar: "from-slate-300 via-slate-400 to-slate-500",
    badge: "bg-slate-500",
    label: "Juara 2",
  },
  {
    icon: Award,
    ring: "ring-orange-300",
    bg: "from-orange-400 to-orange-600",
    text: "text-orange-600",
    bar: "from-orange-400 via-orange-500 to-orange-600",
    badge: "bg-orange-600",
    label: "Juara 3",
  },
];

export default function TopParticipants({ participants }) {
  // Sort by total descending, take top 3 with a real score.
  // Apply a shared (tied) ranking: equal scores share the same rank & medal.
  const top3 = useMemo(() => {
    if (!participants) return [];
    const sorted = [...participants]
      .map((p) => ({ ...p, _total: Number(p.total) || 0 }))
      .filter((p) => p._total > 0)
      .sort((a, b) => b._total - a._total)
      .slice(0, 3);
    let lastScore = null;
    let lastRank = 1;
    return sorted.map((p, i) => {
      if (lastScore !== null && p._total === lastScore) {
        return { ...p, rank: lastRank };
      }
      lastScore = p._total;
      lastRank = i + 1;
      return { ...p, rank: lastRank };
    });
  }, [participants]);

  // Animate bar widths on mount / when data changes
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(false);
    const t = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(t);
  }, [top3]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2.5 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
        <Trophy className="w-5 h-5 text-amber-500" />
        <div>
          <h2 className="text-base font-bold text-gray-800 leading-tight">Rekapan Top 3 Peserta</h2>
          <p className="text-xs text-gray-500 mt-0.5">Diurutkan berdasarkan total skor tertinggi</p>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {top3.length === 0 ? (
          <div className="py-8 text-center text-sm text-gray-400">
            Belum ada peserta yang dinilai.
          </div>
        ) : (
          top3.map((p, i) => {
            const meta = RANK_META[p.rank - 1];
            const Icon = meta.icon;
            // Skala visual bar: skor (0–500) → persen (0–100), nilai 100 = penuh.
            const pct = Math.min(100, Math.round((p._total / MAX_TOTAL) * 100));
            return (
              <div key={p.rowIndex ?? i} className="flex items-center gap-3">
                <div
                  className={`shrink-0 w-10 h-10 rounded-xl bg-gradient-to-b ${meta.bg} text-white flex items-center justify-center shadow-md ring-2 ${meta.ring}`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <p className="text-sm font-semibold text-gray-800 truncate" title={p.name}>
                      {p.name}
                    </p>
                    <span className={`shrink-0 text-xs font-bold ${meta.text}`}>
                      {p._total}
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${meta.bar} transition-[width] duration-1000 ease-out`}
                      style={{ width: ready ? `${pct}%` : "0%" }}
                    />
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1 truncate" title={p.institution}>
                    {meta.label} {p.institution ? `• ${p.institution}` : ""}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}