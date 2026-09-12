import { Navigate } from "react-router";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isLoggedIn = localStorage.getItem("x-auth-token");

  return !isLoggedIn ? <Navigate to="/login" /> : children;
}
