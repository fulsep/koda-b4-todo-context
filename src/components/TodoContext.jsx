import React from 'react'

const TodoContext = React.createContext({
  data: [],
  setData: ()=>{},
  deleteTodo: ()=>{}
})
export const TodoProvider = ({ children }) => {
  const [data, setData] = React.useState([]);

  const deleteTodo = (title) => {
    setData((prev) => prev.filter((todo) => todo.title !== title));
  };

  const addTodo = (newTodo) => {
    setData((prev) => [...prev, newTodo]);
  };

  return (
    <TodoContext.Provider 
      value={{ 
        data, 
        setData, 
        deleteTodo,
        addTodo 
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext