// Services API
import api from "../api";

type Product = {
    id: string;
    product_name: string;
    img_url: string;
    price: number;
};

const confirmPayment = async (
    token:string,
    product:Product[],
):Promise<string> => {
  let message = '';
  if (token !== undefined) {
    await api.post(`/persistence/confirm`, {
        products: product,
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

export default confirmPayment;