const BASE_URL = 'https://sp-taskify-api.vercel.app';
const TEAM_ID = '20-3';

interface LoginRequest {
  email: string;
  password: string;
}

interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

interface LoginResponse {
  user: User;
  accessToken: string;
}

interface ErrorResponse {
  message: string;
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/${TEAM_ID}/auth/login`, {
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


