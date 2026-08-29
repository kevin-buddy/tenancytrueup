import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import { supabaseAdmin } from '$lib/server/supabase';
import { getNumber, getOptionalString, getString } from '$lib/server/form';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.userId) {
    throw redirect(303, '/login');
  }

  const { data, error: loadError } = await supabaseAdmin
    .from('personal_project_tenancytrueup_buildings')
    .select('*')
    .eq('user_id', locals.userId)
    .order('created_at', { ascending: false });

  if (loadError) {
    throw error(500, loadError.message);
  }

  return {
    buildings: data ?? []
  };
};

export const actions: Actions = {
  create: async ({ request, locals }) => {
    if (!locals.userId) {
      throw redirect(303, '/login');
    }

    const formData = await request.formData();

    const name = getString(formData, 'name');
    const address = getOptionalString(formData, 'address');
    const totalGla = getNumber(formData, 'total_gla');
    const totalRentableArea = getNumber(formData, 'total_rentable_area');
    const defaultDenominatorType =
      getString(formData, 'default_denominator_type') || 'rentable_area';
    const measurementStandard = getOptionalString(formData, 'measurement_standard');

    if (!name) {
      return fail(400, {
        error: 'Building name is required.'
      });
    }

    const { error: insertError } = await supabaseAdmin
      .from('personal_project_tenancytrueup_buildings')
      .insert({
        user_id: locals.userId,
        name,
        address,
        total_gla: totalGla,
        total_rentable_area: totalRentableArea,
        default_denominator_type: defaultDenominatorType,
        measurement_standard: measurementStandard
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

  delete: async ({ request, locals }) => {
    if (!locals.userId) {
      throw redirect(303, '/login');
    }

    const formData = await request.formData();
    const id = getString(formData, 'id');

    if (!id) {
      return fail(400, {
        error: 'Building ID is required.'
      });
    }

    const { error: deleteError } = await supabaseAdmin
      .from('personal_project_tenancytrueup_buildings')
      .delete()
      .eq('id', id)
      .eq('user_id', locals.userId);

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