// Services API
import api from "../api";

const getUserID = async (token:string):Promise<string> => {
  let id = '';
  if (token !== undefined) {
    await api.post(`/users/getid`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
    })
    .then(async function (response) {
        id = response.data.user_id;
    }).catch(error => {
        id = ''
    })
  }
  return id;
}

export default getUserID;