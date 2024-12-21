import React from "react";
import { useShallow } from "zustand/shallow";
import Toast from "../shared/Toast";
import useStore from "../store/useStore";

const ToastContainer: React.FC = () => {
  const [toasts, removeToast] = useStore(
    useShallow((state) => [state.toasts, state.removeToast])
  );

  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
          variant={toast.variant}
        />
      ))}
    </>
  );
};

export default ToastContainer;
