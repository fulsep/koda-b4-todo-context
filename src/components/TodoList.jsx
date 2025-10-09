import React, { useContext } from 'react'
import TodoContext from './TodoContext'
import { FaTrash } from 'react-icons/fa6'
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { DeleteModalContext, RenameModalContext } from './ModalContext'
import Modal from './Modal'
import AddTodoForm from './AddTodoForm';

function TodoList() {
  const todoCtx = useContext(TodoContext);

  const [showModalDelete, setShowModalDelete] = React.useState(false);
  const [showModalRename, setShowModalRename] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const handleDelete = (idx) => {
    setSelectedItem(idx);
    setShowModalDelete(true);
  };

  const handleRename = (idx) => {
    setSelectedItem(idx);
    setShowModalRename(true);
  };

  return (
    <RenameModalContext.Provider value={{ showModal: showModalRename, setShowModal: setShowModalRename }}>
      <DeleteModalContext.Provider value={{ showModal: showModalDelete, setShowModal: setShowModalDelete }}>
        <div className="flex flex-col gap-5 mb-24">
          {todoCtx.data.map((todo, idx) => (
            <TodoItem
              key={idx}
              todo={todo}
              index={idx}
              onDelete={handleDelete}
              onRename={handleRename}
            />
          ))}

          <DeleteModal item={selectedItem} />

          <Rename item={selectedItem} />
        </div>
      </DeleteModalContext.Provider>
    </RenameModalContext.Provider>
  );
}

const TodoItem = (props) => {
  const [showOptions, setShowOptions] = React.useState(false);

  return (
    <div
      onDoubleClick={() => setShowOptions(!showOptions)}
      className="bg-blue-500 select-none text-white p-5 rounded relative group"
    >
      <div className="flex justify-between">
        <div className="font-bold">{props.todo.title}</div>
        <div>{props.todo.time}</div>
      </div>
      <div className="whitespace-pre">{props.todo.body}</div>

      <div
        onDoubleClick={() => setShowOptions(false)}
        className={`absolute top-0 left-0 flex-col px-5 justify-center items-end w-full h-full bg-linear-to-r from-transparent to-blue-500 gap-3 ${
          showOptions ? 'flex' : 'hidden group-hover:flex'
        }`}
      >
        <button
          onClick={() => props.onDelete(props.index)}
          className="text-red-300"
        >
          <FaTrash size={28} />
        </button>
        <button
          onClick={() => props.onRename(props.index)}
          className="text-yellow-300"
        >
          <HiOutlinePencilSquare size={28} />
        </button>
      </div>
    </div>
  );
};

const DeleteModal = ({ item }) => {
  const todoCtx = useContext(TodoContext);
  const modalCtx = useContext(DeleteModalContext);

  const confirmDelete = () => {
    todoCtx.setData(todoCtx.data.filter((_, index) => index !== item));
    modalCtx.setShowModal(false);
  };

  if (!modalCtx.showModal) return null;

  return (
    <Modal modalCtx={modalCtx} title="Are you sure?">
      <div>Delete selected item?</div>
      <div className="flex justify-end gap-5 mt-4">
        <button
          className="text-black px-5 py-2 rounded"
          type="button"
          onClick={() => modalCtx.setShowModal(false)}
        >
          Cancel
        </button>
        <button
          onClick={confirmDelete}
          className="text-white bg-blue-500 px-5 py-2 rounded"
          type="submit"
        >
          Yes
        </button>
      </div>
    </Modal>
  );
};

const Rename = (props) => {
  const todoCtx = useContext(TodoContext);
  const modalCtx = useContext(RenameModalContext);

  if(modalCtx.showModal){
    return(
      <Modal modalCtx={modalCtx} title="Edit Todo">
        <AddTodoForm todoCtx={todoCtx} item={props.item} onClose={()=>modalCtx.setShowModal(false)} />
      </Modal>
    )

  } return(<></>)
};

export default TodoList;

