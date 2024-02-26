import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Card } from "primereact/card";

const Reservation = ({ setFlag }) => {
  const [id, setID] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const saveReservation = () => {
    let mutuation = `mutation($createReservationId: ID!, $bookingStartDate: String!, $bookingEndDate: String!, $service: String!, $idClient: ID!, $comments: String) {
        createReservation(id: $createReservationId, bookingStartDate: $bookingStartDate, bookingEndDate: $bookingEndDate, service: $service, idClient: $idClient, comments: $comments) {
          bookingEndDate
          bookingStartDate
          comments
          id
          service
        }
      }`;

    fetch("https://graph-ql-api-git-main-binmexs-projects.vercel.app/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: mutuation,
        variables: {
          createClientId: id,
          name: name,
          celphone: phone,
          email: email,
        },
      }),
    })
      .then((respuesta) => respuesta.json())
      .then((result) => {
        alert(result.data);
        setFlag(true);
      })
      .catch((error) => alert(error));
  };
  return (
    <Card title="Agregar Reservación">
      {/**Form  */}
      <div className="card flex flex-column md:flex-row gap-3">
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">ID</span>
          <InputNumber placeholder="ID" onChange={(e) => setID(e.value)} />
        </div>

        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
          </span>
          <InputText
            placeholder="Username"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <i className="pi pi-google"></i>
          </span>
          <InputText
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <i className="pi pi-phone"></i>
          </span>
          <InputText
            placeholder="Celular"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      <div>
        <Button
          label="aceptar"
          icon="pi pi-check"
          onClick={() => saveReservation()}
        />
      </div>
    </Card>
  );
};

export default Reservation;
