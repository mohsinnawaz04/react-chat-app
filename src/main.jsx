import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Login from "./Components/Auth/Login/Login.jsx";
import Signup from "./Components/Auth/Signup/Signup.jsx";
import ChatBox from "./Components/ChatBox/ChatBox.jsx";
import PrivateLayout from "./Components/PrivateLayout/PrivateLayout.jsx";
import AuthLayout from "./Components/AuthLayout/AuthLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateLayout />,
    children: [
      {
        path: "",
        element: <ChatBox />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Signup />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
