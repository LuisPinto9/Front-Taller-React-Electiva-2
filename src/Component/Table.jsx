import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const Table = () => {
  const [client, setClient] = useState([]);
  const [reservation, setReservation] = useState([]);
  const [visible, setVisible] = useState(false);

  const loadClient = () => {
    let query = `query GetAllClient {
        getAllClient {
          name
          id
          email
          celphone
          reservations {
            bookingStartDate
            bookingEndDate
            comments
            id
            service
          }
        }
      }`;

    fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((respuesta) => respuesta.json())
      .then((result) => {
        result.data.getAllClient.forEach(client => {
            client.reservations.forEach(reservation => {
              reservation.bookingStartDate = new Date(parseInt(reservation.bookingStartDate)).toLocaleDateString();
              reservation.bookingEndDate = new Date(parseInt(reservation.bookingEndDate)).toLocaleDateString();
            });
          });
        setClient(result.data.getAllClient);
      });
  };

  const loadReservation = (row) => {
    console.log(row.reservations);
    setReservation(row.reservations)
    setVisible(true)
  }

  useEffect(() => {
    loadClient();
  }, []);

  return (
    <div className="card">
      <div className="card">
        <DataTable value={client} tableStyle={{ minWidth: "50rem" }}>
          <Column field="id" header="Code"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="email" header="email"></Column>
          <Column field="celphone" header="celphone"></Column>
          <Column
              header="Reservations"
              body={(rowData) => (
                <Button
                  label="Reservaciones"
                  icon="pi pi-external-link"
                  onClick={() => loadReservation(rowData)}
                />
              )}
            ></Column>
        </DataTable>
        {/**Dialog del modal */}
        <Dialog
          header="Header"
          visible={visible}
          modal={false}
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
        >
        {/**Table modal */}
          <DataTable value={reservation} tableStyle={{ minWidth: "50rem" }}>
          <Column field="id" header="idReservation"></Column>
            <Column field="bookingStartDate" header="bookingStartDate"></Column>
            <Column field="bookingEndDate" header="bookingEndDate"></Column>
            <Column field="comments" header="comments"></Column>
            <Column field="service" header="service"></Column>
          </DataTable>
        </Dialog>
      </div>
    </div>
  );
};

export default Table;