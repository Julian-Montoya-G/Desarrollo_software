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
import Contacts from "./pages/Contacts";
import ContactForm from "./pages/ContactForm";
import ContactDetail from "./pages/ContactDetail";
import EditContact from "./pages/EditContact";

import Fruits from "./pages/Fruits";
import NetworkTest from "./pages/NetworkTest";

import Sensors from "./pages/Sensors";
import Geolocation from "./pages/Geolocation";
import Camera from "./pages/Camera";
import Motion from "./pages/Motion";
import Device from "./pages/Device";
import Haptics from "./pages/Haptics";
import FilesystemPage from "./pages/Filesystem";
import Notifications from "./pages/Notifications";
import PushNotifications from "./pages/PushNotifications";

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

        <Route
            path="/contacts"
            element={<Contacts />}
        />

        <Route
             path="/contacts/new"
            element={<ContactForm />}
        />

        <Route
            path="/contacts/:id"
            element={<ContactDetail />}
        />

        <Route
            path="/contacts/:id/edit"
            element={<EditContact />}
        />

        <Route
            path="/contacts/:id/edit"
            element={<EditContact />}
        />

        <Route
            path="/fruits"
            element={<Fruits />}
        />

        <Route
            path="/network-test"
            element={<NetworkTest />}
        />

        {/* Rutas challenge_7*/}

        <Route
            path="/sensors"
            element={<Sensors />}
        />

        <Route 
          path="/sensors/geolocation"
          element={<Geolocation/>}
        />

        <Route
          path="/sensors/camera"
          element={<Camera/>}
        />

        <Route
          path="/sensors/motion"
          element={<Motion />}
        />

        <Route
          path="/sensors/device"
          element={<Device/>}
        />

        <Route
          path="/sensors/haptics"
          element={<Haptics/>}
        />

        <Route
          path="/sensors/filesystem"
          element={<FilesystemPage/>}
        />

        <Route
          path="/sensors/notifications"
          element={<Notifications />}
        />

        <Route
          path="/sensors/push-notifications"
          element={<PushNotifications />}
        />

        <Route
          path="/sensors/network"
          element={<NetworkTest />}
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