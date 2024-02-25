import { useState } from "react";
import DeleteClient from "./Component/DeleteClient"
import Form from "./Component/Form"
import Table from "./Component/Table"

function App() {
  const [flag, setFlag] = useState(false);

  return (
    <>
    <Table flag={flag} setFlag={setFlag}/>
    <Form setFlag={setFlag}/>
    <DeleteClient setFlag={setFlag}/>
    </>
  )
}

export default App
