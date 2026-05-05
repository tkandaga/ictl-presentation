import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const SPREADSHEET_ID = '1yLIYFFDKjoL8ZearUiRf9B1HUnHlsl3voZmsQw9IN5M';
const SHEET_NAMES = ['ROOM 1','ROOM 2','ROOM 3','ROOM 4','ROOM 5','ROOM 6','ROOM 7','ROOM 8','ROOM 9','ROOM 10','ROOM 11','ROOM 12','ROOM 13','ROOM 14','ROOM 15','ROOM 16'];

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

    // Parse header info (0-indexed): row1=ROOM NUMBER, row2=INVITED SPEAKER, row3=MODERATOR, row4=IT
    const roomNumber = rows[1]?.[2]?.trim() || '';
    const invitedSpeaker = rows[2]?.[2]?.trim() || '';
    const moderator = rows[3]?.[2]?.trim() || '';
    const minuteTaker = rows[4]?.[2]?.trim() || '';

    // Parse participants - start from index 8 (row 9), row 8 is sub-header for scores
    // Skip: empty col A, non-numeric col A, empty name, "Invited Speaker" name
    const participants = [];
    let counter = 1;
    for (let i = 8; i < rows.length; i++) {
      const row = rows[i];
      if (!row || !row[0]) continue;
      if (isNaN(parseInt(row[0]))) continue;
      const name = row[2]?.trim() || '';
      if (!name) continue;
      // Skip the "Invited Speaker" placeholder row
      if (name.toLowerCase().includes('invited speaker')) continue;
      participants.push({
        rowIndex: i + 1, // 1-indexed for Sheets API
        no: counter++,
        abstractCode: row[1] || '',
        name: name,
        institution: row[3] || '',
        country: row[4] || '',
        score1: row[5] || '',
        score2: row[6] || '',
        score3: row[7] || '',
        score4: row[8] || '',
        score5: row[9] || '',
        total: row[10] || '0',
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