import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Save, X } from "lucide-react";

export default function HeaderInfo({ data, onSave }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    setForm({
      invitedSpeaker: data.invitedSpeaker || '',
      moderator: data.moderator || '',
      minuteTaker: data.minuteTaker || '',
    });
    setEditing(false);
  }, [data]);

  const handleSave = async () => {
    await onSave(form);
    setEditing(false);
  };

  const fields = [
    { key: 'moderator', label: 'Moderator' },
    { key: 'invitedSpeaker', label: 'Invited Speaker' },
  ];

  return (
    <div className="bg-blue-50 rounded-xl border border-blue-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Info {data.sheetName}
        </h2>
        {!editing ? (
          <Button size="sm" onClick={() => setEditing(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Pencil className="w-4 h-4 mr-1" /> Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Save className="w-4 h-4 mr-1" /> Simpan
            </Button>
            <Button variant="outline" size="sm" onClick={() => setEditing(false)} className="text-blue-600 border-blue-400 hover:bg-blue-50">
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {fields.map(({ key, label }) => (
          <div key={key}>
            <Label className="text-xs text-gray-500 mb-1">{label}</Label>
            {editing ? (
              <Input
                value={form[key] || ''}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={`Masukkan ${label}`}
                className="text-sm"
              />
            ) : (
              <p className="text-sm font-medium text-gray-800 bg-gray-50 rounded-md px-3 py-2 min-h-[36px]">
                {form[key] || <span className="text-gray-400 italic">Belum diisi</span>}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}