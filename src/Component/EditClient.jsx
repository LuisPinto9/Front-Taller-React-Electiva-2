import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";

const EditClient = ({ rowData, setFlag }) => {
  const [visible, setVisible] = useState(false);
  const [id, setID] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setID(rowData.id)
    setPhone(rowData.celphone);
    setName(rowData.name);
    setEmail(rowData.email)
  }, []);

  const EditClient = () => {

    let mutuation = `mutation UpdateClient($updateClientId2: ID!, $updateClientName3: String, $updateClientCelphone3: String, $updateClientEmail3: String) {
      updateClient(id: $updateClientId2, name: $updateClientName3, celphone: $updateClientCelphone3, email: $updateClientEmail3) {
        id
        email
        celphone
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
          variables: {updateClientId2: id, updateClientName3: name, updateClientCelphone3: phone, updateClientEmail3: email}
      })
    }).then(respuesta=> respuesta.json())
    .then((result)=> {
      alert(result.data)
      setFlag(true)
    })
    .catch(error => alert(error))

  };
  return (
    <div className="card flex justify-content-center">
      <Button
        label="Edit"
        icon="pi pi-user-edit"
        severity="warning"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Header"
        visible={visible}
        modal={false}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        {/**Form */}
        <div className="card flex flex-column md:flex-row gap-3">
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">ID</span>
            <InputNumber placeholder="ID" value={rowData.id} disabled/>
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-google"></i>
            </span>
            <InputText
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-phone"></i>
            </span>
            <InputText
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <Button
          label="editar"
          icon="pi pi-user-edit"
          severity="warning"
          onClick={() => EditClient()}
        />
        {/**End Form */}
      </Dialog>
    </div>
  );
};

export default EditClient;
