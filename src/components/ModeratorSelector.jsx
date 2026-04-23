import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "lucide-react";

const MODERATORS = [
  { name: 'Dr. Sidik Puryanto, M.Pd.', room: 'ROOM 1' },
  { name: 'Dr. Andy Sapta, S.Pd., M.Pd., M.Si.', room: 'ROOM 2' },
  { name: 'Dwi Rezki Hardianto Putra Rustan, S.S., M.Pd.', room: 'ROOM 3' },
  { name: 'Ami Hibatul Jameel, S.Pd., M.A.', room: 'ROOM 4' },
  { name: 'Adrian Rasyki, M.Hum.', room: 'ROOM 5' },
  { name: 'Dr. Yati, M.Pd.', room: 'ROOM 6' },
  { name: 'Dr. Achmad Anwar Abidin, M.Pd.I.', room: 'ROOM 7' },
  { name: 'Dr. Prima Dwi Yuliani, M.Pd.', room: 'ROOM 8' },
  { name: 'Dr. Ahmad Syaikhu, M.Pd.', room: 'ROOM 9' },
  { name: 'Dr. Siti Muyaroah, M.Pd.', room: 'ROOM 10' },
  { name: 'Dr. Arini Noor Izzati, M.Pd.', room: 'ROOM 11' },
];

export { MODERATORS };

export default function ModeratorSelector({ selected, onSelect }) {
  return (
    <div className="bg-blue-600 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center gap-2 text-white font-semibold shrink-0">
          <User className="w-5 h-5" />
          <span>Anda adalah Moderator:</span>
        </div>
        <Select value={selected} onValueChange={onSelect}>
          <SelectTrigger className="bg-white text-gray-800 font-medium w-full sm:w-auto sm:min-w-[340px] border-0 shadow-sm">
            <SelectValue placeholder="— Pilih nama Anda —" />
          </SelectTrigger>
          <SelectContent>
            {MODERATORS.map((m) => (
              <SelectItem key={m.room} value={m.room}>
                <span className="font-medium">{m.name}</span>
                <span className="ml-2 text-xs text-gray-500">({m.room})</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selected && (
          <span className="text-blue-100 text-sm">
            → Room Anda: <span className="font-bold text-white">{selected}</span>
          </span>
        )}
      </div>
    </div>
  );
}