"use client";

import { Suspense } from "react";
import Callback from "@/app/dashboard/social-accounts/callback/callback";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading callback...</p>}>
      <Callback />
    </Suspense>
  );
}
