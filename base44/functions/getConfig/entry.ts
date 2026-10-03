import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const DEFAULTS = {
  seminarTitle: 'Seminar Internasional',
  seminarSubtitle: 'Sistem Penilaian Peserta',
  logoUrl: 'https://media.base44.com/images/public/69ea3d6e30665ad66c697b6b/1156cfec3_Logo_UT-transparan.png',
  flyerUrl: 'https://media.base44.com/images/public/69ea3d6e30665ad66c697b6b/9cb1d3146_ICTLPosterA3-rev2.jpg',
  spreadsheetId: '1yLIYFFDKjoL8ZearUiRf9B1HUnHlsl3voZmsQw9IN5M',
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const list = await base44.asServiceRole.entities.AppConfig.list('-created_date', 1);
    const record = list?.[0] || {};
    return Response.json({ ...DEFAULTS, ...record, id: record.id });
  } catch (error) {
    return Response.json(DEFAULTS);
  }
});