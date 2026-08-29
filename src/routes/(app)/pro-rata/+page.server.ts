import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import { supabaseAdmin } from '$lib/server/supabase';
import { getAuthUserId } from '$lib/server/auth';
import { getProRataPreview } from '$lib/server/pro-rata-service';
import { getDate, getString } from '$lib/server/form';

export const load: PageServerLoad = async () => {
  const [buildingsResponse, runsResponse] = await Promise.all([
    supabaseAdmin.from('buildings').select('id, name').order('name'),

    supabaseAdmin
      .from('pro_rata_runs')
      .select('*, buildings(name)')
      .order('created_at', { ascending: false })
      .limit(20)
  ]);

  if (buildingsResponse.error || runsResponse.error) {
    throw error(500, 'Unable to load pro-rata data.');
  }

  return {
    buildings: buildingsResponse.data ?? [],
    runs: runsResponse.data ?? []
  };
};

export const actions: Actions = {
  preview: async ({ request }) => {
    const formData = await request.formData();

    const buildingId = getString(formData, 'building_id');
    const startDate = getDate(formData, 'start_date');
    const endDate = getDate(formData, 'end_date');
    const denominatorChoice =
      getString(formData, 'denominator_choice') || 'building_default';

    if (!buildingId || !startDate || !endDate) {
      return fail(400, {
        error: 'Building, start date, and end date are required.'
      });
    }

    try {
      const preview = await getProRataPreview({
        buildingId,
        startDate,
        endDate,
        denominatorChoice
      });

      return {
        preview,
        params: {
          buildingId,
          startDate,
          endDate,
          denominatorChoice
        }
      };
    } catch (err) {
      return fail(500, {
        error: err instanceof Error ? err.message : 'Unable to preview calculation.'
      });
    }
  },

  commit: async ({ request, cookies }) => {
    const userId = getAuthUserId(cookies);

    if (!userId) {
      throw redirect(303, '/login');
    }

    const formData = await request.formData();

    const buildingId = getString(formData, 'building_id');
    const startDate = getDate(formData, 'start_date');
    const endDate = getDate(formData, 'end_date');
    const denominatorChoice =
      getString(formData, 'denominator_choice') || 'building_default';

    if (!buildingId || !startDate || !endDate) {
      return fail(400, {
        error: 'Building, start date, and end date are required.'
      });
    }

    try {
      const preview = await getProRataPreview({
        buildingId,
        startDate,
        endDate,
        denominatorChoice
      });

      if (!preview.ok) {
        return fail(400, {
          error: preview.errors.join(' ')
        });
      }

      const { data: run, error: runError } = await supabaseAdmin
        .from('pro_rata_runs')
        .insert({
          building_id: buildingId,
          period_start_date: startDate,
          period_end_date: endDate,
          denominator_type: preview.params.denominatorType,
          status: 'committed',
          total_denominator_area: preview.summary.denominatorArea,
          total_leased_area: preview.summary.leasedAreaEnd,
          vacancy_area: preview.summary.vacancyArea,
          total_weighted_denominator_area_days:
            preview.summary.denominatorWeightedDays,
          created_by: userId,
          committed_at: new Date().toISOString()
        })
        .select()
        .single();

      if (runError) {
        return fail(500, {
          error: runError.message
        });
      }

      if (preview.lines.length > 0) {
        const { error: linesError } = await supabaseAdmin
          .from('pro_rata_run_lines')
          .insert(
            preview.lines.map((line) => ({
              run_id: run.id,
              lease_id: line.leaseId,
              tenant_id: line.tenantId,
              occupied_days: line.occupiedDays,
              start_area: line.startArea,
              end_area: line.endArea,
              weighted_area_days: line.weightedAreaDays,
              share_percent: line.sharePercent.toFixed(10)
            }))
          );

        if (linesError) {
          return fail(500, {
            error: linesError.message
          });
        }
      }

      throw redirect(303, `/pro-rata/runs/${run.id}`);
    } catch (err) {
      if (err instanceof Error && err.message.includes('redirect')) {
        throw err;
      }

      return fail(500, {
        error: err instanceof Error ? err.message : 'Unable to commit calculation.'
      });
    }
  }
};