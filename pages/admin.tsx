//React
import * as React from "react";

/* Next */
import type { NextPage } from "next";
import { GetServerSidePropsContext } from "next";

// Nookies
import { parseCookies, setCookie } from "nookies";

//Components page
import Dashboard from "../components/page/dashboard";

// Services API
import refresh_token from '../services/refresh_token'
import getUserID from "../services/users/getUserID";
import getUserName from "../services/users/getUserName";
import isAdminUser from "../services/users/isAdminUser";

//Context
import { useCart } from "../hooks/context/useCart";

//Global
import getCart from "../global/functions/getCart";

const Admin: NextPage = (props) => {
  const { token, cart, username, admin }: any = props;
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
    <> 
       
    </>
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
