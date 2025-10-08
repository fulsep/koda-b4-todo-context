function ConfirmDelete(props) {
  return (
    <div className="flex gap-5 mt-5 z-100">
      <button onClick={props.onClose} className="flex-1 py-2 px-4 rounded-md cursor-pointer">Cancel</button>
      <button onClick={props.onConfirm} className="flex-1 py-2 px-4 rounded-md bg-red-500 text-white cursor-pointer hover:bg-red-700">Confirm</button>
    </div>
  )
}

export default ConfirmDelete