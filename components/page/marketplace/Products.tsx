//React
import * as React from "react";

// Components
import Card from "./Card";

//Services
import api from "../../../services/api";

// Loading Animation
import CircularProgress from "@mui/material/CircularProgress";
import errors from "../../../global/errors";

//NoSSR
import NoSsr from '@mui/material/NoSsr';

type Products = {
  id: string;
  product_name:string;
  img_url: string;
  price: number;
  user_id: string;
  data: string;
  forSale: boolean;
  username: string;
  status:boolean;
};

type Props = {
  id_category: string;
  token: any;
  products: Products[];
  setProducts: React.Dispatch<React.SetStateAction<Products[]>>;
  startIndex:number;
  endIndex:number;
  balanceUSD:number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function Products({
  id_category,
  token,
  products,
  setProducts,
  startIndex,
  endIndex,
  balanceUSD,
  setCurrentPage,
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
          setIsLoading(true);
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
    setCurrentPage(1);
    getProductsByCategory();
  }, [id_category]);

  return (
    <ul>
      <NoSsr defer={false}>
      {currentProducts.map(
        (product: Products, index) =>
          (!isLoading && product.status) && (
            <li key={index}>
              <Card
                id={product.id}
                product_name={product.product_name}
                username={product.username}
                data={product.data}
                price={String(product.price)}
                convertedPrice={(String(product.price/balance)).substr(0, 7)}
                img_url={product.img_url}
                user_id={product.user_id}
                status={product.status}
              />
            </li>
          )
      )}
      </NoSsr>
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
