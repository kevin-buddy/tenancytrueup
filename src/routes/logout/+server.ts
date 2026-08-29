import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { clearAuthCookie } from '$lib/server/auth';

export const POST: RequestHandler = async ({ cookies }) => {
  clearAuthCookie(cookies);

  throw redirect(303, '/login');
};