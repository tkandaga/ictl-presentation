import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Printer } from "lucide-react";

const SCORE_LABELS = [
  'Kejelasan & Struktur',
  'Penguasaan Materi',
  'Interaksi Audiens 1',
  'Interaksi Audiens 2',
  'Kesesuaian Waktu',
];

const SCORE_KEYS = ['score1', 'score2', 'score3', 'score4', 'score5'];

const getScoreColor = (val) => {
  const n = parseInt(val);
  if (isNaN(n) || !val || val === '-') return 'text-gray-300';
  if (n <= 25) return 'text-red-500';
  if (n <= 50) return 'text-orange-500';
  if (n <= 75) return 'text-green-600';
  return 'text-blue-500';
};

// Inline style approach to bypass Tailwind purge for dynamic colors
const getScoreStyle = (val) => {
  const n = parseInt(val);
  if (isNaN(n) || !val || val === '-') return { color: '#d1d5db' };
  if (n <= 25) return { color: '#ef4444' };
  if (n <= 50) return { color: '#f97316' };
  if (n <= 75) return { color: '#16a34a' };
  return { color: '#2563eb' };
};

export default function ParticipantTable({ participants, onSaveScores, roomData }) {
  const [editingRow, setEditingRow] = useState(null);
  const [editScores, setEditScores] = useState({});
  const [saving, setSaving] = useState(false);

  const handlePrint = () => {
    const printContent = `
      <html>
      <head>
        <title>Penilaian ${roomData?.sheetName || 'Room'}</title>
        <style>
          body { font-family: Arial, sans-serif; font-size: 11px; margin: 20px; }
          h2 { font-size: 14px; margin-bottom: 4px; }
          .meta { margin-bottom: 12px; color: #555; font-size: 11px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th { background: #dbeafe; color: #1e40af; padding: 6px 8px; text-align: center; font-size: 10px; border: 1px solid #bfdbfe; }
          th.left { text-align: left; }
          td { padding: 5px 8px; border: 1px solid #e5e7eb; font-size: 10px; }
          td.center { text-align: center; }
          tr:nth-child(even) { background: #f9fafb; }
          .total { font-weight: bold; color: #9333ea; }
        </style>
      </head>
      <body>
        <h2>Daftar Peserta & Penilaian — ${roomData?.sheetName || ''}</h2>
        <div class="meta">
          Moderator: ${roomData?.moderator || '-'} &nbsp;|&nbsp;
          Invited Speaker: ${roomData?.invitedSpeaker || '-'} &nbsp;|&nbsp;
          Notulis: ${roomData?.minuteTaker || '-'}
        </div>
        <table>
          <thead>
            <tr>
              <th class="left">No</th>
              <th class="left">Kode</th>
              <th class="left">Nama Peserta</th>
              <th class="left">Institusi</th>
              <th>Kejelasan & Struktur</th>
              <th>Penguasaan Materi</th>
              <th>Interaksi Audiens 1</th>
              <th>Interaksi Audiens 2</th>
              <th>Kesesuaian Waktu</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${participants.map(p => `
              <tr>
                <td>${p.no}</td>
                <td>${p.abstractCode}</td>
                <td>${p.name}</td>
                <td>${p.institution}</td>
                <td class="center">${p.score1 || '-'}</td>
                <td class="center">${p.score2 || '-'}</td>
                <td class="center">${p.score3 || '-'}</td>
                <td class="center">${p.score4 || '-'}</td>
                <td class="center">${p.score5 || '-'}</td>
                <td class="center total">${p.total || '0'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;
    const win = window.open('', '_blank');
    win.document.write(printContent);
    win.document.close();
    win.focus();
    win.print();
    win.close();
  };

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
      <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Daftar Peserta & Penilaian</h2>
            <p className="text-sm text-gray-500 mt-0.5">{participants.length} peserta</p>
          </div>
          <Button size="sm" onClick={handlePrint} className="ml-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Printer className="w-4 h-4 mr-1" /> Print PDF
          </Button>
        </div>
        <div className="sm:ml-auto bg-orange-50 border border-orange-200 rounded-lg px-4 py-3 max-w-sm w-full">
          <p className="text-xs font-bold text-orange-600 uppercase tracking-wide mb-1.5">📋 Cara Pengisian</p>
          <ol className="text-xs text-orange-800 space-y-1 list-decimal list-inside">
            <li>Klik nama presenter untuk mengisi penilaian</li>
            <li>Isikan skor <span className="font-semibold">0–100</span> pada setiap kolom</li>
            <li>Klik tombol <span className="font-semibold">Simpan</span> untuk menyimpan</li>
          </ol>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-blue-100 text-blue-800 text-xs uppercase tracking-wide">
              <th className="px-3 py-3 text-left w-10">No</th>
              <th className="px-3 py-3 text-left">Kode</th>
              <th className="px-3 py-3 text-left min-w-[180px]">Nama Peserta</th>
              <th className="px-3 py-3 text-left min-w-[160px]">Institusi</th>
              {SCORE_LABELS.map((label, i) => (
                <th key={i} className="px-3 py-3 text-center min-w-[100px]">{label}</th>
              ))}
              <th className="px-3 py-3 text-center font-bold">Total</th>
              <th className="px-3 py-3 text-center w-28">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {participants.map((p) => {
              const isEditing = editingRow === p.rowIndex;
              return (
                <tr
                  key={p.rowIndex}
                  onClick={() => { if (!isEditing) startEdit(p); }}
                  className={`transition-colors ${isEditing ? 'bg-blue-50' : 'hover:bg-blue-50 cursor-pointer'}`}
                >
                  <td className="px-3 py-3 text-gray-500">{p.no}</td>
                  <td className="px-3 py-3 font-mono text-xs text-blue-600">{p.abstractCode}</td>
                  <td className="px-3 py-3 font-medium text-gray-800">{p.name}</td>
                  <td className="px-3 py-3 text-gray-600 text-xs">{p.institution}</td>

                  {SCORE_KEYS.map((key, i) => (
                    <td
                      key={i}
                      className="px-3 py-3 text-center"
                      onClick={(e) => { if (isEditing) e.stopPropagation(); }}
                    >
                      {isEditing ? (
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={editScores[key] ?? ''}
                          onChange={(e) => setEditScores({ ...editScores, [key]: e.target.value })}
                          className="w-16 text-center text-sm h-8 mx-auto"
                          autoFocus={i === 0}
                        />
                      ) : (
                        <span className="font-medium" style={getScoreStyle(p[key])}>
                          {p[key] || '-'}
                        </span>
                      )}
                    </td>
                  ))}

                  <td className="px-3 py-3 text-center">
                    <span className="font-bold text-base" style={{ color: parseInt(p.total) > 0 ? '#9333ea' : '#d1d5db' }}>
                      {p.total || '0'}
                    </span>
                  </td>

                  <td
                    className="px-3 py-3 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {isEditing ? (
                      <Button
                        size="sm"
                        className="h-7 px-3 bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => saveEdit(p)}
                        disabled={saving}
                      >
                        <Save className="w-3 h-3 mr-1" />
                        {saving ? 'Menyimpan...' : 'Simpan'}
                      </Button>
                    ) : (
                      <span className="text-xs text-gray-300">—</span>
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