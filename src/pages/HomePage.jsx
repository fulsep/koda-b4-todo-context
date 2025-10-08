import moment from 'moment'
import React from 'react'
import TodoContext from '../components/TodoContext'

function HomePage() {
  const [selectedDay, setDay] = React.useState(moment().date().toString())
  const weeks = ["Mon", "Tue", "Wed","Thu", "Fri", "Sat", "Sun"]
  const [showMessage,setShowMessage] = React.useState("")
  const todoCtx = React.useContext(TodoContext)
  const handleDelete = (id) => {
    todoCtx.deleteTodo(id)
    setShowMessage("Delete Success 😎✔️")
    setTimeout(() => {
      setShowMessage("")
    }, 3000)
  }
  return (
    <>
      <div className='sticky top-0 px-10 py-5 flex flex-col gap-5'>
        <div>{moment().format("MMM DD, YYYY")}</div>
        <div className='text-3xl font-bold'>Today</div>
        {showMessage && (
          <div className='absolute top-95 right-30 bg-green-500 hover:bg-red-400 text-white py-4 rounded-lg animate-bounce'>
            {showMessage}
          </div>
        )}
        <div className='flex'>
          {weeks.map((day, index) => {
            const getDay = moment().day(index+1).date().toString()
            return(
              <button onClick={()=>setDay(getDay)} className='hover:cursor-pointer flex-1 flex flex-col items-center [&>*:first-child]:text-gray-500 [&>*:last-child]:font-bold' key={index}>
                <span className={selectedDay === getDay ? 'text-[theme(color.blue.500)!important] font-bold':''}>{day}</span>
                <span className={selectedDay === getDay ? 'text-[theme(color.blue.500)!important] font-bold':''}>{getDay}</span>
              </button>)
          })}
        </div>
      </div>
      {todoCtx.data.length === 0 && <div className='flex-1 flex justify-center items-center'>
        <span>No Activity!</span>
      </div>}
      <div className='flex flex-col gap-5 mb-24'>
        {todoCtx.data.map(todo => {
          return (
            <div className='bg-blue-500 text-white p-5 rounded 
            hover:cursor-pointer transform transition-all duration-500 hover:scale-105' key={todo.id}>
              <div className='flex justify-between'>
                <div className='font-bold'>{todo.title}</div>
                <div>{todo.time}</div>
              </div>
              <div className='flex justify-between'>
                <div className='whitespace-pre'>{todo.body}</div>
                <button onClick={()=>handleDelete(todo.id)} className='hover:text-black cursor-pointer'>Delete</button>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default HomePage