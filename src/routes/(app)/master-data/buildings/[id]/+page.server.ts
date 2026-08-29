import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import { supabaseAdmin } from '$lib/server/supabase';
import { getDate, getNumber, getOptionalString, getString } from '$lib/server/form';

export const load: PageServerLoad = async ({ params, locals }) => {
  if (!locals.userId) {
    throw redirect(303, '/login');
  }

  const { data: building, error: buildingError } = await supabaseAdmin
    .from('personal_project_tenancytrueup_buildings')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', locals.userId)
    .maybeSingle();

  if (buildingError) {
    throw error(500, buildingError.message);
  }

  if (!building) {
    throw error(404, 'Building not found');
  }

  const [unitsResponse, snapshotsResponse] = await Promise.all([
    supabaseAdmin
      .from('personal_project_tenancytrueup_units')
      .select('*')
      .eq('building_id', building.id)
      .order('suite_number', { ascending: true }),

    supabaseAdmin
      .from('personal_project_tenancytrueup_building_area_snapshots')
      .select('*')
      .eq('building_id', building.id)
      .order('effective_date', { ascending: false })
  ]);

  if (unitsResponse.error || snapshotsResponse.error) {
    console.error('Error loading building details:', unitsResponse.error ?? snapshotsResponse.error);
    throw error(500, 'Unable to load building details.');
  }

  return {
    building,
    units: unitsResponse.data ?? [],
    snapshots: snapshotsResponse.data ?? []
  };
};

export const actions: Actions = {
  createUnit: async ({ params, request, locals }) => {
    if (!locals.userId) {
      throw redirect(303, '/login');
    }

    const formData = await request.formData();

    const suite_number = getString(formData, 'suite_number');
    const name = getOptionalString(formData, 'name');
    const floor = getOptionalString(formData, 'floor');
    const unitType = getOptionalString(formData, 'unit_type');
    const usableArea = getNumber(formData, 'usable_area') ?? 0;
    const rentableArea = getNumber(formData, 'rentable_area') ?? 0;

    if (!suite_number) {
      return fail(400, {
        error: 'Unit suite_number is required.'
      });
    }

    const { error: insertError } = await supabaseAdmin
      .from('personal_project_tenancytrueup_units')
      .insert({
        building_id: params.id,
        suite_number,
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

  deleteUnit: async ({ request }) => {
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
  },

  createSnapshot: async ({ params, request }) => {
    const formData = await request.formData();

    const effectiveDate = getDate(formData, 'effective_date');
    const totalGla = getNumber(formData, 'total_gla');
    const totalRentableArea = getNumber(formData, 'total_rentable_area');
    const measurementStandard = getOptionalString(formData, 'measurement_standard');
    const measuredBy = getOptionalString(formData, 'measured_by');
    const notes = getOptionalString(formData, 'notes');

    if (!effectiveDate) {
      return fail(400, {
        error: 'Effective date is required.'
      });
    }

    const { error: insertError } = await supabaseAdmin
      .from('personal_project_tenancytrueup_building_area_snapshots')
      .insert({
        building_id: params.id,
        effective_date: effectiveDate,
        total_gla: totalGla,
        total_rentable_area: totalRentableArea,
        measurement_standard: measurementStandard,
        measured_by: measuredBy,
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

  deleteSnapshot: async ({ request }) => {
    const formData = await request.formData();
    const id = getString(formData, 'id');

    const { error: deleteError } = await supabaseAdmin
      .from('personal_project_tenancytrueup_building_area_snapshots')
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