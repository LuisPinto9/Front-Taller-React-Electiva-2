import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";

const DeleteClient = ({setFlag}) => {
  const [visible, setVisible] = useState(false);
  const [id, setID] = useState(0);

  const deleteClient = () => {
    let mutuation = `mutation DeleteClient($deleteClientId: ID!) {
        deleteClient(id: $deleteClientId) {
          celphone
          email
          id
          name
        }
      }`;

      fetch("https://graph-ql-api-git-main-binmexs-projects.vercel.app/graphql",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            query: mutuation,
            variables: {deleteClientId: id}
        })
      }).then(respuesta=> respuesta.json())
      .then((result)=> {
        alert(result.data)
        setFlag(true)
      })
      .catch(error => alert(error))
      
  }
  return (
    <div className="card flex justify-content-center">
      <Button
        label="Delete"
        icon="pi pi-eraser"
        severity="danger"
        onClick={() => setVisible(true)}
      />
      {/**start modal */}
      <Dialog
        header="Eliminar Cliente"
        visible={visible}
        modal={false}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">ID</span>
            <InputNumber placeholder="ID" onChange={(e) => setID(e.value)} />
            <Button
        label="Delete"
        icon="pi pi-eraser"
        severity="danger"
        onClick={() => deleteClient()}
      />
          </div>
      </Dialog>
      {/**End Modal */}
    </div>
  );
};

export default DeleteClient;
