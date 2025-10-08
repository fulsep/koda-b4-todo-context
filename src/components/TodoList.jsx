import React from 'react'
import TodoContext from './TodoContext'

function TodoList() {
  const todoCtx = React.useContext(TodoContext)
  return (
    <div className='flex flex-col gap-5 mb-24'>
      {todoCtx.data.map(todo => {
        return (
          <div className='bg-blue-500 text-white p-5 rounded'>
            <div className='flex justify-between'>
              <div className='font-bold'>{todo.title}</div>
              <div>{todo.time}</div>
            </div>
            <div className='whitespace-pre'>{todo.body}</div>
          </div>
        )
      })}
    </div>
  )
}

export default TodoList