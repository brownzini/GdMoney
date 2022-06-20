//React
import * as React from "react";

// Components

import CategoriesFilter from "../components/page/marketplace/CategoriesFilter";
import Products from "../components/page/marketplace/Products";

/* Next */
import type { NextPage } from "next";
import { GetServerSidePropsContext } from "next";

// Nookies
import { parseCookies, setCookie } from "nookies";

// Services API
import refresh_token from "../services/refresh_token";
import PaginationItems from "../components/page/marketplace/PaginationItems";
import balanceBNBtoDolar from "../services/balanceBNBtoDolar";

//Components
import Header from "../components/Header";
import { useCart } from "../hooks/context/useCart";

//Global
import getCart from "../global/functions/getCart";
import getSpecificProduct from "../services/products/getSpecificProduct";

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

type Categories = {
  id: string;
  category_name: string;
};

const Marketplace: NextPage = (props) => {
  const { token, balance, cart }: any = props;

  const [categories, setCategories] = React.useState<Categories[]>([]);
  const [products, setProducts] = React.useState<Products[]>([]);
  
  const { getCartCookie } = useCart();

  const itemsPerPage = 1;
  const [currentPage, setCurrentPage] = React.useState<number>(1);  
  const totalPages = Math.ceil((products.length-1) / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const [id_category, setIdCategory] = React.useState<string>(
    "pafWr2eUcjFN6fGlEY7U"
  );

  React.useEffect(() => {
    if (cart !== undefined) {
      if (cart.length > 0) {
          getCartCookie(cart[0].cart);
      } 
    } else {
      getCartCookie([]);
    }
    setCookie(
      null,
      "TOKEN",
      JSON.stringify([
        {
          token: token,
        },
      ]),
      { maxAge: 86400 * 7, path: "/" }
    );
  }, []);

  return (
    <div className="main-dashboard">
      <section className="header">
        <Header currentPage="Marketplace" token={token} />
      </section>
      <section className="content">
        <div className="content-marketplace">
          <div className="content-title">
            <br />
            <br />
            <h1> Collectables </h1>
          </div>
          <div className="content-filter">
            <CategoriesFilter
              categories={categories}
              setCategories={setCategories}
              setIdCategory={setIdCategory}
            />
          </div>
          <div className="content-marketplace-list">
            <Products
              id_category={id_category}
              token={token}
              products={products}
              setProducts={setProducts}
              startIndex={startIndex}
              endIndex={endIndex}
              balanceUSD={balance}
            />
            <PaginationItems 
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              productsLength={products.length-1}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const session = parseCookies(context);
    const token = await refresh_token(session);
    const balance = await balanceBNBtoDolar(session);
    const cart = getCart(session);

    if (token === 'Token is invalid or expired') {
      return {
        redirect: {
          permanent: false,
          destination: "/landingpage",
        },
      };       
    }

    return {
      props: {
        token,
        balance,
        cart
      },
    };
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
};

export default Marketplace;
