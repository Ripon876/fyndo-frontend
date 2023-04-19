import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

function Toast({ type, icon, title }) {
  const Toast = MySwal.mixin({
    toast: true,
    position: "top-end",
    iconColor: "#9ca3af",
    showConfirmButton: false,
    timer: 2500,
    customClass: {
      popup: "colored-toast",
    },
    timerProgressBar: true,
  });

  Toast.fire({
    type: type,
    icon: icon,
    title: title,
  });
}

export default Toast;
