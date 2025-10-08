import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import ModalContext from '../../components/ModalContext'
import Modal from '../../components/Modal'
import TodoContext from '../../components/TodoContext'
import AddTodoForm from '../../components/AddTodoForm'
import ModalDeleteContext from '../../components/ModalDeleteContext'

function Main() {
  const [showModal, setShowModal] = React.useState(false)
  const [showModalDelete, setShowModalDelete] = React.useState(false)
  const [todo, setTodo] = React.useState(() => {
    try {
      const data = window.localStorage.getItem("todo");
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.log("Failed to parse tasks from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);
  return (
    <TodoContext.Provider value={{data:todo, setData: setTodo}}>
      <ModalContext.Provider value={{showModal, setShowModal}}>
        <ModalDeleteContext.Provider value={{showModal: showModalDelete, setShowModal: setShowModalDelete}}>
          <div className='bg-gray-200 min-h-screen relative'>
            <div className='max-w-md w-full mx-auto relative'>
              <div className='p-2 bg-gray-100 min-h-[calc(theme(height.screen)-theme(height.12))] flex flex-col'>
                <Outlet />
              </div>
              <Navbar />
              {showModal && <AddTodoModal />}
            </div>
          </div>
        </ModalDeleteContext.Provider>
      </ModalContext.Provider>
    </TodoContext.Provider>
  )
}

const AddTodoModal = ()=>{
  const modalCtx = React.useContext(ModalContext)
  const todoCtx = React.useContext(TodoContext)
  return(
    <Modal title="Add New Todo" modalCtx={modalCtx}>
      <AddTodoForm todoCtx={todoCtx} onClose={()=>modalCtx.setShowModal(false)} />
    </Modal>
  )
}

export default Main