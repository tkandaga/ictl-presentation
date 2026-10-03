import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));

    // Admin-only guard: the SheetFlow custom session is sent in the body
    // (the frontend SDK's invoke() cannot set custom headers).
    const sfSession = body.__session || null;
    let isAdmin = false;
    try {
      const parsed = typeof sfSession === 'string' ? JSON.parse(sfSession) : sfSession;
      isAdmin = parsed?.role === 'admin';
    } catch { /* ignore */ }
    if (!isAdmin) {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

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