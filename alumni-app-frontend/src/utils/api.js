import { API_BASE_URL } from '../../config';

export async function fetchWithAuth(url, options = {}, accessToken) {
  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
}