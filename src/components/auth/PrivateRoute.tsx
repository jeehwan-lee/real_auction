import React from "react";
import useUser from "../../hooks/auth/userUser";
import { Navigate } from "react-router";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = useUser();

  if (user == null) {
    return <Navigate to="/login" replace={true} />;
  }
  return <div>{children}</div>;
}

export default PrivateRoute;
