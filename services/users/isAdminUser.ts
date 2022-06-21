// Services API
import api from "../api";

const isAdminUser = async (token:string, id:string | undefined):Promise<boolean> => {
  let username = false;
  if (token !== undefined) {
    await api.get(`/users/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
    })
    .then(async function (response) {
        username = response.data.isAdmin;
    }).catch(error => {
        username = false
    })
  }
  return username;
}

export default isAdminUser;