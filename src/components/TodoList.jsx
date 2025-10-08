import React, { useContext } from 'react'
import TodoContext from './TodoContext'
import { FaTrash } from 'react-icons/fa6'
import {DeleteModalContext} from './ModalContext'
import Modal from './Modal'

function TodoList() {
  const [showModal, setShowModal] = React.useState(false)
  const todoCtx = React.useContext(TodoContext)
  const [selectedItem, setSelectedItem] = React.useState(null)
  const toggleModal = (idx)=>{
    setShowModal(!showModal)
    setSelectedItem(idx)
  }
  return (
    <DeleteModalContext.Provider value={{showModal, setShowModal}}>
      <div className='flex flex-col gap-5 mb-24'>
        {todoCtx.data.map((todo,idx) => {
          return (<TodoItem todo={todo} index={idx} onAction={()=>toggleModal(idx)} />)
        })}
        <DeleteModal item={selectedItem} />
      </div>
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
        <button onClick={()=>props.onAction(props.index)} className='text-red-300'>
          <FaTrash size={28} />
        </button>
      </div> : <>
        <div className='group-hover:flex absolute top-0 left-0 hidden flex-col px-5 justify-center items-end w-full h-full bg-linear-to-r from-transparent to-blue-500'>
          <button onClick={()=>props.onAction(props.index)} className='text-red-300'>
            <FaTrash size={28} />
          </button>
        </div>
      </>}
    </div>
  )
}

const DeleteModal = (props)=>{
  const todoCtx = useContext(TodoContext)
  const modalCtx = useContext(DeleteModalContext)

  const confirmDelete = ()=>{
    todoCtx.setData(todoCtx.data.filter((_,index)=>index!==props.item))
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

export default TodoList