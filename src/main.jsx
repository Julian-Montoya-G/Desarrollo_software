import React from "react";

import {
  createRoot
} from "react-dom/client";

import App from "./App";

import AuthProvider
  from "./contexts/AuthProvider";

import TaskProvider
  from "./contexts/TaskProvider";

import ContactProvider
  from "./contexts/ContactContext";


const container =
  document.getElementById("root");


const root =
  createRoot(container);


root.render(

  <React.StrictMode>

    <AuthProvider>

      <ContactProvider>

        <TaskProvider>

          <App />

        </TaskProvider>

      </ContactProvider>

    </AuthProvider>

  </React.StrictMode>

);