import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppConfig } from "@/lib/AppConfigContext";
import { getSession } from "@/pages/Login";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft, Save, ImagePlus } from "lucide-react";
import { toast } from "sonner";

export default function AdminSettings() {
  const navigate = useNavigate();
  const { config, loading, save } = useAppConfig();
  const session = getSession();

  const [form, setForm] = useState({
    seminarTitle: "",
    seminarSubtitle: "",
    logoUrl: "",
    flyerUrl: "",
    spreadsheetId: "",
  });
  const [savingState, setSavingState] = useState(false);
  const [uploading, setUploading] = useState(null); // 'logo' | 'flyer'
  const logoInput = useRef(null);
  const flyerInput = useRef(null);

  useEffect(() => {
    if (config) {
      setForm({
        seminarTitle: config.seminarTitle || "",
        seminarSubtitle: config.seminarSubtitle || "",
        logoUrl: config.logoUrl || "",
        flyerUrl: config.flyerUrl || "",
        spreadsheetId: config.spreadsheetId || "",
      });
    }
  }, [config]);

  if (!session || session.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-6 py-4 text-sm max-w-sm">
          Akses ditolak. Halaman ini hanya untuk Administrator.
        </div>
        <Button className="mt-4" onClick={() => navigate("/")}>Kembali ke Dashboard</Button>
      </div>
    );
  }

  const handleField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const uploadFile = async (file, kind) => {
    if (!file) return;
    setUploading(kind);
    try {
      const res = await base44.integrations.Core.UploadPublicFile({ file });
      const url = res?.file_url || res?.data?.file_url;
      if (url) {
        handleField(kind === 'logo' ? 'logoUrl' : 'flyerUrl', url);
        toast.success(kind === 'logo' ? "Logo berhasil diunggah" : "Flyer berhasil diunggah");
      } else {
        toast.error("Gagal mengunggah file");
      }
    } catch {
      toast.error("Gagal mengunggah file");
    } finally {
      setUploading(null);
    }
  };

  // Accept either a bare ID or a full Google Sheets URL and reduce it to the ID.
  const normalizeSpreadsheetId = (raw) => {
    const clean = (raw || "").trim();
    const m = clean.match(/\/spreadsheets\/d\/([^/]+)/);
    if (m) return m[1];
    return clean.split("/")[0];
  };

  const handleSheetChange = (raw) => {
    handleField("spreadsheetId", normalizeSpreadsheetId(raw));
  };

  const handleSave = async () => {
    setSavingState(true);
    try {
      await save({
        seminarTitle: form.seminarTitle,
        seminarSubtitle: form.seminarSubtitle,
        logoUrl: form.logoUrl,
        flyerUrl: form.flyerUrl,
        spreadsheetId: form.spreadsheetId,
      });
      toast.success("Pengaturan berhasil disimpan");
      // Reload the app so the dashboard (and login) re-read the freshly saved config.
      window.location.replace("/");
    } catch {
      toast.error("Gagal menyimpan pengaturan");
      setSavingState(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Kembali
          </Button>
          <h1 className="text-lg font-bold text-gray-800">Pengaturan Backend</h1>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-800 bg-blue-50 border border-blue-200 rounded-full px-2.5 py-1">
          Login sebagai: <span className="font-semibold">Administrator</span>
        </span>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-3 text-gray-600">Memuat pengaturan...</span>
          </div>
        ) : (
          <>
            {/* Identitas Seminar */}
            <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <h2 className="text-base font-bold text-gray-800 mb-1">Identitas Seminar</h2>
              <p className="text-xs text-gray-500 mb-4">
                Judul dan sub judul ini tampil di halaman login dan di header dashboard.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-500 mb-1">Nama Seminar</Label>
                  <Input
                    value={form.seminarTitle}
                    onChange={(e) => handleField('seminarTitle', e.target.value)}
                    placeholder="Seminar Internasional"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 mb-1">Sub Judul</Label>
                  <Input
                    value={form.seminarSubtitle}
                    onChange={(e) => handleField('seminarSubtitle', e.target.value)}
                    placeholder="Sistem Penilaian Peserta"
                  />
                </div>
              </div>
            </section>

            {/* Logo Seminar */}
            <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <h2 className="text-base font-bold text-gray-800 mb-1">Logo Seminar</h2>
              <p className="text-xs text-gray-500 mb-4">Logo utama yang tampil di halaman login.</p>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                  {form.logoUrl ? (
                    <img src={form.logoUrl} alt="Logo seminar" className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-gray-300 text-xs text-center px-2">Belum ada logo</span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Input
                    ref={logoInput}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => uploadFile(e.target.files?.[0], 'logo')}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={uploading === 'logo'}
                    onClick={() => logoInput.current?.click()}
                  >
                    {uploading === 'logo' ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <ImagePlus className="w-4 h-4 mr-1" />}
                    {uploading === 'logo' ? 'Mengunggah...' : 'Unggah Logo'}
                  </Button>
                  <Input
                    value={form.logoUrl}
                    onChange={(e) => handleField('logoUrl', e.target.value)}
                    placeholder="URL logo (atau unggah file)"
                    className="text-xs w-72"
                  />
                </div>
              </div>
            </section>

            {/* Flyer */}
            <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <h2 className="text-base font-bold text-gray-800 mb-1">Flyer Seminar</h2>
              <p className="text-xs text-gray-500 mb-4">Gambar flyer yang tampil di panel kanan halaman login.</p>
              <div className="flex items-center gap-4">
                <div className="w-32 h-40 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                  {form.flyerUrl ? (
                    <img src={form.flyerUrl} alt="Flyer seminar" className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-gray-300 text-xs text-center px-2">Belum ada flyer</span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Input
                    ref={flyerInput}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => uploadFile(e.target.files?.[0], 'flyer')}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={uploading === 'flyer'}
                    onClick={() => flyerInput.current?.click()}
                  >
                    {uploading === 'flyer' ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <ImagePlus className="w-4 h-4 mr-1" />}
                    {uploading === 'flyer' ? 'Mengunggah...' : 'Unggah Flyer'}
                  </Button>
                  <Input
                    value={form.flyerUrl}
                    onChange={(e) => handleField('flyerUrl', e.target.value)}
                    placeholder="URL flyer (atau unggah file)"
                    className="text-xs w-72"
                  />
                </div>
              </div>
            </section>

            {/* Google Sheets */}
            <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <h2 className="text-base font-bold text-gray-800 mb-1">Google Sheets (Sumber Data)</h2>
              <p className="text-xs text-gray-500 mb-4">
                ID spreadsheet yang berisi data ruangan & peserta. Format sheet harus sama dengan sheet
                existing (hanya membaca cell berwarna kuning).
              </p>
              <div>
                <Label className="text-xs text-gray-500 mb-1">Spreadsheet ID</Label>
                <Input
                  value={form.spreadsheetId}
                  onChange={(e) => handleSheetChange(e.target.value)}
                  placeholder="Tempel URL Google Sheets atau ID di sini"
                  className="font-mono"
                />
                <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">
                  Bisa tempel langsung URL spreadsheet (mis. <span className="font-mono">https://docs.google.com/spreadsheets/d/1yLIYFFDKjoL8.../edit</span>); ID akan diambil otomatis.
                </p>
              </div>
            </section>

            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={savingState} className="bg-blue-600 hover:bg-blue-700 text-white">
                {savingState ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Save className="w-4 h-4 mr-1" />}
                {savingState ? "Menyimpan..." : "Simpan Pengaturan"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}