import { useState } from "react";
import { base44 } from "@/api/base44Client";
import ModeratorSelector from "@/components/ModeratorSelector";
import HeaderInfo from "@/components/HeaderInfo";
import ParticipantTable from "@/components/ParticipantTable";
import RoomDataError from "@/components/RoomDataError";
import useRoomData from "@/components/useRoomData";
import { Loader2 } from "lucide-react";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { clearSession } from "@/pages/Login";

export default function Dashboard() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { roomData, loading, error, fetchRoomData } = useRoomData(selectedRoom);

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
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Seminar Internasional</h1>
          <p className="text-sm text-gray-500 mt-1">Sistem Penilaian Peserta</p>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:border-red-300 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Keluar
        </button>
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
            <HeaderInfo data={roomData} onSave={handleHeaderSave} />
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