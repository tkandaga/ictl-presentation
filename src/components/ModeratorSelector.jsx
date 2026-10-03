import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "lucide-react";

const MODERATORS = [
  { name: 'Valeria Yekti Kwasaning Gusti, M.Pd.', room: 'ROOM 1' },
  { name: 'Dr. Yati, M.Pd.', room: 'ROOM 2' },
  { name: 'Ami Hibatul Jameel, S.Pd., M.A.', room: 'ROOM 3' },
  { name: 'Indri Annisa, M.Pd.', room: 'ROOM 4' },
  { name: 'Dr. Ahmad Syaikhu, M.Pd.', room: 'ROOM 5' },
  { name: 'Dr. Karisdha Pradityana, M.Pd.', room: 'ROOM 6' },
  { name: 'Ir. Ida Zubaidah, M.A.,Ed.D.', room: 'ROOM 7' },
  { name: 'Hidayah, S.Pd.,M.Pd.', room: 'ROOM 8' },
  { name: 'Dwi Rezki Hardianto Putra Rustan, S.S., M.A', room: 'ROOM 9' },
  { name: 'Adrian Rasyki, M.Hum.', room: 'ROOM 10' },
  { name: 'Nurul Isra Fauziah, M.Sc.', room: 'ROOM 11' },
  { name: 'Saddam Fathurrachman, M.Pd.', room: 'ROOM 12' },
  { name: 'Novi Eka Saputri, M.Pd.', room: 'ROOM 13' },
  { name: 'Dola Suciana, M.Pd.', room: 'ROOM 14' },
  { name: 'Agnisa Widayanti, M.Pd.', room: 'ROOM 15' },
  { name: 'Sari Wardani Simarmata, M.Pd.', room: 'ROOM 16' },
];

export { MODERATORS };

export default function ModeratorSelector({ selected, onSelect }) {
  return (
    <div
      className="relative mx-4 sm:mx-6 mt-4 rounded-2xl p-[2px] bg-gradient-to-br from-yellow-300 via-amber-200 to-yellow-400 shadow-[0_10px_30px_-6px_rgba(37,99,235,0.45)]"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9), 0 10px 30px -6px rgba(37,99,235,0.45), 0 2px 0 rgba(30,58,138,0.35)" }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600">
        {/* inner bevel highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-white/50" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-black/25" />
        {/* decorative glows */}
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-yellow-300/20 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-8 w-44 h-44 rounded-full bg-purple-300/25 blur-2xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-3 px-6 py-5">
          <div className="flex items-center gap-2 text-white font-semibold shrink-0">
            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-b from-yellow-300 to-amber-400 text-blue-700 shadow-[0_3px_8px_rgba(0,0,0,0.25)] ring-1 ring-yellow-100/80">
              <User className="w-5 h-5" />
            </span>
            <span>Anda adalah Moderator:</span>
          </div>
          <Select value={selected} onValueChange={onSelect}>
            <SelectTrigger className="bg-white text-gray-800 font-medium w-full sm:w-auto sm:min-w-[340px] border border-yellow-300/70 shadow-[0_3px_0_rgba(15,32,90,0.35)] hover:shadow-[0_5px_0_rgba(15,32,90,0.35)] transition-shadow">
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
            <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-blue-50 text-sm px-3 py-1 rounded-full border border-white/25">
              → Room Anda: <span className="font-bold text-yellow-200">{selected}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}