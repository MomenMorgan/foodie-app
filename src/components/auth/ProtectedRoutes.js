import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../pages/TokenContext";

export default function ProtectedRoutes({path, confirm}) {
  const { token, user } = useAuth();

  console.log(user);

  if (confirm === "token"? token : token && user?.role === "admin") {
    return <Outlet />;
  } else {
    return <Navigate to={confirm === "token"?path: "/"} />;
  }

}
