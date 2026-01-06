const BASE_URL = 'https://sp-taskify-api.vercel.app';
const TEAM_ID = '20-4';

interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
}

interface SignupResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ErrorResponse {
  message: string;
}

export async function signup(data: SignupRequest): Promise<SignupResponse> {
  const response = await fetch(`${BASE_URL}/${TEAM_ID}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}
