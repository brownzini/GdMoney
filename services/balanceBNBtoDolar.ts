// Services API
import api from "./api";

const balanceBNBtoDolar = async (session:any):Promise<string> => {
  let balance = '';
  const token = String(JSON.parse(session.TOKEN)[0].token);

  if (token !== undefined) {
    await api.get(`/users/profile/getbalancebnb/xxx`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
    })
    .then(function (response) {
        balance = response.data.balanceBUSD;
    }).catch(error => {
        console.log(error)
    })
  }
  return balance;
}

export default balanceBNBtoDolar;