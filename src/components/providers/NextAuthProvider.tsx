"use client";

import { SessionProvider } from "next-auth/react";

export default function NextAuthProvider({ children }: RootProvider) {
  return <SessionProvider>{children}</SessionProvider>;
}
