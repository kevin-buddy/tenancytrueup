import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { supabaseAdmin } from '$lib/server/supabase';

export const load: PageServerLoad = async () => {
  const [
    buildings,
    units,
    tenants,
    leases,
    leaseUnits,
    proRataRuns
  ] = await Promise.all([
    supabaseAdmin.from('personal_project_tenancytrueup_buildings').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('personal_project_tenancytrueup_units').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('personal_project_tenancytrueup_tenants').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('personal_project_tenancytrueup_leases').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('personal_project_tenancytrueup_units_leases').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('personal_project_tenancytrueup_pro_rata_runs').select('*', { count: 'exact', head: true })
  ]);

  if (
    buildings.error ||
    units.error ||
    tenants.error ||
    leases.error ||
    leaseUnits.error ||
    proRataRuns.error
  ) {
    throw error(500, 'Unable to load master data summary.');
  }

  return {
    counts: {
      buildings: buildings.count ?? 0,
      units: units.count ?? 0,
      tenants: tenants.count ?? 0,
      leases: leases.count ?? 0,
      leaseUnits: leaseUnits.count ?? 0,
      proRataRuns: proRataRuns.count ?? 0
    }
  };
};