"use client";

import { useEffect } from "react";
import MainProvider from "@/providers/main-provider";
import { initMixpanel } from "@/config/mixpanel";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    initMixpanel(); // Initialize Mixpanel
  }, []);

  return <MainProvider>{children}</MainProvider>;
}