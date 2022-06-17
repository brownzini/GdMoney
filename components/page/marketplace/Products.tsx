//React
import * as React from "react";

// Components
import Card from "./Card";

//Services
import api from "../../../services/api";

// Loading Animation
import CircularProgress from "@mui/material/CircularProgress";
import errors from "../../../global/errors";

type Products = {
  id: string;
  img_url: string;
  price: number;
  user_id: string;
  data: string;
  forSale: boolean;
  username: string;
};

type Props = {
  id_category: string;
  token: any;
  products: Products[];
  setProducts: React.Dispatch<React.SetStateAction<Products[]>>;
  startIndex:number;
  endIndex:number;
  balanceUSD:number;
};

export default function Products({
  id_category,
  token,
  products,
  setProducts,
  startIndex,
  endIndex,
  balanceUSD,
}: Props) {
  const balance = Number(balanceUSD);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
 
  const currentProducts = products.slice(startIndex, endIndex);
  
  async function getProductsByCategory() {
    setIsLoading(true);
    try {
      await api
        .get(`/products/bycategory/${id_category}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          res.data.products.unshift(res.data.products[0]);
          setTimeout(() => {
            setProducts(res.data.products);
            setIsLoading(false);
          }, 500);
        })
        .catch((err) => {
          errors(err.response.data.message);
        });
    } catch (error) {}
  }

  React.useEffect(() => {
    setProducts([]);
    getProductsByCategory();
  }, [id_category]);

  return (
    <ul>
      {currentProducts.map(
        (product: Products, index) =>
          product.forSale &&
          !isLoading && (
            <li key={index} onClick={() => console.log('')}>
              <Card
                username={product.username}
                data={product.data}
                price={(String(product.price/balance)).substr(0, 7)}
                img_url={product.img_url}
              />
            </li>
          )
      )}
      <li>{isLoading && <CircularProgress color="inherit" />}</li>
      {products.length-1 === 0 && !isLoading && (
        <li className="not-found-product">
          <img src="/assets/img/has-nothing.png" />
          <h1> This category has no more products </h1>
        </li>
      )}
    </ul>
  );
}