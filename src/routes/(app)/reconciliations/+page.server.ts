import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { supabaseAdmin } from '$lib/server/supabase';

export const load: PageServerLoad = async () => {
  const { data: leases, error: leaseError } = await supabaseAdmin
    .from('leases')
    .select('*')
    .order('created_at', { ascending: false });

  if (leaseError) {
    throw error(500, leaseError.message);
  }

  const { data: reconciliations, error: reconciliationError } =
    await supabaseAdmin
      .from('reconciliations')
      .select('*')
      .order('created_at', { ascending: false });

  if (reconciliationError) {
    throw error(500, reconciliationError.message);
  }

  return {
    leases: leases ?? [],
    reconciliations: reconciliations ?? []
  };
};