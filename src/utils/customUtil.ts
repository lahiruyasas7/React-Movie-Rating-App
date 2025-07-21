import Swal from "sweetalert2";

export const fireAlertError = (title: any, msg: any) => {
  Swal.fire(title, msg, "error");
};

//Use this to convert json to form data
export const jsonToFormData = (obj: any) => {
  const formData = new FormData();
  Object.keys(obj).map(async (e) => {
    if (Array.isArray(obj[e])) {
      //Check whether the property is an array or not
      obj[e].map(async (res, index) => {
        await formData.append(`${e}[${index}]`, res);
      });
    } else await formData.append(e, obj[e]);
  });
  return formData;
};
