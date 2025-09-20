import { toast } from "react-toastify";
import { customToastTheme } from "./theme";

const defaultConfig = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export const showSuccess = (message) => toast.success(message, defaultConfig);
//export const showError = (message) => toast.error(message, defaultConfig);
export const showInfo = (message) => toast.info(message, {
  ...defaultConfig,
  autoClose: 8000,
});
//export const showWarning = (message) => toast.warn(message, defaultConfig);

export const showCustomToast = (content, config = {}) => {
  return toast(content, {
    ...defaultConfig,
    closeOnClick: false, //So you just can´t click on the toast to close it
    closeButton: false, //Disable close btn
    autoClose: false, //So it won´t close automatic
    style: {
      backgroundColor: customToastTheme.customsBackground,
      color: "black",
      padding: "1rem",
      borderRadius: "8px",
      ...config.style,
    },
    ...config,
  });
};