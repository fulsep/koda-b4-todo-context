import React from 'react'
import ModalContext from './ModalContext'
import { FaX } from 'react-icons/fa6'

const Modal = (props)=>{
  const modalCtx = React.useContext(ModalContext)
  const toggleModal = ()=>{
    modalCtx.setShowModal(!modalCtx.showModal)
  }
  const animatedDiv = React.createRef()
  React.useEffect(()=>{
    animatedDiv.current.classList.remove("-translate-y-50")
    animatedDiv.current.classList.add("translate-y-0")
  },[animatedDiv])
  return (
    <div className='absolute top-0 left-0 max-w-md w-full h-screen bg-black/50 flex justify-center items-center'>
      <div ref={animatedDiv} className='w-full mx-10 transition-all duration-500 -translate-y-50 bg-white p-5 py-5 rounded flex flex-col gap-3'>
        <div className='flex justify-between'>
          <h1 className='font-bold text-lg'>{props.title}</h1>
          <div>
            <button onClick={toggleModal}>
              <FaX />
            </button>
          </div>
        </div>
        {props.children}
      </div>
    </div>
  )
}

export default Modal