"use client";

import { useSession } from "next-auth/react";

export function SessionWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>; // Это временная заглушка, нам нужно обернуть в SessionProvider в layout
}
