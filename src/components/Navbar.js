"use client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await fetch("/api/auth/token", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch token");

        const { token } = await res.json();
        if (!token) return;

        const decoded = jwtDecode(token);
        setUserName(decoded.name || "Usuario");
      } catch (error) {
        console.error("Error fetching or decoding token:", error);
      }
    };

    fetchToken();
  }, []);

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        {/* Logo */}
        <h1 className="text-lg sm:text-xl font-bold text-center sm:text-left">
          ShortLink
        </h1>

        {/* User + Logout */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          {/* Username con estilos distintos en pantallas pequeñas */}
          <span className="text-sm sm:text-base text-center sm:text-left bg-blue-700 sm:bg-transparent px-2 py-1 rounded-md">
            Bienvenido,{" "}
            <span className="font-semibold text-white">{userName}</span>
          </span>

          {/* Botón logout */}
          <button
            onClick={async () => {
              try {
                await fetch('/api/auth/logout', {
                  method: 'GET',
                  credentials: 'include'
                });
                router.push('/');
              } catch (error) {
                console.error('Error during logout:', error);
                if (error.message === 'AUTH_REDIRECT' || error.response?.status === 401) {
                  router.push('/');
                }
              }
            }}
            className="bg-red-500 hover:bg-red-600 text-white text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2 rounded-md w-full sm:w-auto text-center"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

