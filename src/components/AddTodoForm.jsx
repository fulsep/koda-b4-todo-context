import React from "react";

function AddTodoForm(props) {
  const formRef = React.useRef();
  const isEditMode = props.editMode || false;
  const editData = props.editData || {};

 

  

  const handleData = (e) => {
    e.preventDefault();
    const { value: title } = e.target.title;
    const { value: body } = e.target.body;
    const { value: time } = e.target.time;
    if (isEditMode) {
      const updatedData = [...props.todoCtx.data];
      updatedData[props.editIndex] = { title, body, time };
      props.todoCtx.setData(updatedData);
    } else {
      props.todoCtx.setData([...props.todoCtx.data, { title, body, time }]);
    }
    props.onClose();
  }


  return (
    <form ref={formRef} onSubmit={handleData} className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <label htmlFor="title">Title</label>
        <input
          autoFocus
          className="h-12 border rounded px-3"
          type="text"
          name="title"
          id="title"
          defaultValue={isEditMode ? editData.title : ""}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="body">Body</label>
        <textarea
          className="border rounded p-3 h-24"
          type="text"
          name="body"
          id="body"
          defaultValue={isEditMode ? editData.body : ""}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="time">Time</label>
        <select
          className="border h-12 rounded px-3"
          name="time"
          id="time"
          efaultValue={isEditMode ? editData.time : "00:00"}
        >
          {[...Array(24)].map((_, hour) => {
            const strHour = hour.toString();
            const len = strHour.length;
            return (
              <option key={hour}>{len > 1 ? strHour : "0" + strHour}:00</option>
            );
          })}
        </select>
      </div>
      <div className="flex justify-end gap-5">
        <button
          className="text-black  px-5 py-2 rounded"
          type="button"
          onClick={props.onClose}
        >
          <span>Cancel</span>
        </button>
        <button
          className="text-white bg-blue-500 px-5 py-2 rounded"
          type="submit"
        >
          <span>{isEditMode ? 'Update' : 'Save'}</span>
        </button>
      </div>
    </form>
  );
}

export default AddTodoForm;
