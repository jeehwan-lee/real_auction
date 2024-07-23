import React from "react";
import { Navigate } from "react-router";
import { useRecoilState } from "recoil";
import { userAtom } from "../../store/atom/user";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useRecoilState(userAtom);
  const loggedUser = localStorage.getItem("loggedUser");

  if (user == null || !loggedUser) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("loggedUser");

    setUser(null);

    return <Navigate to="/login" replace={true} />;
  }
  return <div>{children}</div>;
}

export default PrivateRoute;
