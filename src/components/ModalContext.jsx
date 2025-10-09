import React from "react"

export const TodoModalContext = React.createContext({
  showModal: false,
  setShowModal: ()=>{}
})

export const DeleteModalContext = React.createContext({
  showModal: false,
  setShowModal: ()=>{}
})

export const RenameModalContext = React.createContext({
  showModal: false,
  setShowModal: () =>{}
})