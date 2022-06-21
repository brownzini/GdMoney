// Services API
import api from "../api";

const changeData = async (
    id:string,
    token:string, 
    username:string,
    wallet_address:string,
):Promise<string> => {
  let message = '';
  await api.put(`/users/changedata/${id}`, { 
        username: username,
        wallet_address: wallet_address,
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

export default changeData;