import React from 'react'
import { useState } from 'react'

const controller = () => {
    
    const [nombre, setNombre] = useState("")

    function traerInfo() {
        fetch()
        setNombre("info")
    }


  return (
    <>
    {nombre}
    </>
  )
}

export default controller