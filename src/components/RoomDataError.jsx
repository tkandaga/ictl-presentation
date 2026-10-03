import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RoomDataError({ error, onRetry }) {
  return (
    <div role="alert" className="rounded-xl border border-border bg-card p-5 text-card-foreground">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
        <div className="min-w-0">
          <h2 className="font-semibold">
            {error.connectionMissing ? 'Google Sheets belum terhubung' : 'Data room gagal dimuat'}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{error.message}</p>
          <Button className="mt-4" onClick={onRetry}>Coba lagi</Button>
        </div>
      </div>
    </div>
  );
}