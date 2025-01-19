import { toast } from "react-toastify";

export const success = (message) =>
  toast.success(message, {
    position: "bottom-right",
  });
export const failure = (message) =>
  toast.error(message, {
    position: "bottom-right",
  });
