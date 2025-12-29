"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuthAndRedirect() {
      try {
        const res = await fetch("http://127.0.0.1:5000/auth/me", {
          credentials: "include",
        });

        const data = await res.json();

        if (data.authenticated && data.user) {
          router.push(`/dashboard/${data.user}`);
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.error("Auth check failed", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    checkAuthAndRedirect();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full text-xl">
        Loading...
      </div>
    );
  }

  return null;
}
