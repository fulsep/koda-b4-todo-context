import moment from "moment";
import React from "react";
import TodoContext from "../components/TodoContext";

function HomePage() {
  const [selectedDay, setDay] = React.useState(moment().date().toString());
  const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const todoCtx = React.useContext(TodoContext);

  // Modal state
  const [showModal, setShowModal] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);

  const deleteTodo = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    todoCtx.setData((prev) => prev.filter((_, idx) => idx !== selectedId));
    setShowModal(false);
    setSelectedId(null);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectedId(null);
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
        {todoCtx.data.map((todo, id) => {
          return (
            <div className="bg-blue-500 text-white p-5 rounded">
              <div className="flex justify-between">
                <div className="font-bold">{todo.title}</div>
                <div>{todo.time}</div>
              </div>
              <div className="whitespace-pre mb-2">{todo.body}</div>
              <button
                onClick={() => deleteTodo(id)}
                className="px-3 py-1.5 rounded-md bg-rose-600 text-white hover:bg-rose-700 ml-80"
              >
                Hapus
              </button>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 min-w-[320px] flex flex-col items-center">
            <div className="text-xl font-bold mb-2 text-blue-600">
              Delete Confirmation
            </div>
            <div className="mb-6 text-gray-700">Are you sure to delete!</div>
            <div className="flex gap-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-rose-600 text-white hover:bg-rose-700 font-semibold"
              >
                Yes, Delete it
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
