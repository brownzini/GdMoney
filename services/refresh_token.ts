// Services API
import api from "./api";

const refresh_token = async (session:any):Promise<string> => {
  let token = '';
  const oldToken = String(JSON.parse(session.TOKEN)[0].token);
  const id_rt = String(JSON.parse(session.RT)[0].id_rt);
  if (oldToken !== undefined) {
    await api.post("/refresh-token", { id_refresh_token: id_rt, }, {
        headers: {
          Authorization: `Bearer ${oldToken}`,
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
    })
    .then(function (response) {
        token = response.data.token.token;
    }).catch(error => {
        token = error.data.message;
    })
  }
  return (token === '') ? oldToken : token;
}

export default refresh_token