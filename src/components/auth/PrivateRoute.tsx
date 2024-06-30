import React from "react";
import { Navigate } from "react-router";
import { useRecoilState } from "recoil";
import { userAtom } from "../../store/atom/user";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const [user] = useRecoilState(userAtom);

  if (user == null) {
    return <Navigate to="/login" replace={true} />;
  }
  return <div>{children}</div>;
}

export default PrivateRoute;
