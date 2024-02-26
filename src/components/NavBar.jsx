import React from "react";
import { Menubar } from "primereact/menubar";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const NavBar = () => {
  const items = [
    {
      id: "home",
      label: "Home",
      icon: "pi pi-home",
      url: "/",
    },
    {
      id: "reservaciones",
      label: "Reservaciones",
      icon: "pi pi-link",
      url: "/reservaciones",
    },
  ];
  return (
    <div className="card">
      <Menubar model={items} />
    </div>
  );
};

export default NavBar;
