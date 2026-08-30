import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { supabaseAdmin } from '$lib/server/supabase';

export const load: PageServerLoad = async ({ params }) => {
  const { data: run, error: runError } = await supabaseAdmin
    .from('personal_project_tenancytrueup_pro_rata_runs')
    .select('*, buildings:personal_project_tenancytrueup_pro_rata_runs_building_id_fkey!inner(name)')
    .eq('id', params.id)
    .maybeSingle();

  if (runError) {
    throw error(500, runError.message);
  }

  if (!run) {
    throw error(404, 'Pro-rata run not found');
  }

  const { data: lines, error: linesError } = await supabaseAdmin
    .from('personal_project_tenancytrueup_pro_rata_run_lines')
    .select('*, leases:personal_project_tenancytrueup_pro_rata_run_lines_lease_id_fkey!inner(lease_number), tenants:personal_project_tenancytrueup_pro_rata_run_line_tenant_id_fkey!inner(name)')
    .eq('run_id', run.id)
    .order('share_percent', { ascending: false });

  if (linesError) {
    throw error(500, linesError.message);
  }

  return {
    run,
    lines: lines ?? []
  };
};