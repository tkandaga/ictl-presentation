import { useCallback, useEffect, useRef, useState } from "react";
import { base44 } from "@/api/base44Client";

export default function useRoomData(selectedRoom) {
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const requestId = useRef(0);

  const fetchRoomData = useCallback(async (room) => {
    const id = ++requestId.current;
    setLoading(true);
    setError(null);
    setRoomData(null);
    try {
      const res = await base44.functions.invoke('getSheetData', { sheetName: room });
      if (res.data?.error) throw new Error(res.data.error);
      if (id === requestId.current) setRoomData(res.data);
    } catch (failure) {
      if (id !== requestId.current) return;
      const detail = failure.response?.data?.error || failure.data?.error || failure.message || '';
      const connectionMissing = detail.includes('No active connection found');
      setError({
        connectionMissing,
        message: connectionMissing
          ? 'Akun Google belum terhubung ke aplikasi. Pemilik aplikasi perlu menyambungkan kembali Google Sheets agar data bisa dimuat dan nilai bisa disimpan.'
          : 'Data room belum berhasil dimuat. Silakan coba lagi; jika masih gagal, periksa koneksi Google Sheets dan akses ke file.',
      });
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedRoom) fetchRoomData(selectedRoom);
    return () => { requestId.current += 1; };
  }, [selectedRoom, fetchRoomData]);

  return { roomData, loading, error, fetchRoomData };
}