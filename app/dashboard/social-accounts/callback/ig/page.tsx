"use client";

import { Suspense } from "react";
import Callback from "./Callback";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading callback...</p>}>
      <Callback />
    </Suspense>
  );
}
