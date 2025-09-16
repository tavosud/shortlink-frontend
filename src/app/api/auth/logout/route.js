import { cookies } from "next/headers";

export async function GET(req) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh")?.value;

    // Invalidar la sesión en Keycloak
    if (refreshToken) {
      await fetch(
        process.env.NEXT_PUBLIC_KEYCLOAK_OPENID_URL + '/logout',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_id: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_KC_CLIENT_SECRET,
            refresh_token: refreshToken,
          }),
        }
      );
    }

    // Eliminar las cookies `jwt` y `refresh`
    cookieStore.set("jwt", "", {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0), // Expira inmediatamente
    });

    cookieStore.set("refresh", "", {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0), // Expira inmediatamente
    });

    return Response.redirect(new URL("/", req.url));
  } catch (error) {
    //console.error("Error during logout:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
