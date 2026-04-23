import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const SPREADSHEET_ID = '1yLIYFFDKjoL8ZearUiRf9B1HUnHlsl3voZmsQw9IN5M';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { sheetName } = await req.json().catch(() => ({}));
    const { accessToken } = await base44.asServiceRole.connectors.getConnection("googlesheets");

    const targetSheet = sheetName || 'ROOM 1';

    const dataRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(targetSheet)}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const data = await dataRes.json();
    const rows = data.values || [];

    return Response.json({ sheet: targetSheet, rows });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});