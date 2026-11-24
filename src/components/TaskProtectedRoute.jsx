import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";


function TaskProtectedRoute() {

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
        to="/task-login"
        replace
      />
    );

  }


  return <Outlet />;

}


export default TaskProtectedRoute;