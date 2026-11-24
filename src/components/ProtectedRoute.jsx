import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";


function ProtectedRoute() {

  const {
    user,
    loading
  } = useAuth();


  if (loading) {

    return <p>Cargando...</p>;

  }


  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  return <Outlet />;

}


export default ProtectedRoute;