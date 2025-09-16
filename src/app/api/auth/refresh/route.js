import { cookies } from "next/headers";

export async function POST(req) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh")?.value;

  if (!refreshToken) {
    return new Response("No refresh token", { status: 401 });
  }

  const res = await fetch(
    process.env.NEXT_PUBLIC_KEYCLOAK_OPENID_URL + "/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_KC_CLIENT_SECRET,
      }),
    }
  );

  if (!res.ok) {
    //const errorText = await res.text();
    //console.error("Token refresh failed:", errorText);
    // Limpiar las cookies existentes ya que el refresh token no es válido
    cookieStore.delete("jwt");
    cookieStore.delete("refresh");
    return new Response("Token refresh failed", { status: 401 });
  }

  const tokens = await res.json();

  // Crear response con cookies usando la API de Next.js
  const cookiesList = await cookies();

  // Establecer las cookies
  await cookiesList.set("jwt", tokens.access_token, {
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "lax",
  });

  await cookiesList.set("refresh", tokens.refresh_token, {
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "lax",
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
