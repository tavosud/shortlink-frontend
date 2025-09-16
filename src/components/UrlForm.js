"use client";
import { useState } from "react";
import api from "@/lib/axios"; // usar cliente con interceptores

export default function UrlForm({ onSuccess, isLoading }) {
  const [url, setUrl] = useState("");
  const [short, setShort] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setShort(null);

    try {
      // No necesitas pedir el token manualmente
      const res = await api.post("/shorten", { url });

      setShort(res.data.short_url);
      setUrl("");
      onSuccess();
    } catch (err) {
      //console.error("Error al acortar URL:", err);
      setError(
        err.response?.data?.message || "Ocurrió un error al intentar acortar la URL o alcanzo el maximo permitido (5 URLs por usuario)."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Ingresa tu URL"
          className="flex-1 px-4 py-2 border rounded-lg disabled:bg-gray-100"
          required
          disabled={isLoading}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Procesando...</span>
            </>
          ) : (
            'Acortar'
          )}
        </button>
      </div>
      {short && (
        <p className="mt-2 text-green-600">
          URL acortada:{" "}
          <a href= { process.env.NEXT_PUBLIC_API_BASE_URL + short} target="_blank" rel="noreferrer" className="underline">
            {short}
          </a>
        </p>
      )}
      {error && <p className="mt-2 text-red-600">{error}</p>}
    </form>
  );
}
