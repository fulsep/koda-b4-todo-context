import React from "react"

const ModalDeleteContext = React.createContext({
  showModal: false,
  setShowModal: ()=>{}
})

export default ModalDeleteContext