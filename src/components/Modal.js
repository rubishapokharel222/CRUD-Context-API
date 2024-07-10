import React from "react";

const Modal = ({ title, handleCloseModal, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center px-4 py-2 bg-gray-800 text-white">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={handleCloseModal}
            className="text-gray-300 hover:text-gray-100 focus:outline-none"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
