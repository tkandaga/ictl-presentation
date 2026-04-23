import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Save, X } from "lucide-react";

const SCORE_LABELS = [
  'Kejelasan & Struktur',
  'Penguasaan Materi',
  'Interaksi Audiens 1',
  'Interaksi Audiens 2',
  'Kesesuaian Waktu',
];

const SCORE_KEYS = ['score1', 'score2', 'score3', 'score4', 'score5'];

export default function ParticipantTable({ participants, onSaveScores }) {
  const [editingRow, setEditingRow] = useState(null);
  const [editScores, setEditScores] = useState({});
  const [saving, setSaving] = useState(false);

  const startEdit = (p) => {
    setEditingRow(p.rowIndex);
    setEditScores({
      score1: p.score1,
      score2: p.score2,
      score3: p.score3,
      score4: p.score4,
      score5: p.score5,
    });
  };

  const cancelEdit = () => {
    setEditingRow(null);
    setEditScores({});
  };

  const saveEdit = async (p) => {
    setSaving(true);
    await onSaveScores(p.rowIndex, editScores);
    setEditingRow(null);
    setEditScores({});
    setSaving(false);
  };

  if (!participants || participants.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400">
        Tidak ada data peserta di room ini.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Daftar Peserta & Penilaian</h2>
        <p className="text-sm text-gray-500 mt-0.5">{participants.length} peserta</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wide">
              <th className="px-3 py-3 text-left w-10">No</th>
              <th className="px-3 py-3 text-left">Kode</th>
              <th className="px-3 py-3 text-left min-w-[180px]">Nama Peserta</th>
              <th className="px-3 py-3 text-left min-w-[160px]">Institusi</th>
              {SCORE_LABELS.map((label, i) => (
                <th key={i} className="px-3 py-3 text-center min-w-[100px]">{label}</th>
              ))}
              <th className="px-3 py-3 text-center font-bold">Total</th>
              <th className="px-3 py-3 text-center w-20">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {participants.map((p) => {
              const isEditing = editingRow === p.rowIndex;
              return (
                <tr key={p.rowIndex} className={`hover:bg-gray-50 transition-colors ${isEditing ? 'bg-blue-50' : ''}`}>
                  <td className="px-3 py-3 text-gray-500">{p.no}</td>
                  <td className="px-3 py-3 font-mono text-xs text-blue-600">{p.abstractCode}</td>
                  <td className="px-3 py-3 font-medium text-gray-800">{p.name}</td>
                  <td className="px-3 py-3 text-gray-600 text-xs">{p.institution}</td>

                  {SCORE_KEYS.map((key, i) => (
                    <td key={i} className="px-3 py-3 text-center">
                      {isEditing ? (
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={editScores[key] ?? ''}
                          onChange={(e) => setEditScores({ ...editScores, [key]: e.target.value })}
                          className="w-16 text-center text-sm h-8 mx-auto"
                        />
                      ) : (
                        <span className={`font-medium ${p[key] ? 'text-gray-800' : 'text-gray-300'}`}>
                          {p[key] || '-'}
                        </span>
                      )}
                    </td>
                  ))}

                  <td className="px-3 py-3 text-center">
                    <span className={`font-bold text-base ${parseInt(p.total) > 0 ? 'text-green-600' : 'text-gray-300'}`}>
                      {p.total || '0'}
                    </span>
                  </td>

                  <td className="px-3 py-3 text-center">
                    {isEditing ? (
                      <div className="flex gap-1 justify-center">
                        <Button
                          size="sm"
                          className="h-7 px-2"
                          onClick={() => saveEdit(p)}
                          disabled={saving}
                        >
                          <Save className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2"
                          onClick={cancelEdit}
                          disabled={saving}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-blue-600 hover:text-blue-800"
                        onClick={() => startEdit(p)}
                      >
                        <Pencil className="w-3 h-3" />
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}