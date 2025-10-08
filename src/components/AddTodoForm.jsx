import React, { useEffect, useState } from 'react'

function AddTodoForm(props) {
  const formRef = React.useRef()
  const [dataEdit, setDataEdit] = useState(null)

  useEffect(() => {
    if (props.indexEdit > -1) {
      const data = props.todoCtx.data.find((_, index) => index === props.indexEdit)
      setDataEdit(data)
    }
  }, [props.indexEdit, props.todoCtx.data])

  const handleData = (e) => {
    e.preventDefault()
    const { value: title } = e.target.title
    const { value: body } = e.target.body
    const { value: time } = e.target.time
    if (dataEdit) {
      const updatedData = props.todoCtx.data.map((item, index) => index === props.indexEdit ? { title, body, time } : item)
      props.todoCtx.setData(updatedData)
    } else {
      props.todoCtx.setData([
        ...props.todoCtx.data,
        { title, body, time }
      ])
    }
    props.onClose()
  }

  return (

    <form ref={formRef} onSubmit={handleData} className='flex flex-col gap-2'>
      <div className='flex flex-col gap-1'>
        <label htmlFor="title">Title</label>
        <input autoFocus className='h-12 border rounded px-3' type="text" name='title' id='title' defaultValue={dataEdit?.title || ""} />
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="body">Body</label>
        <textarea className='border rounded p-3 h-24' type="text" name='body' id='body' defaultValue={dataEdit?.body || ""} />
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="time">Time</label>
        <select key={props?.indexEdit || 'new'} className='border h-12 rounded px-3' name="time" id="time" value={dataEdit ? dataEdit.time : undefined} // controlled hanya saat edit
          onChange={(e) => {
            if (dataEdit) setDataEdit((prev) => ({ ...prev, time: e.target.value }))
          }}>
          {[...Array(24)].map((_, hour) => {
            const strHour = hour.toString()
            const len = strHour.length
            const valueTime = `${len > 1 ? strHour : '0' + strHour}:00`
            return (<option value={valueTime} >{valueTime}:00</option>)
          })}
        </select>
      </div>
      <div className='flex justify-end gap-5'>
        <button className='text-black  px-5 py-2 rounded' type="button" onClick={props.onClose}>
          <span>Cancel</span>
        </button>
        <button className='text-white bg-blue-500 px-5 py-2 rounded' type="submit">
          <span>Save</span>
        </button>
      </div>
    </form>
  )
}

export default AddTodoForm