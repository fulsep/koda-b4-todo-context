import React from 'react'

const TodoContext = React.createContext({
  data: [
    {
      title: "",
      body: "",
      time: ""
    }
  ],
  deleteTodo: ()=>{},
  setData: ()=>{}
})

export default TodoContext