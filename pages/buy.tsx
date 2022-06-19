//React
import * as React from "react";

//Components
import Header from "../components/Header";
import Payment from "../components/page/buy/Payment";

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
import Details from "../components/page/buy/Details";

// Loading Animation
import CircularProgress from "@mui/material/CircularProgress";

//Next
import Router from "next/router";

const Buy = (props: any) => {
  const { token, cart, balance }: any = props;
  const { cartProducts, getCartCookie } = useCart();

  const [ from, setFrom] = React.useState<string>("");
  const [ to, setTo] = React.useState<string>('0x10ed43c71k8714eb63d5aa57b78b54704e256024e');

  const [ error, setError ] = React.useState<boolean>(false);
  const [ message, setMessage] = React.useState<string>('Needs to be 40 characters long or more.');

  const [response, setResponse] = React.useState({
    status: false,
    message: 'default',
  });

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
    setError(false);
  }, []);

  React.useEffect(() => { 
    if (from.length < 40) {
        setError(true);
    } else {
        setError(false);
    }
  },[from]);

  React.useEffect(() => { 
    if(cartProducts.length === 0) {
        Router.push("/");
    }
  },[cartProducts]); 

  return (
    <div className="main-buy">
      <section className="header">
        <Header currentPage="Buy" token={token} />
      </section>
      <section className="content">
      {response.message !== 'loading' && 
        <Details 
          cartProducts={cartProducts}
          balance={balance}
        />
      }

      {response.message !== 'loading' &&
        <Payment
            token={token}
            balance={balance}
            message={message}
            setMessage={setMessage}
            from={from}
            to={to}
            setFrom={setFrom}
            error={error}
            setError={setError}
            setResponse={setResponse}
        />
      }

      {response.message === 'loading' &&
        <> <CircularProgress color="inherit" /> </>
      }

      {response.message === 'success' &&
        <> <h1> {response.message} </h1> </>
      }

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

    if (token === "Token is invalid or expired") {
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
