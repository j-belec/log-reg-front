import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

import "./sass/main.scss";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import SecondPage from "./components/SecondPage";
import FirstPage from "./components/FirstPage";
import Profile, { profileLoader } from "./components/Profile";
import Password from "./components/Password";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/profile", element: <Profile />, loader: profileLoader },
      { path: "/profile/change-password", element: <Password /> },
      { path: "/first-page", element: <FirstPage /> },
      { path: "/second-page", element: <SecondPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
