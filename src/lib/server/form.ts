export function getString(formData: FormData, key: string): string {
  return String(formData.get(key) ?? '').trim();
}

export function getOptionalString(
  formData: FormData,
  key: string
): string | null {
  const value = getString(formData, key);

  return value.length > 0 ? value : null;
}

export function getNumber(
  formData: FormData,
  key: string
): number | null {
  const raw = getString(formData, key);

  if (!raw) {
    return null;
  }

  const parsed = Number(raw);

  if (!Number.isFinite(parsed)) {
    return null;
  }

  return parsed;
}

export function getOptionalNumber(
  formData: FormData,
  key: string
): number | null {
  const raw = getString(formData, key);

  if (!raw) {
    return null;
  }

  const parsed = Number(raw);

  if (!Number.isFinite(parsed)) {
    return null;
  }

  return parsed;
}

export function getDate(formData: FormData, key: string): string | null {
  const raw = getString(formData, key);

  if (!raw) {
    return null;
  }

  const date = new Date(raw);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return raw.length === 10 ? raw : date.toISOString().slice(0, 10);
}