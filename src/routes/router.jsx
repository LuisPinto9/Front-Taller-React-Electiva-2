import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../views/App";
import reservation from "../views/Reservation"
import NavBar from "../components/NavBar"

const Router = () => {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route exact path="/" Component={App} />
        <Route path="/reservaciones" Component={reservation} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
