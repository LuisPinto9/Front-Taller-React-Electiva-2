import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import NavBar from "../components/NavBar"

const Router = () => {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route exact path="/" Component={App} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
