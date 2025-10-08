import React from 'react'
import { FaClock, FaPlus, FaUser } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import ModalContext from './ModalContext'

function Navbar() {
  const modalCtx = React.useContext(ModalContext)
  return (
    <nav className='bg-white shadow fixed bottom-0 max-w-md w-full flex h-12 text-gray-300'>
      <ul className='flex items-center w-full [&>*]:flex-1 [&>*]:flex [&>*]:justify-center'>
        <li>
          <Link className='text-blue-500' to="/">
            <FaClock />
          </Link>
        </li>
        <li>
          <button onClick={()=>{modalCtx.setShowModal(!modalCtx.showModal)}} className='bg-blue-500 shadow shadow-blue-400 text-white p-3 rounded relative bottom-5' type="button">
            <FaPlus />
          </button>
        </li>
        <li>
          <Link to="/profile">
            <FaUser />
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar