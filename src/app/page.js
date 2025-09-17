import Image from "next/image";

export default function Home() {
  const loginUrl = process.env.NEXT_PUBLIC_KEYCLOAK_OPENID_URL + '/auth?client_id='+ process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID +'&response_type=code&scope=openid&redirect_uri=' + process.env.NEXT_PUBLIC_REDIRECT_URI;

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-4">
      <h1 className="text-6xl font-bold mb-4 text-center">ShortLink</h1>
      <h2 className="text-2xl font-semibold mb-2 text-center">Simplifica tus enlaces</h2>
      <p className="text-xl mb-4 text-center max-w-2xl">
        Transforma tus URLs largas en enlaces cortos y elegantes. Comparte fácilmente, gestiona todos tus enlaces en un solo lugar.
      </p>
      <p className="text-md mb-8 text-center text-indigo-200">
        Proyecto de código abierto - Repositorios: {' '}
        <a href="https://github.com/tavosud/shortlink-frontend" className="underline hover:text-white" target="_blank" rel="noopener noreferrer">Frontend</a> {' '}
        y {' '}
        <a href="https://github.com/tavosud/shortlink-api" className="underline hover:text-white" target="_blank" rel="noopener noreferrer">Backend</a>
      </p>
      <a
        href={loginUrl}
        className="px-8 py-4 bg-white text-indigo-600 rounded-xl shadow-lg font-semibold hover:bg-gray-100 transition-colors duration-300 text-lg flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
        Comenzar ahora
      </a>
    </div>
  );
}
