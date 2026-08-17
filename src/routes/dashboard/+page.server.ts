import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import { supabaseAdmin } from '$lib/server/supabase';
import { clearAuthCookie, getAuthUserId } from '$lib/server/auth';

export const load: PageServerLoad = async ({ cookies }) => {
  const userId = getAuthUserId(cookies);

  if (!userId) {
    throw redirect(303, '/login');
  }

  const { data: user, error: userError } = await supabaseAdmin
    .from('personal_project_tenancytrueup_users')
    .select('id, username')
    .eq('id', userId)
    .maybeSingle();

  if (userError) {
    console.error('Dashboard user load error:', userError);
    throw error(500, 'Unable to load dashboard.');
  }

  if (!user) {
    clearAuthCookie(cookies);
    throw redirect(303, '/login');
  }

  return {
    user: {
      id: user.id,
      username: user.username
    }
  };
};

export const actions: Actions = {
  logout: async ({ cookies }) => {
    clearAuthCookie(cookies);

    throw redirect(303, '/login');
  }
};