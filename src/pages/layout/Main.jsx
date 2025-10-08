import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import { TodoModalContext } from '../../components/ModalContext'
import TodoContext from '../../components/TodoContext'

function Main() {
  const [showModal, setShowModal] = React.useState(false)
  const [todo, setTodo] = React.useState([])

  const deleteTodo = (idToDelete) => {
    setTodo(prevTodos => prevTodos.filter(todo => todo.id !== idToDelete))
  }

  React.useEffect(() => {
    const getData = window.localStorage.getItem("todos")
    if (getData) {
      const parsedData = JSON.parse(getData)
      setTodo(parsedData)    
    }
  }, [])

  React.useEffect(() => {
    if (todo.length > 0) { 
      window.localStorage.setItem("todos", JSON.stringify(todo))
    }
  }, [todo])

  return (
    <TodoContext.Provider value={{data:todo, setData: setTodo, deleteTodo: deleteTodo}}>
      <TodoModalContext.Provider value={{showModal, setShowModal}}>
        <div className='bg-gray-200 min-h-screen relative'>
          <div className='max-w-md w-full mx-auto relative'>
            <div className='p-2 bg-gray-100 min-h-[calc(theme(height.screen)-theme(height.12))] flex flex-col'>
              <Outlet />
            </div>
            <Navbar />
            {showModal && <Modal />}
          </div>
        </div>
      </TodoModalContext.Provider>
    </TodoContext.Provider>
  )
}

const Modal = ()=>{
  const modalCtx = React.useContext(TodoModalContext)
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

export default Main