//React
import * as React from "react";

/* Next */
import Router from "next/router";
import type { NextPage } from "next";
import { GetServerSidePropsContext } from "next";

//Components
import Header from "../components/Header";
import NewCard from "../components/Header/Cart.tsx/NewCard";

//Material-UI
import { Button, Link } from "@mui/material";

//Cookies
import { parseCookies, setCookie } from "nookies";

//Global
import getCart from "../global/functions/getCart";

//Context
import { useCart } from "../hooks/context/useCart";

//Services
import refresh_token from "../services/refresh_token";
import balanceBNBtoDolar from "../services/balanceBNBtoDolar";
import getUserID from "../services/users/getUserID";
import getUserName from "../services/users/getUserName";
import isAdminUser from "../services/users/isAdminUser";

type Product = {
  id: string;
  product_name: string;
  img_url: string;
  price: number;
}

const Cart: NextPage = (props) => {
  const { token, cart, balance, username, admin }: any = props;
  const { cartProducts, getCartCookie, getTotalValue } = useCart();

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
    <div className="main-cart">
      <section className="header">
        <Header 
          currentPage="Cart" 
          token={token} 
          username={username}
          isAdmin={admin}
        />
      </section>
      <div className="content-cart-title">
        <div className="content-cart-group">
          <div className="content-cart-price">
            <h1>Cart Total: {getTotalValue('converted', balance)}BNB</h1>
            <img 
                className="token-icon" 
                src="/assets/img/bnb-token.svg" 
            />
          </div>
          <Link
              className="content-button-payment"
              href="#"
              underline="none"
          >
              <Button 
                variant="contained" 
                color="primary"
                disabled={ (cartProducts.length === 0) ? true : false }
                onClick={() => Router.push('/buy')}
                sx={{
                    width: "100%",
                }}>
                Make a Payment
              </Button>
          </Link>
        </div>
      </div>
      <section className="content">
      {cartProducts.map(
        (product: Product, index) =>
        <div
          className="sub-content" 
          key={index}
        >
          <NewCard 
            id={product.id}
            product_name={product.product_name}
            img_url={product.img_url}
            price={product.price}
            balance={balance}
          />  
        </div>
      )}
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
    const cart = getCart(session);
    const balance = await balanceBNBtoDolar(session);
    const user_id = await getUserID(token);
    const username = await getUserName(token, user_id);
    const admin = await isAdminUser(token, user_id);

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
        balance,
        username,
        admin,
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

export default Cart;
