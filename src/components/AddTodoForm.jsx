import React from 'react'

function AddTodoForm(props) {
  const [dataRename, setDataRename] = React.useState(null)
  React.useEffect(()=>{
    if(props.item){
      const temp = props.todoCtx.data.find((_,x)=> x === props.item)
      setDataRename(temp)
    }
  },[props.item, props.todoCtx.data])
  const formRef = React.useRef()
  const handleData = (e)=>{
    e.preventDefault()
   
    const {value: title} = e.target.title
    const {value: body} = e.target.body
    const {value: time} = e.target.time
    if(props.item !== null && props.item !== undefined){
      props.todoCtx.setData(
        props.todoCtx.data.map((task, index) =>
          index === props.item ? { ...task, title,body,time } : task
        )
      );
    }else {
      props.todoCtx.setData([
        ...props.todoCtx.data,
        {title,body,time}
      ])
    }
    props.onClose()
  }

  return (

    <form ref={formRef} onSubmit={handleData} className='flex flex-col gap-2'>
      <div className='flex flex-col gap-1'>
        <label htmlFor="title">Title</label>
        <input autoFocus className='h-12 border rounded px-3' type="text" name='title' id='title' defaultValue={dataRename?.title}/>
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="body">Body</label>
        <textarea className='border rounded p-3 h-24' type="text" name='body' id='body' defaultValue={dataRename?.body}/>
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="time">Time</label>
        <select className='border h-12 rounded px-3' name="time" id="time" defaultValue={dataRename?.time}>
          {[...Array(24)].map((_, hour) => {
            const strHour = hour.toString()
            const len = strHour.length
            return (<option>{len > 1 ? strHour : '0' + strHour}:00</option>)
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