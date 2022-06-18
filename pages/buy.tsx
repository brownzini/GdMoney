//React
import * as React from "react";

//Compnents
import Header from "../components/Header";

//Next
import { GetServerSidePropsContext } from "next";

//Cookies
import { parseCookies, setCookie } from "nookies";

//Services
import refresh_token from "../services/refresh_token";
import balanceBNBtoDolar from "../services/balanceBNBtoDolar";

//Global
import getCart from "../global/functions/getCart";

//Context
import { useCart } from "../hooks/context/useCart";

const Buy = (props:any) => {
    const { token, cart, balance }: any = props;
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
      <div className="main-buy">
        <section className="header">
          <Header currentPage="Home" token={token} />
        </section>
        <section className="content"> 
            <div className="content-details">
                <h1>details</h1>
            </div>
            <div className="content-">
                <h1>confirm</h1>
            </div>
        </section>
      </div>
    )
}

export const getServerSideProps = async (
    context: GetServerSidePropsContext
  ) => {
    try {
      const session = parseCookies(context);
      const token = await refresh_token(session);
      const cart = getCart(session);
      const balance = await balanceBNBtoDolar(session);
  
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
          balance
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

export default Buy;