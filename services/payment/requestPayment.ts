// Services API
import api from "../api";

const requestPayment = async (
    token:string,
    from: string,
    price:number,
    to?:string,
):Promise<string> => {
  let message = '';
  if (token !== undefined) {
    await api.post(`/persistence/request`, {
      from: from,
      price: (price-(price*0.1)),
      wallet_address: to,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then(function (response:any) {
        message = response.data.message;
    }).catch((error: { response: { data: { message: string; }; }; }) => {
        message = error.response.data.message;
    })
  }
  return message;
}

export default requestPayment;