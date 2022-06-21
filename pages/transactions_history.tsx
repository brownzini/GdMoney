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
import getTransactions from "../services/getTransactions";
import getUserName from "../services/users/getUserName";
import isAdminUser from "../services/users/isAdminUser";

//Context
import { useCart } from "../hooks/context/useCart";

//Global
import getCart from "../global/functions/getCart";

//Components
import Header from "../components/Header";
import Table from "../components/page/transactions_history/Table";

const TransactionsHistory: NextPage = (props) => {
  const { token, cart, transactions, username, admin }: any = props;
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
        <Header 
          currentPage="Transaction_Hitory" 
          token={token} 
          username={username}
          isAdmin={admin}
        />
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
              {transactions.map((transaction: any, index: React.Key | null | undefined) =>
                <div key={index}> 
                  <Table 
                    product_name={transaction.product_name}
                    status={transaction.status}
                    date={transaction.data}
                  />
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
    const transactions = await getTransactions(token,user_id);
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
        transactions,
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

export default TransactionsHistory;
