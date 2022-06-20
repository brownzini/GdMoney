// Services API
import api from "../api";

const getWalletUser = async (token:string, id:string | undefined):Promise<string> => {
  let wallet_address = '';
  if (token !== undefined) {
    await api.get(`/users/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
    })
    .then(function (response) {
        wallet_address = response.data.wallet_address;
    }).catch(error => {
        wallet_address = 'error';
    })
  }
  return wallet_address;
}

export default getWalletUser;