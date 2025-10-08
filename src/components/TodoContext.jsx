import React from "react";

const TodoContext = React.createContext({
  data: [
    {
      id: "",
      title: "",
      body: "",
      time: "",
    },
  ],
  setData: () => {},
});

export default TodoContext;
