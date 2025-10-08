import React, { useContext } from 'react'
import TodoContext from './TodoContext'
import { FaPencil, FaTrash } from 'react-icons/fa6'
import {DeleteModalContext, EditModalContext} from './ModalContext'
import Modal from './Modal'
import TodoForm from './TodoForm'

function TodoList() {
  const [showModal, setShowModal] = React.useState(false)
  const [showEdit, setShowEdit] = React.useState(false)
  const todoCtx = React.useContext(TodoContext)
  const [selectedItem, setSelectedItem] = React.useState(null)
  const toggleModalDelete = (id)=>{
    setShowModal(!showModal)
    setSelectedItem(id)
  }
  const toggleModalEdit = (id)=>{
    setShowEdit(!showEdit)
    setSelectedItem(id)
  }
  return (
    <DeleteModalContext.Provider value={{showModal, setShowModal}}>
      <EditModalContext.Provider value={{showModal: showEdit, setShowModal: setShowEdit}}>
        <div className='flex flex-col gap-5 mb-24'>
          {todoCtx.data.map((todo) => {
            return (<TodoItem key={todo.id} todo={todo} onDelete={()=>toggleModalDelete(todo.id)} onEdit={()=>toggleModalEdit(todo.id)} />)
          })}
          <DeleteModal item={selectedItem} />
          <EditModal idTodo={selectedItem} />
        </div>
      </EditModalContext.Provider>
    </DeleteModalContext.Provider>
  )
}

const TodoItem = (props)=>{
  const [showOptions, setShowOptions] = React.useState(false)
  return(
    <div onDoubleClick={()=>setShowOptions(!showOptions)} className='bg-blue-500 select-none text-white p-5 rounded relative group'>
      <div className='flex justify-between'>
        <div className='font-bold'>{props.todo.title}</div>
        <div>{props.todo.time}</div>
      </div>
      <div className='whitespace-pre'>{props.todo.body}</div>
      {showOptions ? <div onDoubleClick={()=>setShowOptions(!showOptions)} className='flex absolute top-0 left-0 flex-col px-5 justify-center items-end w-full h-full bg-linear-to-r from-transparent to-blue-500'>
        <button onClick={()=>props.onDelete(props.id)} className='text-red-300 cursor-pointer'>
          <FaTrash size={28} />
        </button>
        <button onClick={()=>props.onEdit(props.todo.id)} className='text-white cursor-pointer'>
          <FaPencil size={28} />
        </button>
      </div> : <>
        <div className='group-hover:flex absolute top-0 left-0 hidden flex-col px-5 justify-center items-end w-full h-full bg-linear-to-r from-transparent to-blue-500'>
          <div className='flex items-center gap-2'>
            <button onClick={()=>props.onDelete(props.todo.id)} className='text-red-300 cursor-pointer'>
              <FaTrash size={28} />
            </button>
            <button onClick={()=>props.onEdit(props.todo.id)} className='text-white cursor-pointer'>
              <FaPencil size={28} />
            </button>
          </div>
        </div>
      </>}
    </div>
  )
}

const DeleteModal = (props)=>{
  const todoCtx = useContext(TodoContext)
  const modalCtx = useContext(DeleteModalContext)

  const confirmDelete = ()=>{
    todoCtx.setData(todoCtx.data.filter((data)=>data.id!==props.item))
    modalCtx.setShowModal(false)
  }

  if(modalCtx.showModal){
    return (
      <Modal modalCtx={modalCtx} title="Are you sure?">
        <div>Delete selected item?</div>
        <div className='flex justify-end gap-5'>
          <button className='text-black  px-5 py-2 rounded' type="button" onClick={()=>modalCtx.setShowModal(false)}>
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

const EditModal = (props)=>{
  const todoCtx = useContext(TodoContext)
  const modalCtx = useContext(EditModalContext)
  if(modalCtx.showModal){
    return(
      <Modal modalCtx={modalCtx} title="Edit Todo">
        <TodoForm todoCtx={todoCtx} idTodo={props.idTodo} onClose={()=>modalCtx.setShowModal(false)} />
      </Modal>
    )
  }
  return (<></>)
}

export default TodoList