import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuthStore } from "./authStore";

const RequireAuth = ({ children, to }: { children: ReactNode; to: string }) => {
  const isAuthenticated = useAuthStore((store) => store.isAuthenticated);

  return isAuthenticated ? <>{children}</> : <Navigate to={to} />;
};

export { RequireAuth };
