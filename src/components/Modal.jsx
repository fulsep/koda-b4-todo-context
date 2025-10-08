import React from 'react'

const Modal = (props)=>{
  const animatedDiv = React.createRef()
  React.useEffect(()=>{
    animatedDiv.current.classList.remove("-translate-y-50")
    animatedDiv.current.classList.add("translate-y-0")
  },[animatedDiv])
  return (
    <div className='absolute top-0 left-0 max-w-md w-full h-screen bg-black/50 flex justify-center items-center'>
      <div ref={animatedDiv} className='w-full mx-10 transition-all duration-500 -translate-y-50 bg-white p-5 py-5 rounded flex flex-col gap-3'>
        <h1 className='font-bold text-lg'>{props.title}</h1>
        {props.children}
      </div>
    </div>
  )
}

export default Modal