import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const SPREADSHEET_ID = '1yLIYFFDKjoL8ZearUiRf9B1HUnHlsl3voZmsQw9IN5M';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { accessToken } = await base44.asServiceRole.connectors.getConnection("googlesheets");

    const metaRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}?fields=sheets.properties.title`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const meta = await metaRes.json();
    const titles = meta.sheets?.map(s => s.properties.title) || [];

    return Response.json({ titles });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});