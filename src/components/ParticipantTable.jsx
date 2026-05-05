import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import ScoreSliderModal from "@/components/ScoreSliderModal";

const SCORE_LABELS = [
  'Kejelasan dan Struktur Penyampaian',
  'Penguasaan Materi',
  'Interaksi dengan Audiens',
  'Penggunaan Media Presentasi',
  'Kesesuaian Waktu',
];

const SCORE_KEYS = ['score1', 'score2', 'score3', 'score4', 'score5'];

const getScoreStyle = (val) => {
  const n = parseInt(val);
  if (isNaN(n) || !val || val === '-') return { color: '#d1d5db' };
  if (n <= 40) return { color: '#dc2626' };
  if (n <= 55) return { color: '#ea580c' };
  if (n <= 70) return { color: '#ca8a04' };
  if (n <= 85) return { color: '#16a34a' };
  return { color: '#2563eb' };
};

export default function ParticipantTable({ participants, onSaveScores, roomData }) {
  const [editingParticipant, setEditingParticipant] = useState(null);
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
                <td>${p.mode === 'onsite' ? '🟢' : ''}</td>
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

  const handleSave = async (scores) => {
    setSaving(true);
    await onSaveScores(editingParticipant.rowIndex, scores);
    setEditingParticipant(null);
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
    <>
      {editingParticipant && (
        <ScoreSliderModal
          participant={editingParticipant}
          initialScores={{
            score1: editingParticipant.score1,
            score2: editingParticipant.score2,
            score3: editingParticipant.score3,
            score4: editingParticipant.score4,
            score5: editingParticipant.score5,
          }}
          onSave={handleSave}
          onClose={() => setEditingParticipant(null)}
          saving={saving}
        />
      )}

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
              <li>Klik nama presenter untuk membuka form penilaian</li>
              <li>Geser slider untuk setiap kategori (<span className="font-semibold">0–100</span>)</li>
              <li>Klik tombol <span className="font-semibold">Simpan</span> untuk menyimpan</li>
            </ol>
            <p className="text-xs text-orange-700 mt-2">🟢 = Presenter hadir secara <span className="font-semibold">On-site</span></p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-100 text-blue-800 text-xs uppercase tracking-wide">
                <th className="px-3 py-3 text-left w-10">No</th>
                <th className="px-3 py-3 text-center w-12">Mode</th>
                <th className="px-3 py-3 text-left min-w-[180px]">Nama Peserta</th>
                <th className="px-3 py-3 text-left min-w-[160px]">Institusi</th>
              <th className="px-3 py-3 text-left min-w-[100px]">Negara</th>
                {SCORE_LABELS.map((label, i) => (
                  <th key={i} className="px-3 py-3 text-center min-w-[100px]">{label}</th>
                ))}
                <th className="px-3 py-3 text-center font-bold">Total</th>
                <th className="px-3 py-3 text-center w-24">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {participants.map((p) => (
                <tr
                  key={p.rowIndex}
                  className="hover:bg-blue-50 transition-colors"
                >
                  <td className="px-3 py-3 text-gray-500">{p.no}</td>
                  <td className="px-3 py-3 text-center">
                    {p.mode === 'onsite' ? <span title="On-site">🟢</span> : null}
                  </td>
                  <td className="px-3 py-3 font-medium text-gray-800">{p.name}</td>
                  <td className="px-3 py-3 text-gray-600 text-xs">{p.institution}</td>
                  <td className="px-3 py-3 text-gray-600 text-xs">{p.country}</td>

                  {SCORE_KEYS.map((key, i) => (
                    <td key={i} className="px-3 py-3 text-center">
                      <span className="font-medium" style={getScoreStyle(p[key])}>
                        {p[key] || '-'}
                      </span>
                    </td>
                  ))}

                  <td className="px-3 py-3 text-center">
                    <span className="font-bold text-base" style={{ color: parseInt(p.total) > 0 ? '#9333ea' : '#d1d5db' }}>
                      {p.total || '0'}
                    </span>
                  </td>

                  <td className="px-3 py-3 text-center">
                    <Button
                      size="sm"
                      className="h-7 px-3 bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => setEditingParticipant(p)}
                    >
                      Nilai
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}