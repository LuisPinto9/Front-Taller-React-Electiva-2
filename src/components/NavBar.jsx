import React from "react";
import { Menubar } from "primereact/menubar";

const NavBar = () => {
  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      url: "/"
    },
    {
      label: "Reservaciones",
      url: "/reservaciones"
    },
  ];
  return (
    <div className="card">
      <Menubar model={items} />
    </div>
  );
};

export default NavBar;
