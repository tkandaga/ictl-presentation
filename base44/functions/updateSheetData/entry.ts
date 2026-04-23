import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const SPREADSHEET_ID = '1yLIYFFDKjoL8ZearUiRf9B1HUnHlsl3voZmsQw9IN5M';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { accessToken } = await base44.asServiceRole.connectors.getConnection("googlesheets");

    const { sheetName, type, data } = body;

    const encSheet = encodeURIComponent(sheetName);
    let valueRanges = [];

    if (type === 'header') {
      // Update invited speaker, moderator, minute taker
      valueRanges = [
        { range: `${sheetName}!C3`, values: [[data.invitedSpeaker || ':________________________']] },
        { range: `${sheetName}!C4`, values: [[data.moderator || ':________________________']] },
        { range: `${sheetName}!C5`, values: [[data.minuteTaker || ':________________________']] },
      ];
    } else if (type === 'scores') {
      // Update scores for a participant by row index
      const { rowIndex, score1, score2, score3, score4, score5 } = data;
      valueRanges = [
        {
          range: `${sheetName}!E${rowIndex}:I${rowIndex}`,
          values: [[score1, score2, score3, score4, score5]]
        }
      ];
    }

    const updateRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values:batchUpdate`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          valueInputOption: 'USER_ENTERED',
          data: valueRanges,
        }),
      }
    );

    const result = await updateRes.json();
    if (result.error) {
      return Response.json({ error: result.error.message }, { status: 400 });
    }

    return Response.json({ success: true, updatedCells: result.totalUpdatedCells });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});