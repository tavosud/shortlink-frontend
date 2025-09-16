import Image from "next/image";

export default function Home() {
  const loginUrl = process.env.NEXT_PUBLIC_KEYCLOAK_OPENID_URL + '/auth?client_id='+ process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID +'&response_type=code&scope=openid&redirect_uri=' + process.env.NEXT_PUBLIC_REDIRECT_URI;

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
      <h1 className="text-4xl font-bold mb-6">ShortLink App</h1>
      <a
        href={loginUrl}
        className="px-6 py-3 bg-white text-indigo-600 rounded-xl shadow-lg font-semibold hover:bg-gray-200"
      >
        Login with Keycloak
      </a>
    </div>
  );
}
