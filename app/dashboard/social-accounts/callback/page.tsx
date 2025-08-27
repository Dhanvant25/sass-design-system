"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGet } from "@/api/apiMethode";

export default function Callback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!code) return; 

    const getInstagramData = async () => {
      try {
        setLoading(true);
        const { res, error } = await useGet("/api/social/instagram/callback", {
          code,
        });

        if (error) {
          console.error("Error fetching Instagram data:", error);
          setError(error.message || "Failed to authenticate");
        } else {
          console.log("Instagram Auth Response:", res);
          // TODO: Save tokens/user data in store or redirect
          router.push("/dashboard");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getInstagramData();
  }, [code, router]);

  return (
    <div className="p-4">
      {loading && <p>Loading Instagram data...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && <p>Instagram callback successful!</p>}
    </div>
  );
}
