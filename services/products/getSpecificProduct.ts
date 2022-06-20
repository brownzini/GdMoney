// Services API
import api from "../api";

type Product = {
    data: string;
    forSale: boolean;
    img_url: string;
    price: number;
    product_name: string;
    status: boolean;
    user_id: string;
}

const getSpecificProduct = async (token:string, id:string | undefined):Promise<Product> => {
  let transactions = {} as Product;
  if (token !== undefined) {
    await api.get(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
    })
    .then(function (response) {
        transactions = response.data;
    }).catch(error => {
        transactions = {} as Product;
    })
  }
  return transactions;
}

export default getSpecificProduct;