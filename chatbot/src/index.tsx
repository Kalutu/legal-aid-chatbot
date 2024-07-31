import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import Login from "./Pages/Login";
import { Toaster } from "react-hot-toast";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Chat from "./Pages/Chat";
import Controller from "./Components/Controller";
import Reporting from "./Pages/Reporting";
import Report from "./Pages/Report";
import { Provider } from "react-redux";
import store from "./store";
import axios from "axios";
import Register from "./Pages/Register";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const storedUserInfo = localStorage.getItem("userInfo");

const user = storedUserInfo ? JSON.parse(storedUserInfo) : null;

if (user !== null) {
  const token = user.data;

  axios.defaults.headers["x-auth-token"] = token;
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster position="top-right"></Toaster>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Controller />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat/reporting" element={<Reporting />} />
            <Route path="/reports" element={<Report />} />
            <Route path="/chat/:id" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
