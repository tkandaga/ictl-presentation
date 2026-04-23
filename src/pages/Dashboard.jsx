import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import RoomSelector from "@/components/RoomSelector";
import HeaderInfo from "@/components/HeaderInfo";
import ParticipantTable from "@/components/ParticipantTable";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const SHEET_NAMES = ['ROOM 1','ROOM 2','ROOM 3','ROOM 4','ROOM 5','ROOM 6','ROOM 7','ROOM 8','ROOM 9','ROOM 10'];

export default function Dashboard() {
  const [selectedRoom, setSelectedRoom] = useState('ROOM 1');
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRoomData = async (room) => {
    setLoading(true);
    const res = await base44.functions.invoke('getSheetData', { sheetName: room });
    setRoomData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRoomData(selectedRoom);
  }, [selectedRoom]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">Seminar Internasional</h1>
        <p className="text-sm text-gray-500 mt-1">Sistem Penilaian Peserta</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Room Selector */}
        <RoomSelector
          rooms={SHEET_NAMES}
          selected={selectedRoom}
          onSelect={setSelectedRoom}
        />

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-3 text-gray-600">Memuat data...</span>
          </div>
        ) : roomData ? (
          <>
            <HeaderInfo data={roomData} onSave={handleHeaderSave} />
            <ParticipantTable
              participants={roomData.participants}
              onSaveScores={handleScoresSave}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}