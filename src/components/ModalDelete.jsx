import React from "react"
export function ModalDelete({ todoCtx, modalCtx }) {

  function handleDelete() {
    const deleteTask = todoCtx.data.filter((_, i) => i !== modalCtx.deleteIndex)
    todoCtx.setData(deleteTask)
    modalCtx.setShowDeleteModal(false)
    modalCtx.setDeleteIndex(null)
  }
  function cancelDelete() {
    modalCtx.setShowDeleteModal(false)
    modalCtx.setDeleteIndex(null)
  }

  return (
    <div className=' max-w-md w-full z-10 justify-center items-center flex flex-col'>
      <p className="text-sm  mb-5">
        Are you sure deleting this Task?
      </p>
      <div className="flex justify-end gap-3">
        <button onClick={cancelDelete} className="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm">
          Cancel
        </button>
        <button onClick={handleDelete} className="px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-sm">
          Delete
        </button>
      </div>
    </div>
  )
}