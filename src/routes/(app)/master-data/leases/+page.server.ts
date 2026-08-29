import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import { supabaseAdmin } from '$lib/server/supabase';
import { getDate, getNumber, getOptionalString, getString } from '$lib/server/form';

export const load: PageServerLoad = async ({ locals }) => {
  const [leasesResponse, tenantsResponse, buildingsResponse] = await Promise.all([
    supabaseAdmin
      .from('personal_project_tenancytrueup_leases')
      .select('*, tenant:personal_project_tenancytrueup_leases_tenant_id_fkey!inner(name), building:personal_project_tenancytrueup_leases_building_id_fkey!inner(name)')
      // .eq('personal_project_tenancytrueup_buildings.user_id', locals.userId)
      .order('created_at', { ascending: false }),

    supabaseAdmin.from('personal_project_tenancytrueup_tenants').select('id, name').order('name').eq('user_id', locals.userId),

    supabaseAdmin.from('personal_project_tenancytrueup_buildings').select('id, name').order('name').eq('user_id', locals.userId)
  ]);

  if (leasesResponse.error || tenantsResponse.error || buildingsResponse.error) {
    throw error(500, 'Unable to load leases.');
  }

  return {
    leases: leasesResponse.data ?? [],
    tenants: tenantsResponse.data ?? [],
    buildings: buildingsResponse.data ?? []
  };
};

export const actions: Actions = {
  create: async ({ request }) => {
    const formData = await request.formData();

    const tenantId = getString(formData, 'tenant_id');
    const buildingId = getString(formData, 'building_id');
    const leaseNumber = getOptionalString(formData, 'lease_number');
    const startDate = getDate(formData, 'start_date');
    const endDate = getDate(formData, 'end_date');
    const status = getString(formData, 'status') || 'active';
    const proRataDenominatorType =
      getString(formData, 'pro_rata_denominator_type') || 'building_default';
    const estimatedAnnualCam = getNumber(formData, 'estimated_annual_cam') ?? 0;
    const notes = getOptionalString(formData, 'notes');

    if (!tenantId || !buildingId || !startDate) {
      return fail(400, {
        error: 'Tenant, building, and start date are required.'
      });
    }

    const { error: insertError } = await supabaseAdmin
      .from('personal_project_tenancytrueup_leases')
      .insert({
        tenant_id: tenantId,
        building_id: buildingId,
        lease_number: leaseNumber,
        start_date: startDate,
        end_date: endDate,
        status,
        pro_rata_denominator_type: proRataDenominatorType,
        estimated_annual_cam: estimatedAnnualCam,
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
      .from('personal_project_tenancytrueup_leases')
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