import Swal from "sweetalert2";
import { Icon } from "../models/swal";

export function showDialog(icon: Icon, title: string) {
    return Swal.fire({
        icon: icon,
        title: title,
        showConfirmButton: false
      });
}

export function showDialogText(icon: Icon, title: string, text: string) {
    return Swal.fire({
        icon: icon,
        title: title,
        showConfirmButton: false
      });
}

export function showDialogQuestion(icon: Icon, title: string, text: string) {
    return Swal.fire({
        icon: icon,
        title: title,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!"
      });
}

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  });

export function showToast(icon: Icon, title: string) {
    return Toast.fire({
        icon: icon,
        title: title
      });
}