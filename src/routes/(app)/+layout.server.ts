import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  if (!locals.userId) {
    throw redirect(303, '/login');
  }

  return {
    userId: locals.userId
  };
};