import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Save, X } from "lucide-react";

const RUBRIK = [
  {
    key: "score1",
    label: "Kejelasan dan Struktur Penyampaian",
    descriptions: [
      { min: 86, max: 100, level: "Sangat Baik", color: "#2563eb", desc: "Sangat jelas, runtut, sistematis, dan mudah dipahami." },
      { min: 71, max: 85, level: "Baik", color: "#16a34a", desc: "Jelas dan runtut, ada sedikit kekurangan." },
      { min: 56, max: 70, level: "Cukup", color: "#ca8a04", desc: "Cukup jelas, struktur kurang konsisten." },
      { min: 41, max: 55, level: "Kurang", color: "#ea580c", desc: "Kurang jelas dan alur penyampaian lemah." },
      { min: 0, max: 40, level: "Sangat Kurang", color: "#dc2626", desc: "Tidak jelas dan tidak terstruktur." },
    ],
  },
  {
    key: "score2",
    label: "Penguasaan Materi",
    descriptions: [
      { min: 86, max: 100, level: "Sangat Baik", color: "#2563eb", desc: "Sangat menguasai materi, argumentatif dan meyakinkan." },
      { min: 71, max: 85, level: "Baik", color: "#16a34a", desc: "Menguasai materi dengan baik." },
      { min: 56, max: 70, level: "Cukup", color: "#ca8a04", desc: "Cukup menguasai, masih tampak ragu." },
      { min: 41, max: 55, level: "Kurang", color: "#ea580c", desc: "Penguasaan materi kurang." },
      { min: 0, max: 40, level: "Sangat Kurang", color: "#dc2626", desc: "Tidak menguasai materi." },
    ],
  },
  {
    key: "score3",
    label: "Interaksi dengan Audiens",
    descriptions: [
      { min: 86, max: 100, level: "Sangat Baik", color: "#2563eb", desc: "Sangat interaktif, komunikatif, dan responsif." },
      { min: 71, max: 85, level: "Baik", color: "#16a34a", desc: "Interaksi baik dan cukup aktif." },
      { min: 56, max: 70, level: "Cukup", color: "#ca8a04", desc: "Interaksi terbatas." },
      { min: 41, max: 55, level: "Kurang", color: "#ea580c", desc: "Kurang melibatkan audiens." },
      { min: 0, max: 40, level: "Sangat Kurang", color: "#dc2626", desc: "Tidak ada interaksi." },
    ],
  },
  {
    key: "score4",
    label: "Penggunaan Media Presentasi",
    descriptions: [
      { min: 86, max: 100, level: "Sangat Baik", color: "#2563eb", desc: "Media sangat relevan, menarik, dan mendukung penyampaian." },
      { min: 71, max: 85, level: "Baik", color: "#16a34a", desc: "Media relevan dan cukup mendukung." },
      { min: 56, max: 70, level: "Cukup", color: "#ca8a04", desc: "Media cukup relevan namun kurang optimal." },
      { min: 41, max: 55, level: "Kurang", color: "#ea580c", desc: "Media kurang mendukung penyampaian." },
      { min: 0, max: 40, level: "Sangat Kurang", color: "#dc2626", desc: "Media tidak relevan atau tidak ada." },
    ],
  },
  {
    key: "score5",
    label: "Kesesuaian Waktu",
    descriptions: [
      { min: 86, max: 100, level: "Sangat Baik", color: "#2563eb", desc: "Sangat tepat sesuai alokasi waktu." },
      { min: 71, max: 85, level: "Baik", color: "#16a34a", desc: "Sedikit melebihi atau kurang dari waktu." },
      { min: 56, max: 70, level: "Cukup", color: "#ca8a04", desc: "Penyimpangan waktu cukup terasa." },
      { min: 41, max: 55, level: "Kurang", color: "#ea580c", desc: "Tidak sesuai alokasi waktu." },
      { min: 0, max: 40, level: "Sangat Kurang", color: "#dc2626", desc: "Sangat tidak sesuai waktu." },
    ],
  },
];

function getDescForScore(descriptions, val) {
  return descriptions.find((d) => val >= d.min && val <= d.max) || descriptions[descriptions.length - 1];
}

function ScoreSlider({ rubrik, value, onChange }) {
  const desc = getDescForScore(rubrik.descriptions, value);
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-700">{rubrik.label}</span>
        <span className="text-xl font-bold" style={{ color: desc.color }}>{value}</span>
      </div>
      <Slider
        min={0}
        max={100}
        step={1}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        className="mb-2"
      />
      <div
        className="flex items-start gap-2 rounded-lg px-3 py-2 text-xs"
        style={{ background: desc.color + "15", borderLeft: `3px solid ${desc.color}` }}
      >
        <span className="font-bold whitespace-nowrap" style={{ color: desc.color }}>{desc.level}</span>
        <span className="text-gray-600">{desc.desc}</span>
      </div>
    </div>
  );
}

export default function ScoreSliderModal({ participant, initialScores, onSave, onClose, saving }) {
  const [scores, setScores] = useState({
    score1: parseInt(initialScores.score1) || 0,
    score2: parseInt(initialScores.score2) || 0,
    score3: parseInt(initialScores.score3) || 0,
    score4: parseInt(initialScores.score4) || 0,
    score5: parseInt(initialScores.score5) || 0,
  });

  const handleChange = (key, val) => setScores((prev) => ({ ...prev, [key]: val }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 pt-5 pb-4 flex items-start justify-between z-10">
          <div>
            <h2 className="text-base font-bold text-gray-800">{participant.name}</h2>
            <p className="text-xs text-gray-500 mt-0.5">{participant.abstractCode} · {participant.institution}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 mt-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sliders */}
        <div className="px-6 py-5">
          {RUBRIK.map((r) => (
            <ScoreSlider
              key={r.key}
              rubrik={r}
              value={scores[r.key]}
              onChange={(v) => handleChange(r.key, v)}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onClose} className="text-blue-600 border-blue-400 hover:bg-blue-50">
            Batal
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => onSave(scores)}
            disabled={saving}
          >
            <Save className="w-4 h-4 mr-1" />
            {saving ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </div>
    </div>
  );
}