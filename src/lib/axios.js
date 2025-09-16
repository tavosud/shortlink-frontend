// src/lib/api.js
import axios from "axios";

const fetchToken = async () => {
  try {
    const res = await fetch("/api/auth/token", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Failed to fetch token:", errorText);
      window.location.href = "/";
      throw new Error(errorText || "Failed to fetch token");
    }

    const data = await res.json();
    if (!data.token) {
      throw new Error("Token not found in response");
    }

    return data.token;
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error;
  }
};

const refreshToken = async () => {
  try {
    const res = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Failed to refresh token:", errorText);
      throw new Error(errorText || "Failed to refresh token");
    }

    // después de refrescar, pedimos el nuevo access_token
    return await fetchToken();
  } catch (error) {
    window.location.href = "/";
    console.error("Error refreshing token:", error);
    throw error;
  }
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

// Variable para controlar el primer intento después del login
let isFirstAttempt = true;
let loginTimeout = null;

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    try {
      // Si es el primer intento después del login, esperar un momento
      if (isFirstAttempt) {
        isFirstAttempt = false;
        // Limpiar cualquier timeout existente
        if (loginTimeout) clearTimeout(loginTimeout);
        // Esperar 2 segundos antes de hacer la primera petición
        await new Promise(resolve => {
          loginTimeout = setTimeout(resolve, 2000);
        });
      }

      const token = await fetchToken();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    } catch (error) {
      console.error('Error in request interceptor:', error);
      // Lanzar el error para que sea manejado por el componente
      if (error.message.includes('No token found') || 
          error.message.includes('Token not found')) {
        throw new Error('AUTH_REDIRECT');
      }
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Solo intentar refresh si es error 401 y no es un retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // evitar loop infinito
      try {
        const newToken = await refreshToken();
        // Si llegamos aquí, el refresh fue exitoso
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest); // reintentar la request con el token nuevo
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        // Restablecer el estado de primer intento antes de lanzar el error
        isFirstAttempt = true;
        if (loginTimeout) clearTimeout(loginTimeout);
        throw new Error('AUTH_REDIRECT');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
