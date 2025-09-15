import { toast } from "react-toastify";

const defaultMessageConfig = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

export const showSuccess = (message) => toast.success(message, defaultMessageConfig);
