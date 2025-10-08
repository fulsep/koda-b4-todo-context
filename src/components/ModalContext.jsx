import React from "react"

export const TodoModalContext = React.createContext({
  showModal: false,
  setShowModal: ()=>{}
})

export const DeleteModalContext = React.createContext({
  showModal: false,
  setShowModal: ()=>{}
})

export const EditModalContext = React.createContext({
  showModal: false,
  setShowModal: ()=>{}
})