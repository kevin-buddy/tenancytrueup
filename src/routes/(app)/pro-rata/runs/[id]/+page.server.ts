import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { supabaseAdmin } from '$lib/server/supabase';

export const load: PageServerLoad = async ({ params }) => {
  const { data: run, error: runError } = await supabaseAdmin
    .from('pro_rata_runs')
    .select('*, buildings(name)')
    .eq('id', params.id)
    .maybeSingle();

  if (runError) {
    throw error(500, runError.message);
  }

  if (!run) {
    throw error(404, 'Pro-rata run not found');
  }

  const { data: lines, error: linesError } = await supabaseAdmin
    .from('pro_rata_run_lines')
    .select('*, leases(lease_number), tenants(name)')
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