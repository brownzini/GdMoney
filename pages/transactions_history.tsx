//React
import * as React from "react";

/* Next */
import type { NextPage } from "next";
import { GetServerSidePropsContext } from "next";

// Nookies
import { parseCookies, setCookie } from "nookies";

// Services API
import refresh_token from '../services/refresh_token'

//Context
import { useCart } from "../hooks/context/useCart";

//Global
import getCart from "../global/functions/getCart";

//Components
import Header from "../components/Header";
import Table from "../components/page/transactions_history/Table";

const TransactionsHistory: NextPage = (props) => {
  const { token, cart }: any = props;
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
    <div className="main-transation-history">
      <section className="header">
        <Header currentPage="Cart" token={token} />
      </section>
      <section className="content">
        <div className="content-th-title">
          <h1> Transactions History </h1>
        </div>
        <div className="content-body"> 
          <div className="content-history"> 
            <div className="table-head">
              <p> Product Name </p>
              <p> Status </p>
              <p> Data </p>
            </div>
            <div className="content-body-items">
              <Table />
            </div>
          </div>
          <div className="content-transaction"> 
            <h1> xxxxx </h1>
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
        cart
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

export default TransactionsHistory;
