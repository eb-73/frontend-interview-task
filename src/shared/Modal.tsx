import React, { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  onClose: () => void;
  confirm: () => void;
  disabled?: boolean;
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

const Modal: FC<ModalProps> = ({
  onClose,
  confirm,
  title,
  description,
  children,
  disabled,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = "hidden"; // Disable scrolling

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Allow time for the animation to complete
  };

  const modalContent = (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 transform transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-95"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg text-gray-700 font-bold">
            {title || "Confirm Action"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 font-semibold focus:outline-none"
          >
            ✕
          </button>
        </div>
        {/* Description */}
        {description && <p className="mt-2 text-gray-600">{description}</p>}
        {/* Content */}
        {children}
        {/* Buttons */}
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={confirm}
            disabled={disabled}
            className="px-4 py-2 transition-all bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:text-gray-300 disabled:cursor-not-allowed"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;
