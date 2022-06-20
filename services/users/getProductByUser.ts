// Services API
import api from "../api";
import getProduct from "../products/getProduct";

interface ProductsCollectables {
    id:string;
    product_name:string;
    category_name:string;
    img_url:string;
    forSale:boolean;
    price:number;
}

const getProductByUser = async (token:string):Promise<ProductsCollectables[]> => {
  let products:any = '';
  if (token !== undefined) {
    await api.post(`/users/getid`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
    })
    .then(async function (response) {
        const  resp = await getProduct(token, response.data.user_id);
        products = resp;
    }).catch(error => {
       console.log(error.data.message);
    })
  }
  return products;
}

export default getProductByUser;