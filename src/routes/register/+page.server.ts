import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import bcrypt from 'bcryptjs';

import { supabaseAdmin } from '$lib/server/supabase';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const username = String(formData.get('username') ?? '').trim();
    const password = String(formData.get('password') ?? '');
    const confirmPassword = String(formData.get('confirmPassword') ?? '');

    if (!username || !password || !confirmPassword) {
      return fail(400, {
        username,
        error: 'All fields are required.'
      });
    }
    if (username.length < 3) {
      return fail(400, {
        username,
        error: 'Username must be at least 3 characters.'
      });
    }
    if (password.length < 8) {
      return fail(400, {
        username,
        error: 'Password must be at least 8 characters.'
      });
    }
    if (password !== confirmPassword) {
      return fail(400, {
        username,
        error: 'Passwords do not match.'
      });
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const { error } = await supabaseAdmin
      .from('personal_project_tenancytrueup_users')
      .insert({
        username,
        password: passwordHash
      });
    if (error) {
      if (error.code === '23505') {
        return fail(409, {
          username,
          error: 'Username already exists.'
        });
      }
      console.error('Register error:', error);
      return fail(500, {
        username,
        error: 'Unable to register right now.'
      });
    }
    throw redirect(303, '/login');
  }
};