import { fail, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import { supabaseAdmin } from '$lib/server/supabase';

function parsePositiveNumber(
  value: FormDataEntryValue | null
): number | null {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return null;
  }

  if (parsed <= 0) {
    return null;
  }

  return parsed;
}

function parsePercent(
  value: FormDataEntryValue | null
): number | null {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return null;
  }

  if (parsed < 0 || parsed > 100) {
    return null;
  }

  return parsed;
}

export const load: PageServerLoad = async () => {
  const { data, error: supabaseError } = await supabaseAdmin
    .from('buildings')
    .select('*')
    .order('created_at', { ascending: false });

  if (supabaseError) {
    throw error(500, supabaseError.message);
  }

  return {
    buildings: data ?? []
  };
};

export const actions: Actions = {
  create: async ({ request }) => {
    const formData = await request.formData();

    const name = String(formData.get('name') ?? '').trim();

    const rentableArea = parsePositiveNumber(
      formData.get('rentableArea')
    );

    const occupancyPercent = parsePercent(
      formData.get('occupancyPercent')
    );

    const grossUpPercent = parsePercent(
      formData.get('grossUpPercent')
    );

    if (!name) {
      return fail(400, {
        error: 'Building name is required'
      });
    }

    if (rentableArea == null) {
      return fail(400, {
        error: 'Total denominator area must be a positive number'
      });
    }

    if (occupancyPercent == null) {
      return fail(400, {
        error: 'Occupancy percent must be between 0 and 100'
      });
    }

    if (grossUpPercent == null) {
      return fail(400, {
        error: 'Gross-up percent must be between 0 and 100'
      });
    }

    const { error: insertError } = await supabaseAdmin
      .from('buildings')
      .insert({
        name,
        rentable_area: rentableArea,
        occupancy_percent: occupancyPercent,
        gross_up_percent: grossUpPercent
      });

    if (insertError) {
      return fail(500, {
        error: insertError.message
      });
    }

    return {
      success: true
    };
  }
};