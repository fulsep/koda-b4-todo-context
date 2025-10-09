import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import {TodoModalContext} from '../../components/ModalContext'
import Modal from '../../components/Modal'
import TodoContext from '../../components/TodoContext'
import AddTodoForm from '../../components/AddTodoForm'

function Main() {
  const [showModal, setShowModal] = React.useState(false)
  const [todo, setTodo] = React.useState(JSON.parse(localStorage.getItem("todo"))|| [])
  React.useEffect(()=>{
    localStorage.setItem("todo", JSON.stringify(todo))
  },[todo])
  return (
    <TodoContext.Provider value={{data:todo, setData: setTodo}}>
      <TodoModalContext.Provider value={{showModal, setShowModal}}>
        <div className='bg-gray-200 min-h-screen relative'>
          <div className='max-w-md w-full mx-auto relative'>
            <div className='p-2 bg-gray-100 min-h-[calc(theme(height.screen)-theme(height.12))] flex flex-col'>
              <Outlet />
            </div>
            <Navbar />
            {showModal && <AddTodoModal />}
          </div>
        </div>
      </TodoModalContext.Provider>
    </TodoContext.Provider>
  )
}

const AddTodoModal = ()=>{
  const modalCtx = React.useContext(TodoModalContext)
  const todoCtx = React.useContext(TodoContext)
  return(
    <Modal modalCtx={modalCtx} title="Add New Todo">
      <AddTodoForm todoCtx={todoCtx} onClose={()=>modalCtx.setShowModal(false)} />
    </Modal>
  )
}

export default Main