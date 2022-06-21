// Services API
import api from "../api";

interface ProductsCollectables {
    id:string;
    product_name:string;
    category_name:string;
    img_url:string;
    forSale:boolean;
    price:number;
}

const getAllProducts = async (token:string):Promise<ProductsCollectables[]> => {
  let products:any = [];
  if (token !== undefined) {
    await api.get(`/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
    })
    .then(async function (response) {
        products = response.data.products;
    }).catch(error => {
       console.log(error.data.message);
    })
  }
  return products;
}

export default getAllProducts;