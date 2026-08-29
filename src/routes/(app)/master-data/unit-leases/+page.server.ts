import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import { supabaseAdmin } from '$lib/server/supabase';
import { getDate, getOptionalNumber, getString } from '$lib/server/form';

export const load: PageServerLoad = async () => {
  const [leaseUnitsResponse, leasesResponse, unitsResponse] = await Promise.all([
    supabaseAdmin
      .from('personal_project_tenancytrueup_units_leases')
      .select('*, lease:personal_project_tenancytrueup_units_leases_lease_id_fkey!inner(lease_number, personal_project_tenancytrueup_tenants(name)), unit:personal_project_tenancytrueup_units_leases_unit_id_fkey!inner(suite_number, personal_project_tenancytrueup_buildings(name))')
      .order('start_date', { ascending: false }),

    supabaseAdmin
      .from('personal_project_tenancytrueup_leases')
      .select('id, lease_number, personal_project_tenancytrueup_tenants(name)')
      .order('created_at', { ascending: false }),

    supabaseAdmin
      .from('personal_project_tenancytrueup_units')
      .select('id, suite_number, personal_project_tenancytrueup_buildings(name)')
      .order('suite_number', { ascending: true })
  ]);

  if (leaseUnitsResponse.error || leasesResponse.error || unitsResponse.error) {
    console.error('Error loading unit leases:', leaseUnitsResponse.error?.message || leasesResponse.error?.message || unitsResponse.error?.message);
    throw error(500, 'Unable to load unit leases.');
  }

  return {
    leaseUnits: leaseUnitsResponse.data ?? [],
    leases: leasesResponse.data ?? [],
    units: unitsResponse.data ?? []
  };
};

export const actions: Actions = {
  create: async ({ request }) => {
    const formData = await request.formData();

    const leaseId = getString(formData, 'lease_id');
    const unitId = getString(formData, 'unit_id');
    const startDate = getDate(formData, 'start_date');
    const endDate = getDate(formData, 'end_date');
    const usableAreaOverride = getOptionalNumber(formData, 'usable_area_override');
    const rentableAreaOverride = getOptionalNumber(formData, 'rentable_area_override');
    const notes = getString(formData, 'notes') || null;

    if (!leaseId || !unitId || !startDate || !endDate) {
      return fail(400, {
        error: 'Lease, unit, start date, and end date are required.'
      });
    }

    const { error: insertError } = await supabaseAdmin
      .from('personal_project_tenancytrueup_units_leases')
      .insert({
        lease_id: leaseId,
        unit_id: unitId,
        start_date: startDate,
        end_date: endDate,
        usable_area_override: usableAreaOverride,
        rentable_area_override: rentableAreaOverride,
        notes
      });

    if (insertError) {
      return fail(500, {
        error: insertError.message
      });
    }

    return {
      success: true
    };
  },

  delete: async ({ request }) => {
    const formData = await request.formData();
    const id = getString(formData, 'id');

    const { error: deleteError } = await supabaseAdmin
      .from('personal_project_tenancytrueup_units_leases')
      .delete()
      .eq('id', id);

    if (deleteError) {
      return fail(500, {
        error: deleteError.message
      });
    }

    return {
      success: true
    };
  }
};