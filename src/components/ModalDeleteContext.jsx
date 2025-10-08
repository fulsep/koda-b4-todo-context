import React from "react"

const ModalDeleteContext = React.createContext({
  showModalDelete: false,
  setShowModalDelete: ()=>{}
})

export default ModalDeleteContext