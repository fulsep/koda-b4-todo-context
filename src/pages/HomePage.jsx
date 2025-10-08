import moment from "moment";
import React from "react";
import TodoContext from "../components/TodoContext";
import { IoMdTrash } from "react-icons/io";

function HomePage() {
  const [selectedDay, setDay] = React.useState(moment().date().toString());
  const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const todoCtx = React.useContext(TodoContext);

  const deleteTask = (id) => {
    todoCtx.setData((prev) => prev.filter((t) => t.id !== id));
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
        {todoCtx.data.map((todo) => {
          return (
            <div key={todo.id} className="bg-blue-500 text-white p-5 rounded">
              <div className="flex justify-between">
                <div className="font-bold">{todo.title}</div>
                <div>
                  <button
                    className="ml-auto"
                    onClick={() => deleteTask(todo.id)}
                  >
                    <IoMdTrash />
                  </button>
                  <div>{todo.time}</div>
                </div>
              </div>
              <div className="whitespace-pre">{todo.body}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default HomePage;
