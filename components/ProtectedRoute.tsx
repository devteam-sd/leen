"use client";

import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import AccessDenied from "./accessDenied";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <AccessDenied />;
  }

  return <>{children}</>;
}
