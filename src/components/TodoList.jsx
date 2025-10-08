import React, { useState } from 'react'
import TodoContext from './TodoContext'
import ModalDeleteContext from '../components/ModalDeleteContext'
import Modal from "../components/Modal"
import ConfirmDelete from "../components/ConfirmDelete"
import { FaRegTrashAlt } from 'react-icons/fa'

function TodoList() {
  const todoCtx = React.useContext(TodoContext)
  const {showModalDelete, setShowModalDelete} = React.useContext(ModalDeleteContext)
  const [idDelete, setIdDelete] = useState("")
  const handleDelete = () => {
    const updatedTasks = todoCtx.data.filter((item) => item.id !== idDelete);
    todoCtx.setData(updatedTasks);
    setIdDelete("")
    setShowModalDelete(false)
  }
  return (
    <div className='flex flex-col gap-5 mb-24'>
      {showModalDelete && 
        <Modal title="Confirm Delete">
          <ConfirmDelete onConfirm={()=>handleDelete()} onClose={()=>setShowModalDelete(false)} />
        </Modal>
      }
      {todoCtx.data.map(todo => {
        return (
          <div key={todo.id} className='bg-blue-500 text-white p-5 rounded'>
            <div className='flex justify-between'>
              <div className='font-bold'>{todo.title}</div>
              <div className='flex gap-2 items-center'>
                <div>{todo.time}</div>
                <button onClick={()=>{
                  setIdDelete(todo.id)
                  setShowModalDelete(!showModalDelete)}}>
                  <FaRegTrashAlt />
                </button>
              </div>
            </div>
            <div className='whitespace-pre'>{todo.body}</div>
          </div>
        )
      })}
    </div>
  )
}

export default TodoList