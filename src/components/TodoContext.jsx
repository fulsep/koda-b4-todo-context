import React from 'react'

const TodoContext = React.createContext({
  data: [
    {
      title: "",
      body: "",
      time: ""
    }
  ],
  setData: ()=>{}
})

export default TodoContext