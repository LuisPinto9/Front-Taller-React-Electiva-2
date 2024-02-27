import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Card } from "primereact/card";

const Reservation = () => {
  const [id, setID] = useState(0);
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");

  const [service, setservice] = useState("");
  const [comments, setcomments] = useState("");
  const [idCliente, setidCliente] = useState(0);

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

    fetch("https://graph-ql-api-two.vercel.app/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: mutuation,
        variables: {
          createReservationId: id,
          bookingStartDate: StartDate,
          bookingEndDate: EndDate,
          service: service,
          idClient: idCliente,
          comments: comments,
        },
      }),
    })
      .then((respuesta) => respuesta.json())
      .then((result) => {
        alert(result.data.createReservation);
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
            placeholder="StartDate"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <i className="pi pi-google"></i>
          </span>
          <InputText
            placeholder="EndDate"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <i className="pi pi-phone"></i>
          </span>
          <InputText
            placeholder="Servicio"
            onChange={(e) => setservice(e.target.value)}
          />
        </div>

        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <i className="pi pi-google"></i>
          </span>
          <InputText
            placeholder="comentarios"
            onChange={(e) => setcomments(e.target.value)}
          />
        </div>
        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <i className="pi pi-phone"></i>
          </span>
          <InputText
            placeholder="idCliente"
            onChange={(e) => setidCliente(e.target.value)}
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
