import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import TaskForm from "./pages/TaskForm";
import TaskDetail from "./pages/TaskDetail";

import ProtectedRoute
  from "./components/ProtectedRoute";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Rutas públicas */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* Rutas protegidas */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/tasks"
            element={<Tasks />}
          />

          <Route
            path="/tasks/new"
            element={<TaskForm />}
          />

          <Route
            path="/tasks/:id"
            element={<TaskDetail />}
          />

          <Route
            path="/tasks/:id/edit"
            element={<TaskForm />}
          />

        </Route>


        {/* Ruta principal */}

        <Route
          path="/"
          element={
            <Navigate
              to="/tasks"
              replace
            />
          }
        />


        {/* Ruta inexistente */}

        <Route
          path="*"
          element={
            <Navigate
              to="/tasks"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>

  );

}


export default App;