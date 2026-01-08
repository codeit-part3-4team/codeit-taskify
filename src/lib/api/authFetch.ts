const BASE_URL = 'https://sp-taskify-api.vercel.app';
const TEAM_ID = '20-4';

export async function authFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('accessToken')
      : null;

  const res = await fetch(`${BASE_URL}/${TEAM_ID}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'API 요청 실패');
  }

  return res.json();
}
