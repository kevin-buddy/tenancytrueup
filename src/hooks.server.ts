import type { Handle } from '@sveltejs/kit';

import { getAuthUserId } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.userId = getAuthUserId(event.cookies);

  return resolve(event);
};