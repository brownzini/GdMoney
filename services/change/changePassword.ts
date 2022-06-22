// Services API
import api from "../api";

const changePassword = async (
    id:string,
    token:string, 
    password:string,
    newpassword:string,
):Promise<string> => {
  let message = '';
  await api.put(`/users/changepassword/${id}`, { 
        password: password,
        newPassword: (newpassword === '') ? password : newpassword,
  }, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
        },
  })
    .then(function (response) {
        message = response.data.message;
  }).catch(error => {
        message = 'error';
  })
  return message;
}

export default changePassword;