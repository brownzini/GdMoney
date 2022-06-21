//React
import * as React from "react";

/* Next */
import type { NextPage } from "next";
import { GetServerSidePropsContext } from "next";

// Nookies
import { parseCookies, setCookie } from "nookies";

// Services API
import refresh_token from '../services/refresh_token'
import getUserID from "../services/users/getUserID";
import getUserName from "../services/users/getUserName";
import isAdminUser from "../services/users/isAdminUser";
import getAllProducts from "../services/products/getAllProducts";

//Context
import { useCart } from "../hooks/context/useCart";

//Global
import getCart from "../global/functions/getCart";

//Components
import Header from "../components/Header";
interface Products {
    id:string;
    product_name:string;
    category_name:string;
    img_url:string;
    forSale:boolean;
    price:number;
    user_id:string;
    status:boolean;
    data:string;
}

const Admin: NextPage = (props) => {
  const { token, cart, username, admin, products }: any = props;
  const { getCartCookie } = useCart();

  React.useEffect(() => {
    if (cart.length > 0) {
        getCartCookie(cart[0].cart);
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
    <div className="main-admin">
      <section className="header">
        <Header 
          currentPage="admin" 
          token={token} 
          username={username}
          isAdmin={admin}
        />
      </section>
      <section className="content">
        <div className="content-th-title">
          <h1> Admin Área </h1>
        </div>
        <div className="content-body"> 
          <div className="content-admin"> 
            <div className="table-head">
              <div className="content-head-product-name"> Product Name </div>
              <div className="content-head-product-imgurl"> Img_url </div>
              <div className="content-head-product-forsale"> ForSale </div> 
              <div className="content-head-product-price"> Price </div> 
              <div className="content-head-product-userid"> user_id </div> 
              <div className="content-head-product-status"> Status </div> 
              <div className="content-head-product-data"> Data </div> 
            </div>
            <div className="content-body-items">
            {products.map((product: Products, index: React.Key | null | undefined) =>
                <div className="content-block"> 
                    <div className="content-body-product-name"> {product.product_name} </div>
                    <div className="content-body-product-imgurl"> {product.img_url.substr(0, 4)} </div>
                    <div className="content-body-product-forsale"> {(product.forSale) ? 'true' : 'false'} </div> 
                    <div className="content-body-product-price"> {product.price} </div> 
                    <div className="content-body-product-userid"> {product.user_id} </div> 
                    <div className="content-body-product-status"> {(product.status) ? 'true' : 'false'} </div> 
                    <div className="content-body-product-data"> {product.data} </div>   
                </div>
            )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const session = parseCookies(context);
    const token = await refresh_token(session);
    const cart = getCart(session);
    const user_id = await getUserID(token);
    const username = await getUserName(token, user_id);
    const admin = await isAdminUser(token, user_id);
    const products = await getAllProducts(token);
 
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
        cart,
        username,
        admin,
        products,
      },
    };
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/landingpage",
      },
    };
  }
};

export default Admin;
