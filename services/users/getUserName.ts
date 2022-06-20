// Services API
import api from "../api";

const getUserName = async (token:string, id:string | undefined):Promise<string> => {
  let username = '';
  if (token !== undefined) {
    await api.get(`/users/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
    })
    .then(async function (response) {
        username = response.data.username;
    }).catch(error => {
        username = ''
    })
  }
  return username;
}

export default getUserName;