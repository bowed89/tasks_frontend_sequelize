import Swal from "sweetalert2";

export const alertMessage = (icon, title, text) => {
  Swal.fire({
    position: "top-end",
    icon,
    title,
    text,
    showConfirmButton: false,
    timer: 4000
  });
};
