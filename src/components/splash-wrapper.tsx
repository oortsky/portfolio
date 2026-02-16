"use client";

import React, { useState } from "react";
import { SplashScreen } from "@/components/splash-screen";

export function SplashWrapper({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState<boolean>(true);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      {!showSplash && <div>{children}</div>}
    </>
  );
}
