import Swal from "sweetalert2";

export const fireAlertError = (title: any, msg: any) => {
	Swal.fire(title, msg, 'error');
};