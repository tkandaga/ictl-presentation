import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useAppConfig } from "@/lib/AppConfigContext";
import ModeratorSelector from "@/components/ModeratorSelector";
import HeaderInfo from "@/components/HeaderInfo";
import ParticipantTable from "@/components/ParticipantTable";
import RoomDataError from "@/components/RoomDataError";
import TopParticipants from "@/components/TopParticipants";
import useRoomData from "@/components/useRoomData";
import { Loader2 } from "lucide-react";
import { LogOut } from "lucide-react";
import { Settings } from "lucide-react";
import { toast } from "sonner";
import { clearSession, getSession } from "@/pages/Login";

export default function Dashboard() {
  const navigate = useNavigate();
  const { config } = useAppConfig();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { roomData, loading, error, fetchRoomData } = useRoomData(selectedRoom);
  const session = getSession();

  const roleLabel = session?.role === 'admin' ? 'Administrator' : (session?.role === 'juri' ? 'Juri' : (session?.name || 'Pengguna'));
  const isAdmin = session?.role === 'admin';

  const handleHeaderSave = async (headerData) => {
    await base44.functions.invoke('updateSheetData', {
      sheetName: selectedRoom,
      type: 'header',
      data: headerData,
    });
    toast.success('Info room berhasil disimpan!');
    fetchRoomData(selectedRoom);
  };

  const handleScoresSave = async (rowIndex, scores) => {
    await base44.functions.invoke('updateSheetData', {
      sheetName: selectedRoom,
      type: 'scores',
      data: { rowIndex, ...scores },
    });
    toast.success('Nilai berhasil disimpan!');
    fetchRoomData(selectedRoom);
  };

  const handleLogout = () => {
    clearSession();
    window.location.replace("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex items-center gap-3 shrink-0">
            <img
              className="h-10 w-auto object-contain"
              src="https://media.base44.com/images/public/69ea3d6e30665ad66c697b6b/1a51227b6_Logo_kemendikbud.png"
              alt="Logo Kemendikbud"
            />
            <img
              className="h-10 w-auto object-contain"
              src="https://media.base44.com/images/public/69ea3d6e30665ad66c697b6b/1156cfec3_Logo_UT-transparan.png"
              alt="Logo Universitas Terbuka"
            />
            <img
              className="h-10 w-auto object-contain"
              src="https://media.base44.com/images/public/69ea3d6e30665ad66c697b6b/560b57139_logoICTL.png"
              alt="Logo ICTL"
            />
          </div>
          <div className="hidden md:block h-9 w-px bg-gray-200 shrink-0" />
          <div className="hidden md:block min-w-0">
            <h1 className="text-xl font-bold text-gray-800 leading-tight">
              {config?.seminarTitle || "Seminar Internasional"}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {config?.seminarSubtitle || "Sistem Penilaian Peserta"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-blue-800 bg-blue-50 border border-blue-200 rounded-full px-2.5 py-1">
            Login sebagai: <span className="font-semibold">{roleLabel}</span>
          </span>
          {isAdmin && (
            <button
              onClick={() => navigate("/admin")}
              className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-700 border border-gray-200 rounded-lg px-3 py-1.5 hover:border-blue-300 transition-colors"
              title="Pengaturan backend"
            >
              <Settings className="w-4 h-4" /> <span className="hidden sm:inline">Pengaturan</span>
            </button>
          )}
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:border-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Keluar
          </button>
        </div>
      </div>

      {/* Moderator Selector Bar */}
      <ModeratorSelector selected={selectedRoom} onSelect={setSelectedRoom} />

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {!selectedRoom ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">👋</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Selamat Datang!</h2>
            <p className="text-gray-500 max-w-sm">Silakan pilih nama Anda sebagai moderator di bagian atas untuk memulai penilaian.</p>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-3 text-gray-600">Memuat data...</span>
          </div>
        ) : error ? (
          <RoomDataError error={error} onRetry={() => fetchRoomData(selectedRoom)} />
        ) : roomData ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HeaderInfo data={roomData} onSave={handleHeaderSave} />
              <TopParticipants participants={roomData.participants} />
            </div>
            <ParticipantTable
              participants={roomData.participants}
              onSaveScores={handleScoresSave}
              roomData={roomData}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}