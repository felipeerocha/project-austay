import { toast } from 'react-toastify';
import type { ToastOptions } from 'react-toastify';

const commonOptions: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const toastSuccess = (message: string) => {
  toast.success(message, {
    ...commonOptions,
    className: 'toast-success',
  });
};

export const toastError = (message: string) => {
  toast.error(message, {
    ...commonOptions,
    className: 'toast-error',
  });
};