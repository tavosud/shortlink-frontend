import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;

    if (!token) {
      return new Response("No token found", { status: 401 });
    }

    // Devolver solo el token
    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    //console.error("Error fetching token:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}