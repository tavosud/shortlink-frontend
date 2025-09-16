import { NextResponse } from "next/server";

export async function GET(req) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return new Response("No authorization code", { status: 400 });
  }

  try {
    const params = {
      grant_type: "authorization_code", // Cambiado a authorization_code
      code,
      client_id: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_KC_CLIENT_SECRET,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
    };

    //console.log("Sending token request with:", params);

    const tokenRes = await fetch(process.env.NEXT_PUBLIC_KEYCLOAK_OPENID_URL + '/token', {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(params),
    });

    if (!tokenRes.ok) {
      const errorText = await tokenRes.text();
      console.error("Error fetching tokens:", errorText);
      return new Response(`Failed to fetch tokens: ${errorText}`, { status: 401 });
    }

    const tokens = await tokenRes.json();

    const callbackUrl = url.searchParams.get("callbackUrl") || "/dashboard";
    
    // Crear la respuesta de redirección usando NextResponse
    return NextResponse.redirect(new URL(callbackUrl, req.url), {
      headers: {
        'Set-Cookie': [
          `jwt=${tokens.access_token}; HttpOnly; Path=/; Secure; SameSite=Lax; Max-Age=3600`,
          `refresh=${tokens.refresh_token}; HttpOnly; Path=/; Secure; SameSite=Lax; Max-Age=86400`
        ]
      }
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
