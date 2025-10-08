import React from "react"

const ModalContext = React.createContext({
  showModal: false,
  setShowModal: ()=>{},
  deleteIndex : null,
  setDeleteIndex: ()=>{},
  showDeleteModa: false,
  setShowDeleteModal: ()=>{}

})

export default ModalContext