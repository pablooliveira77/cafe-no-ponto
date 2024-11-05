// app/api/management/route.ts
import { NextResponse } from 'next/server';

const AUTH0_DOMAIN = process.env.AUTH0_ISSUER_BASE_URL;
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;

// Função para obter o token de acesso da Auth0 Management API
async function getManagementAccessToken(): Promise<string> {
  try {
    //  requisição com fetch
    const response = await fetch(`${AUTH0_DOMAIN}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: AUTH0_CLIENT_ID,
        client_secret: AUTH0_CLIENT_SECRET,
        audience: AUTH0_AUDIENCE,
        grant_type: 'client_credentials',
      }),
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Erro ao obter o token de acesso:", error);
    throw new Error("Erro ao obter o token de acesso");
  }
}

// Handler para obter `user_metadata` do usuário
export async function GET(request: Request) {
  
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const token = await getManagementAccessToken();
    // requisição com fetch
    const response = await fetch(`${AUTH0_DOMAIN}/api/v2/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    const user_data = {
      user_id: data.user_id,
      username: data.username,
      email: data.email,
      picture: data.picture,
      phone_number: data.phone_number,
      tipo_cargo: data.user_metadata?.tipo_cargo || 'cliente',
    }

    return NextResponse.json(user_data); // Retorna apenas o `user_metadata`
  } catch (error) {
    console.error("Erro ao obter metadados do usuário:", error);
    return NextResponse.json({ error: 'Failed to fetch user metadata' }, { status: 500 });
  }
}
