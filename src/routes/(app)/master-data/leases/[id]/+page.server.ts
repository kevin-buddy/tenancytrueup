import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import { supabaseAdmin } from '$lib/server/supabase';
import { getDate, getOptionalNumber, getString } from '$lib/server/form';

export const load: PageServerLoad = async ({ params }) => {
  const { data: lease, error: leaseError } = await supabaseAdmin
    .from('personal_project_tenancytrueup_leases')
    .select('*, tenant:personal_project_tenancytrueup_leases_tenant_id_fkey!inner(name), building:personal_project_tenancytrueup_leases_building_id_fkey!inner(name)')
    .eq('id', params.id)
    .maybeSingle();

  if (leaseError) {
    throw error(500, leaseError.message);
  }

  if (!lease) {
    throw error(404, 'Lease not found');
  }

  const [leaseUnitsResponse, unitsResponse] = await Promise.all([
    supabaseAdmin
      .from('personal_project_tenancytrueup_units_leases')
      .select('*, personal_project_tenancytrueup_units(id, suite_number, name, rentable_area, usable_area)')
      .eq('lease_id', lease.id)
      .order('created_at', { ascending: false }),

    supabaseAdmin
      .from('personal_project_tenancytrueup_units')
      .select('id, suite_number, name, rentable_area, usable_area')
      .eq('building_id', lease.building_id)
      .order('suite_number', { ascending: true })
  ]);

  if (leaseUnitsResponse.error || unitsResponse.error) {
    console.error('Error loading lease units:', leaseUnitsResponse.error?.message || unitsResponse.error?.message);
    throw error(500, 'Unable to load lease units.');
  }

  return {
    lease,
    leaseUnits: leaseUnitsResponse.data ?? [],
    units: unitsResponse.data ?? []
  };
};

export const actions: Actions = {
  addUnit: async ({ params, request }) => {
    const formData = await request.formData();

    const unitId = getString(formData, 'unit_id');
    const startDate = getDate(formData, 'start_date');
    const endDate = getDate(formData, 'end_date');
    const usableAreaOverride = getOptionalNumber(formData, 'usable_area_override');
    const rentableAreaOverride = getOptionalNumber(formData, 'rentable_area_override');
    const notes = getString(formData, 'notes') || null;

    if (!unitId || !startDate || !endDate) {
      return fail(400, {
        error: 'Unit, start date, and end date are required.'
      });
    }

    const { error: insertError } = await supabaseAdmin
      .from('personal_project_tenancytrueup_units_leases')
      .insert({
        lease_id: params.id,
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

  deleteUnit: async ({ request }) => {
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