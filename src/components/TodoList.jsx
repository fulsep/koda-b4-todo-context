import React, { useContext, useState } from 'react'
import TodoContext from './TodoContext'
import { FaTrash } from 'react-icons/fa6'
import { DeleteModalContext, EditModalContext } from './ModalContext'
import Modal from './Modal'
import { TodoModalContext } from './ModalContext'
import  AddTodoForm  from "./AddTodoForm"
import { MdEdit } from "react-icons/md";

function TodoList() {
  const [showModal, setShowModal] = React.useState(false)
  const todoCtx = React.useContext(TodoContext)
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [selectedItem, setSelectedItem] = React.useState(null)
  const toggleModalDelete = (idx) => {
    setShowModal(!showModal)
    setSelectedItem(idx)
  }
  const toggleModalEdit = (idx) => {
    setShowModalEdit(!showModal)
    setSelectedItem(idx)
  }
  return (
    <EditModalContext.Provider value={{ showModal: showModalEdit, setShowModal: setShowModalEdit }}>
      <DeleteModalContext.Provider value={{ showModal, setShowModal }}>
        <div className='flex flex-col gap-5 mb-24'>
          {todoCtx.data.map((todo, idx) => {
            return (<TodoItem todo={todo} index={idx} onDelete={() => toggleModalDelete(idx)} onEdit={() => toggleModalEdit(idx)} />)
          })}
          <DeleteModal item={selectedItem} />
          <EditModal item={selectedItem} />
        </div>
      </DeleteModalContext.Provider>
    </EditModalContext.Provider>

  )
}

const TodoItem = (props) => {
  const [showOptions, setShowOptions] = React.useState(false)
  return (
    <div onDoubleClick={() => setShowOptions(!showOptions)} className='bg-blue-500 select-none text-white p-5 rounded relative group'>
      <div className='flex justify-between'>
        <div className='font-bold'>{props.todo.title}</div>
        <div>{props.todo.time}</div>
      </div>
      <div className='whitespace-pre'>{props.todo.body}</div>
      {showOptions ? <div onDoubleClick={() => setShowOptions(!showOptions)} className='flex absolute top-0 left-0 flex-col gap-3 px-5 justify-center items-end w-full h-full bg-linear-to-r from-transparent to-blue-500'>
        <button onClick={() => props.onDelete(props.index)} className='text-red-300'>
          <FaTrash size={28} />
        </button>
        <button onClick={() => props.onEdit(props.index)} className='text-yellow-300'>
          <MdEdit size={28} />
        </button>
      </div> : <>
        <div className='group-hover:flex absolute top-0 left-0 hidden flex-col px-5 justify-center items-end w-full h-full gap-3 bg-linear-to-r from-transparent to-blue-500'>
          <button onClick={() => props.onDelete(props.index)} className='text-red-300'>
            <FaTrash size={28} />
          </button>
          <button onClick={() => props.onEdit(props.index)} className='text-yellow-300'>
            <MdEdit size={28} />
          </button>
        </div>
      </>}

    </div>
  )
}

const DeleteModal = (props) => {
  const todoCtx = useContext(TodoContext)
  const modalCtx = useContext(DeleteModalContext)

  const confirmDelete = () => {
    todoCtx.setData(todoCtx.data.filter((_, index) => index !== props.item))
    modalCtx.setShowModal(false)
  }

  if (modalCtx.showModal) {
    return (
      <Modal modalCtx={modalCtx} title="Are you sure?">
        <div>Delete selected item?</div>
        <div className='flex justify-end gap-5'>
          <button className='text-black  px-5 py-2 rounded' type="button" onClick={() => modalCtx.setShowModal(false)}>
            <span>Cancel</span>
          </button>
          <button onClick={confirmDelete} className='text-white bg-blue-500 px-5 py-2 rounded' type="submit">
            <span>Yes</span>
          </button>
        </div>
      </Modal>
    )
  }
  return (<></>)
}

const EditModal = (props) => {
  const modalCtx = React.useContext(EditModalContext)
  const todoCtx = React.useContext(TodoContext)

  if(modalCtx.showModal){
    return (
      <Modal modalCtx={modalCtx} title="Add Edit Todo">
        <AddTodoForm indexEdit={props.item} todoCtx={todoCtx} onClose={() => modalCtx.setShowModal(false)} />
      </Modal>
    )
  }
  return <></>
}
export default TodoList