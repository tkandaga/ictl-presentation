import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const SPREADSHEET_ID = '1yLIYFFDKjoL8ZearUiRf9B1HUnHlsl3voZmsQw9IN5M';
const SHEET_NAMES = ['ROOM 1','ROOM 2','ROOM 3','ROOM 4','ROOM 5','ROOM 6','ROOM 7','ROOM 8','ROOM 9','ROOM 10','ROOM 11'];

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

    // Parse header info (rows 1-4, 0-indexed)
    const roomNumber = rows[1]?.[2]?.replace(':','').trim() || '';
    const invitedSpeaker = rows[2]?.[2]?.replace(':','').trim() || '';
    const moderator = rows[3]?.[2]?.replace(':','').trim() || '';
    const minuteTaker = rows[4]?.[2]?.replace(':','').trim() || '';

    // Parse participants (from row 8 onwards, 0-indexed)
    const participants = [];
    for (let i = 8; i < rows.length; i++) {
      const row = rows[i];
      if (!row || !row[0]) continue;
      const no = row[0];
      if (isNaN(parseInt(no))) continue;
      participants.push({
        rowIndex: i + 1, // 1-indexed for Sheets API
        no: row[0] || '',
        abstractCode: row[1] || '',
        name: row[2] || '',
        institution: row[3] || '',
        score1: row[4] || '',
        score2: row[5] || '',
        score3: row[6] || '',
        score4: row[7] || '',
        score5: row[8] || '',
        total: row[9] || '0',
      });
    }

    return Response.json({
      sheetName: targetSheet,
      roomNumber,
      invitedSpeaker,
      moderator,
      minuteTaker,
      participants,
      availableSheets: SHEET_NAMES,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});