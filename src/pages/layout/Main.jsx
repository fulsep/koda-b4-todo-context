import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import ModalContext from '../../components/ModalContext'
import TodoContext from '../../components/TodoContext'

function Main() {
  const [showModal, setShowModal] = React.useState(false)
  const [showModalDelete, setShowModalDelete] = React.useState(false)
  const [deleteIndex, setDeleteIndex] = React.useState(null)
  const [todo, setTodo] = React.useState([])
  return (
    <TodoContext.Provider value={{data:todo, setData: setTodo}}>
      <ModalContext.Provider value={{
        showModal, setShowModal,
        showModalDelete, setShowModalDelete,
        deleteIndex, setDeleteIndex
      }}>
        <div className='bg-gray-200 min-h-screen relative'>
          <div className='max-w-md w-full mx-auto relative'>
            <div className='p-2 bg-gray-100 min-h-[calc(theme(height.screen)-theme(height.12))] flex flex-col'>
              <Outlet />
            </div>
            <Navbar />
            {showModal && <Modal />}
            {showModalDelete && <ModalHapus />}
          </div>
        </div>
      </ModalContext.Provider>
    </TodoContext.Provider>
  )
}

const Modal = ()=>{
  const modalCtx = React.useContext(ModalContext)
  const todoCtx = React.useContext(TodoContext)
  const formRef = React.useRef()
  const handleData = (e)=>{
    e.preventDefault()
    const {value: title} = e.target.title
    const {value: body} = e.target.body
    const {value: time} = e.target.time
    todoCtx.setData([
      ...todoCtx.data,
      {title,body,time}
    ])
    toggleModal()
  }
  const toggleModal = ()=>{
    modalCtx.setShowModal(!modalCtx.showModal)
  }
  const animatedDiv = React.createRef()
  React.useEffect(()=>{
    animatedDiv.current.classList.remove("-translate-y-50")
    animatedDiv.current.classList.add("translate-y-0")
  },[animatedDiv])
  return (
    <div className='absolute top-0 left-0 max-w-md w-full h-screen bg-black/50 flex justify-center items-center'>
      <div ref={animatedDiv} className='w-full mx-10 transition-all duration-500 -translate-y-50 bg-white p-5 py-5 rounded flex flex-col gap-3'>
        <h1 className='font-bold text-lg'>Add New Todo</h1>
        <form ref={formRef} onSubmit={handleData} className='flex flex-col gap-2'>
          <div className='flex flex-col gap-1'>
            <label htmlFor="title">Title</label>
            <input autoFocus className='h-12 border rounded px-3' type="text" name='title' id='title' />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="body">Body</label>
            <textarea className='border rounded p-3 h-24' type="text" name='body' id='body' />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="time">Time</label>
            <select className='border h-12 rounded px-3' name="time" id="time">
              {[...Array(24)].map((_,hour) => {
                const strHour = hour.toString()
                const len = strHour.length
                return(<option>{len>1?strHour:'0'+strHour}:00</option>)
              })}
            </select>
          </div>
          <div className='flex justify-end gap-5'>
            <button className='text-black  px-5 py-2 rounded' type="button" onClick={toggleModal}>
              <span>Cancel</span>
            </button>
            <button className='text-white bg-blue-500 px-5 py-2 rounded' type="submit">
              <span>Save</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const ModalHapus = () => {
  const todoCtx = React.useContext(TodoContext)
  const modalCtx = React.useContext(ModalContext)

  function handleDelete() {
    const deleteTask = todoCtx.data.filter((_, i) => i !== modalCtx.deleteIndex)
    todoCtx.setData(deleteTask)
    modalCtx.setShowModalDelete(false)
    modalCtx.setDeleteIndex(null)
  }
  function cancelDelete() {
    modalCtx.setShowModalDelete(false)
    modalCtx.setDeleteIndex(null)
  }

  return (
    <div className='absolute top-0 left-0 max-w-md w-full h-screen z-10 bg-black/30  flex justify-center items-center'>
      <div className="rounded-lg p-5 w-80 bg-white shadow-xl m-auto">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Delete Task?</h3>
        </div>
        <p className="text-sm text-gray-600 mb-5">
          Are you sure deleting this Task?
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={cancelDelete} className="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm">
            Cancel
          </button>
          <button onClick={handleDelete} className="px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-sm">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default Main