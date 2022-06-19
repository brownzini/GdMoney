// Services API
import api from "./api";

const verifyWallet = async (token:string, walletAddress:string):Promise<boolean> => {
  let message = '';
  if (token !== undefined) {
    await api.post(`/persistence/verify-wallet`, {
        wallet_address: walletAddress,
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
        message = error.response.data.message;
    })
  }
  return (message === 'Invalid') ? false : true;
}

export default verifyWallet;