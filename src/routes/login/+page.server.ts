import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import bcrypt from 'bcryptjs';

import { supabaseAdmin } from '$lib/server/supabase';
import { setAuthCookie } from '$lib/server/auth';

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();

    const username = String(formData.get('username') ?? '').trim();
    const password = String(formData.get('password') ?? '');
    const rememberMe = formData.get('rememberMe') === 'on';

    if (!username || !password) {
      return fail(400, {
        username,
        rememberMe,
        error: 'Username and password are required.'
      });
    }

    const { data: user, error } = await supabaseAdmin
      .from('personal_project_tenancytrueup_users')
      .select('id, password')
      .eq('username', username)
      .maybeSingle();

    if (error) {
      console.error('Login error:', error);

      return fail(500, {
        username,
        rememberMe,
        error: 'Unable to log in right now.'
      });
    }

    if (!user) {
      return fail(401, {
        username,
        rememberMe,
        error: 'Invalid username or password.'
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return fail(401, {
        username,
        rememberMe,
        error: 'Invalid username or password.'
      });
    }

    setAuthCookie(cookies, String(user.id), rememberMe);

    throw redirect(303, '/dashboard');
  }
};