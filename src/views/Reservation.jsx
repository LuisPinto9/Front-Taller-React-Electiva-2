import React, { useState } from "react";
import DeleteClient from "../components/DeleteClient";
import Form from "../components/Form";
import Table from "../components/Table";

const Reservation = () => {
  const [flag, setFlag] = useState(false);

  return (
    <>
      <Table flag={flag} setFlag={setFlag} />
      <Form setFlag={setFlag} />
      <DeleteClient setFlag={setFlag} />
    </>
  );
};

export default Reservation;
