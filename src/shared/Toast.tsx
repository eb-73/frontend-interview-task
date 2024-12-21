import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const variantStyles = {
  success: "bg-green-500",
  error: "bg-red-500",
  default: "bg-gray-500",
};

type ToastProps = {
  message: string;
  duration?: number;
  onClose: () => void;
  variant?: "success" | "error";
};

const Toast: React.FC<ToastProps> = ({
  message,
  duration = 3000,
  onClose,
  variant = "success",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Allow time for the animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // Toast background and text based on variant
  const bgColor = variantStyles[variant] || variantStyles.default;

  const toastContent = (
    <div
      className={`fixed bottom-5 sm:right-5 sm:left-auto inset-x-0 mx-auto w-11/12 sm:w-80 p-4 text-white rounded-lg shadow-lg flex items-center justify-between z-50 transition-transform duration-300 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${bgColor}`}
      role="alert"
    >
      <span>{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="ml-4 text-white font-semibold hover:text-gray-200"
      >
        ✕
      </button>
    </div>
  );

  return createPortal(toastContent, document.body);
};

export default Toast;
