import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import { supabaseAdmin } from '$lib/server/supabase';
import { getOptionalString, getString } from '$lib/server/form';

export const load: PageServerLoad = async ({ locals }) => {
  const { data, error: loadError } = await supabaseAdmin
    .from('personal_project_tenancytrueup_tenants')
    .select('*')
    .eq('user_id', locals.userId)
    .order('created_at', { ascending: false });

  if (loadError) {
    throw error(500, loadError.message);
  }

  return {
    tenants: data ?? []
  };
};

export const actions: Actions = {
  create: async ({ request, locals }) => {
    const formData = await request.formData();

    const name = getString(formData, 'name');
    const contactName = getOptionalString(formData, 'contact_name');
    const contactEmail = getOptionalString(formData, 'contact_email');
    const phone = getOptionalString(formData, 'phone');

    if (!name) {
      return fail(400, {
        error: 'Tenant name is required.'
      });
    }

    const { error: insertError } = await supabaseAdmin
      .from('personal_project_tenancytrueup_tenants')
      .insert({
        name,
        user_id: locals.userId,
        contact_name: contactName,
        contact_email: contactEmail,
        phone
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
      .from('personal_project_tenancytrueup_tenants')
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