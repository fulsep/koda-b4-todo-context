function DeleteTask({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>
      {/* modal content */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 mx-4 animate-fade-in flex flex-col gap-3">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-red-100">
            <span className="text-3xl">⚠️</span>
          </div>
        </div>
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Confirm Delete
        </h2>
        {/* Message */}
        <p className="text-center text-gray-600 mb-6">
          Are you sure you want to delete this task?
        </p>
        {/* buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            CANCEL
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition bg-blue-500 text-white hover:bg-blue-700`}
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteTask;
