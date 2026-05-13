import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const SPREADSHEET_ID = '1yLIYFFDKjoL8ZearUiRf9B1HUnHlsl3voZmsQw9IN5M';

const ROOM_DATA = [
  { room: 'ROOM 1',  invitedSpeaker: 'Prof. Dr. Ir. Amalia Sapriati, M.A.',        moderator: 'Dr. Sidik Puryanto, M.Pd.',                              minuteTaker: 'Anugrah Murtini, M.Hum.' },
  { room: 'ROOM 2',  invitedSpeaker: 'Dr. Andayani, M.Ed.',                         moderator: 'Dr. Andy Sapta, S.Pd., M.Pd., M.Si.',                   minuteTaker: 'Siti Utami Dewi Ningrum, S.S., M.A.' },
  { room: 'ROOM 3',  invitedSpeaker: 'Dr. Siti Julaeha, M.A.',                      moderator: 'Dwi Rezki Hardianto Putra Rustan, S.S., M.Pd.',         minuteTaker: "Nisa A'rafiyah Tri Wulandari, M.Pd." },
  { room: 'ROOM 4',  invitedSpeaker: 'Dr. Sri Tatminingsih, M.Pd.',                 moderator: 'Ami Hibatul Jameel, S.Pd., M.A.',                       minuteTaker: 'Murni Maulina, M.Pd.' },
  { room: 'ROOM 5',  invitedSpeaker: 'Dr. Della Raymena Jovanka, S.Pd., M.Si.',     moderator: 'Adrian Rasyki, M.Hum.',                                 minuteTaker: 'Uliya Khoirun Nisa, M.Pd.' },
  { room: 'ROOM 6',  invitedSpeaker: 'Dra. Titi Chandrawati, M.Ed., Ph.D.',         moderator: 'Dr. Yati, M.Pd.',                                       minuteTaker: 'Dony Darma Sagita, M.Pd., Kons.' },
  { room: 'ROOM 7',  invitedSpeaker: 'Dr. Naila Naseer',                             moderator: 'Dr. Achmad Anwar Abidin, M.Pd.I.',                     minuteTaker: 'Muktia Pramitasari, M.Pd.' },
  { room: 'ROOM 8',  invitedSpeaker: 'Dr. Kristof Fenyvesi',                         moderator: 'Dr. Prima Dwi Yuliani, M.Pd.',                          minuteTaker: 'Mutia Kamalia Mukhtar, S.T., M.Si.' },
  { room: 'ROOM 9',  invitedSpeaker: 'Dr. Prakash V. Arumuga',                       moderator: 'Dr. Ahmad Syaikhu, M.Pd.',                              minuteTaker: 'Agnisa Widayanti, M.Pd.' },
  { room: 'ROOM 10', invitedSpeaker: 'Prof. Kumiko Aoki, Ph.D.',                     moderator: 'Dr. Siti Muyaroah, M.Pd.',                              minuteTaker: 'Refisa Ananda, M.Pd.' },
  { room: 'ROOM 11', invitedSpeaker: 'Dr. Richie Tai Ki Kim',                        moderator: 'Dr. Arini Noor Izzati, M.Pd.',                          minuteTaker: 'Saddam Fathurrachman, M.Pd.' },
];

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { accessToken } = await base44.asServiceRole.connectors.getConnection("googlesheets");

    const valueRanges = ROOM_DATA.flatMap(({ room, invitedSpeaker, moderator, minuteTaker }) => [
      { range: `${room}!C3`, values: [[invitedSpeaker]] },
      { range: `${room}!C4`, values: [[moderator]] },
      { range: `${room}!C5`, values: [[minuteTaker]] },
    ]);

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

    return Response.json({ success: true, totalUpdatedCells: result.totalUpdatedCells });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});