import moment from 'moment'
import React from 'react'
import TodoContext from '../components/TodoContext'
import ModalContext from '../components/ModalContext'

function HomePage() {
  const [selectedDay, setDay] = React.useState(moment().date().toString())
  const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const todoCtx = React.useContext(TodoContext)
  const modalCtx = React.useContext(ModalContext)

  return (
    <>
      <div className='sticky top-0 px-10 py-5 flex flex-col gap-5'>
        <div>{moment().format("MMM DD, YYYY")}</div>
        <div className='text-3xl font-bold'>Today</div>
        <div className='flex'>
          {weeks.map((day, index) => {
            const getDay = moment().day(index + 1).date().toString()
            return (
              <button onClick={() => setDay(getDay)} className='hover:cursor-pointer flex-1 flex flex-col items-center [&>*:first-child]:text-gray-500 [&>*:last-child]:font-bold'>
                <span className={selectedDay === getDay ? 'text-[theme(color.blue.500)!important] font-bold' : ''}>{day}</span>
                <span className={selectedDay === getDay ? 'text-[theme(color.blue.500)!important] font-bold' : ''}>{getDay}</span>
              </button>)
          })}
        </div>
      </div>
      {todoCtx.data.length === 0 && <div className='flex-1 flex justify-center items-center'>
        <span>No Activity!</span>
      </div>}
      <div className='flex flex-col gap-5 mb-24'>
        {todoCtx.data.map((todo, index) => {
          return (
            <div className='bg-blue-500 text-white p-5 rounded'>
              <div className='flex justify-between'>
                <div className='font-bold'>{todo.title}</div>
                <div className='flex  gap-2'>
                  <div>{todo.time}</div>
                  <button className='cursor-pointer' onClick={() => {
                    modalCtx.setDeleteIndex(index)
                    modalCtx.setShowModalDelete(true)
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="none" stroke="#ff3030" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M14 11v6m-4-6v6M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M4 7h16M7 7l2-4h6l2 4" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className='whitespace-pre'>{todo.body}</div>
            </div>
          )
        })}
      </div>

    </>
  )
}

export default HomePage