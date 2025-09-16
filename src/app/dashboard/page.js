"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import UrlForm from "@/components/UrlForm";
import UrlList from "@/components/UrlList";
import api from "@/lib/axios";

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );
}
//import "@/styles/dashboard.css"; // importa tu CSS

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchUrls = useCallback(async (retryCount = 0) => {
    setIsLoading(true);
    try {
      const res = await api.get("/my-urls");
      setUrls(res.data);
    } catch (err) {
      //console.error('Error fetching URLs:', err);
      if (err.message === 'AUTH_REDIRECT') {
        router.push('/');
        return;
      }
      if (err.response?.status === 401 && retryCount < 2) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return fetchUrls(retryCount + 1);
      }
    } finally {
      setIsLoading(false);
    }
   }, [router]);

  useEffect(() => {
    let isSubscribed = true;

    const checkAuthAndFetchUrls = async () => {
      try {
        const res = await fetch("/api/auth/token", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const { token } = await res.json();
          if (token && isSubscribed) {
            await fetchUrls(0);
            return;
          }
        }

        if (isSubscribed) router.replace("/");
      } catch (error) {
        //console.error('Error checking auth:', error);
        if (isSubscribed) router.replace("/");
      }
    };

    checkAuthAndFetchUrls();

    return () => {
      isSubscribed = false;
    };
  }, [router, fetchUrls]);

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="max-w-6xl mx-auto">
          <h1 className="title">Mis URLs</h1>

          <div className="dashboard-grid">
            <div className="card">
              <UrlForm onSuccess={fetchUrls} isLoading={isLoading} />
            </div>
            <div className="card lg:col-span-2">
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <UrlList urls={urls} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
