import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import { supabaseAdmin } from '$lib/server/supabase';
import { getNumber, getOptionalString, getString } from '$lib/server/form';

export const load: PageServerLoad = async ({ locals }) => {
  const [unitsResponse, buildingsResponse] = await Promise.all([
    supabaseAdmin
      .from('personal_project_tenancytrueup_units')
      .select('*, personal_project_tenancytrueup_buildings(name)')
      .order('created_at', { ascending: false }),

    supabaseAdmin.from('personal_project_tenancytrueup_buildings').select('id, name').order('name').eq('user_id', locals.userId)
  ]);

  if (unitsResponse.error || buildingsResponse.error) {
    throw error(500, 'Unable to load units.');
  }

  return {
    units: unitsResponse.data ?? [],
    buildings: buildingsResponse.data ?? []
  };
};

export const actions: Actions = {
  create: async ({ request }) => {
    const formData = await request.formData();

    const buildingId = getString(formData, 'building_id');
    const code = getString(formData, 'code');
    const name = getOptionalString(formData, 'name');
    const floor = getOptionalString(formData, 'floor');
    const unitType = getOptionalString(formData, 'unit_type');
    const usableArea = getNumber(formData, 'usable_area') ?? 0;
    const rentableArea = getNumber(formData, 'rentable_area') ?? 0;

    if (!buildingId || !code) {
      return fail(400, {
        error: 'Building and unit code are required.'
      });
    }

    const { error: insertError } = await supabaseAdmin
      .from('personal_project_tenancytrueup_units')
      .insert({
        building_id: buildingId,
        code,
        name,
        floor,
        unit_type: unitType,
        usable_area: usableArea,
        rentable_area: rentableArea
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
      .from('personal_project_tenancytrueup_units')
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