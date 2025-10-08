import moment from "moment";
import React from "react";
import TodoContext from "../components/TodoContext";

function HomePage() {
  const [selectedDay, setDay] = React.useState(moment().date().toString());
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [todoToDelete, setTodoToDelete] = React.useState(null);
  
  const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const todoCtx = React.useContext(TodoContext);
  
  const handleDeleteClick = (todo) => {
    setTodoToDelete(todo);
    setShowDeleteModal(true);
  };
  
  const confirmDelete = () => {
    if (todoToDelete) {
      todoCtx.deleteTodo(todoToDelete.title);
      setShowDeleteModal(false);
      setTodoToDelete(null);
    }
  };
  
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setTodoToDelete(null);
  };
  
  return (
    <>
      <div className="sticky top-0 px-10 py-5 flex flex-col gap-5">
        <div>{moment().format("MMM DD, YYYY")}</div>
        <div className="text-3xl font-bold">Today</div>
        <div className="flex">
          {weeks.map((day, index) => {
            const getDay = moment()
              .day(index + 1)
              .date()
              .toString();
            return (
              <button
                key={index}
                onClick={() => setDay(getDay)}
                className="hover:cursor-pointer flex-1 flex flex-col items-center [&>*:first-child]:text-gray-500 [&>*:last-child]:font-bold"
              >
                <span
                  className={
                    selectedDay === getDay
                      ? "text-[theme(color.blue.500)!important] font-bold"
                      : ""
                  }
                >
                  {day}
                </span>
                <span
                  className={
                    selectedDay === getDay
                      ? "text-[theme(color.blue.500)!important] font-bold"
                      : ""
                  }
                >
                  {getDay}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      
      {todoCtx.data.length === 0 && (
        <div className="flex-1 flex justify-center items-center">
          <span>No Activity!</span>
        </div>
      )}
      
      <div className="flex flex-col gap-5 mb-24">
        {todoCtx.data.map((todo, index) => {
          return (
            <div key={index} className="bg-blue-500 text-white p-5 rounded">
              <div className="flex justify-between">
                <div>
                  <div className="font-bold">{todo.title}</div>
                  <div className="whitespace-pre">{todo.body}</div>
                </div>
                <div>
                  <div>{todo.time}</div>
                  <button onClick={() => handleDeleteClick(todo)}>
                    <img src="trush.svg" alt="" className="w-8" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {showDeleteModal && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Delete Task?</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{todoToDelete?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;