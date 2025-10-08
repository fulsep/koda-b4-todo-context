import React from "react"

const ModalContext = React.createContext({
  showModal: false,
  setShowModal: ()=>{},
  showModalDelete : false,
  deleteIndex : null,
  setDeleteIndex: ()=>{},
  setShowModalDelete : ()=>{}

})

export default ModalContext