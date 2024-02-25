import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

const Form = () => {
  const [visible, setVisible] = useState(false);
  const [id, setID] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const saveClient = () => {
    console.log(`id: ${id} name: ${name} email: ${email} phone: ${phone}`);
    let mutuation = `mutation CreateClient($createClientId: ID!, $name: String!, $celphone: String, $email: String) {
        createClient(id: $createClientId, name: $name, celphone: $celphone, email: $email) {
          name
          id
          email
          celphone
        }
      }`;

      fetch("http://localhost:4000/graphql",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            query: mutuation,
            variables: {createClientId: id, name: name, celphone: phone, email: email}
        })
      }).then(respuesta=> respuesta.json())
      .then((result)=> alert(result.data))
      .catch(error => alert(error))
  };
  return (
    <>
      <Button
        label="Show"
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
      />
      {/**Abre modal*/}
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
            <InputNumber
              placeholder="ID"
              onChange={(e) => setID(e.value)}
            />
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
        <Button
          label="acceptar"
          icon="pi pi-check"
          onClick={() => saveClient()}
        />
        {/**End Form */}
      </Dialog>
      {/**Cierra Modal */}
    </>
  );
};

export default Form;
