"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import { useRouter } from "next/navigation";
import Loading from "../components/ui/loading";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuthAndRedirect() {
      try {
        const res = await fetch(`${API_URL}/auth/me`, {
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
    return <Loading />;
  }

  return null;
}
