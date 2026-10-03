import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const session = base44.auth.getSessionSync?.() || await base44.auth.me().catch(() => null);
    // Read SheetFlow custom session from headers (sent by frontend) — admin-only guard.
    const sfSession = req.headers.get('x-sheetflow-session') || '';
    let isAdmin = false;
    try {
      const parsed = sfSession ? JSON.parse(sfSession) : null;
      isAdmin = parsed?.role === 'admin';
    } catch { /* ignore */ }
    if (!isAdmin) {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const allowed = ['seminarTitle', 'seminarSubtitle', 'logoUrl', 'flyerUrl', 'spreadsheetId'];
    const data = {};
    for (const k of allowed) if (k in body) data[k] = body[k];

    const list = await base44.asServiceRole.entities.AppConfig.list('-created_date', 5);
    const existing = list?.[0];
    let record;
    if (existing) {
      record = await base44.asServiceRole.entities.AppConfig.update(existing.id, data);
    } else {
      record = await base44.asServiceRole.entities.AppConfig.create(data);
    }
    return Response.json({ success: true, record });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});