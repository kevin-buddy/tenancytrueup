import { createHmac, timingSafeEqual } from 'node:crypto';
import { env } from '$env/dynamic/private';
import type { Cookies } from '@sveltejs/kit';

const COOKIE_NAME = 'tenancytrueup_session';

// 30 days
const REMEMBER_ME_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function getSecret(): string {
  const secret = env.AUTH_SECRET;

  if (!secret) {
    throw new Error('AUTH_SECRET is required. Add AUTH_SECRET to your .env file.');
  }

  return secret;
}

function sign(payload: string): string {
  return createHmac('sha256', getSecret())
    .update(payload)
    .digest('hex');
}

function safeCompare(a: string, b: string): boolean {
  const aBuffer = Buffer.from(a, 'utf8');
  const bBuffer = Buffer.from(b, 'utf8');

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return timingSafeEqual(aBuffer, bBuffer);
}

export function setAuthCookie(
  cookies: Cookies,
  userId: string,
  rememberMe: boolean
): void {
  const expires = rememberMe
    ? Date.now() + REMEMBER_ME_MAX_AGE_SECONDS * 1000
    : 'session';

  const payload = `${userId}:${expires}`;
  const signature = sign(payload);

  cookies.set(COOKIE_NAME, `${payload}:${signature}`, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',

    // If rememberMe is false, this becomes a browser session cookie.
    ...(rememberMe ? { maxAge: REMEMBER_ME_MAX_AGE_SECONDS } : {})
  });
}

export function getAuthUserId(cookies: Cookies): string | null {
  const raw = cookies.get(COOKIE_NAME);

  if (!raw) {
    return null;
  }

  const lastColon = raw.lastIndexOf(':');

  if (lastColon === -1) {
    return null;
  }

  const payload = raw.slice(0, lastColon);
  const signature = raw.slice(lastColon + 1);

  const expectedSignature = sign(payload);

  if (!safeCompare(signature, expectedSignature)) {
    return null;
  }

  const [userId, expires] = payload.split(':');

  if (!userId || !expires) {
    return null;
  }

  if (expires !== 'session') {
    const expiresAt = Number(expires);

    if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) {
      return null;
    }
  }

  return userId;
}

export function clearAuthCookie(cookies: Cookies): void {
  cookies.delete(COOKIE_NAME, {
    path: '/'
  });
}