//React
import * as React from "react";

//Material-UI
import Button from "@mui/material/Button";

//Components
import Header from "../components/Header";
import Payment from "../components/page/buy/Payment";

//Next
import { GetServerSidePropsContext } from "next";

//Cookies
import { parseCookies, setCookie } from "nookies";

//Global
import getCart from "../global/functions/getCart";

//Context
import { useCart } from "../hooks/context/useCart";
import Details from "../components/page/buy/Details";

// Loading Animation
import CircularProgress from "@mui/material/CircularProgress";

//Next
import Router from "next/router";

//Services
import refresh_token from "../services/refresh_token";
import balanceBNBtoDolar from "../services/balanceBNBtoDolar";
import getUserID from "../services/users/getUserID";
import getUserName from "../services/users/getUserName";
import isAdminUser from "../services/users/isAdminUser";

const Buy = (props: any) => {
  const { token, cart, balance, username, admin }: any = props;
  const { cartProducts, getCartCookie } = useCart();

  const [ from, setFrom] = React.useState<string>("");
  const [ to, setTo] = React.useState<string>('0x3035b1055ea9a5993764D096b309574003AB0fEe');

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
        <Header 
          currentPage="Buy" 
          token={token} 
          username={username}
          isAdmin={admin}
        />
      </section>
      <section className="content">
      {(response.message === 'default' || response.message !== 'Success in operation') && 
        <Details 
          cartProducts={cartProducts}
          balance={balance}
        />
      }

      {(response.message === 'default' || response.message !== 'Success in operation') &&
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
            setTo={setTo}
        />
      }

      {response.message === 'loading' &&
        <> <CircularProgress color="inherit" /> </>
      }

      {response.message === 'Success in operation' &&
        <> 
          <img src="/assets/img/success.png" />
          <h1> Our congratulations on your purchase </h1>

          <Button
          type="submit"
          sx={{
            width: "15.2rem",
            height: "55px",
            background: "rgb(59, 75, 149)",
            color: "white",
            border: "1px solid #4c0f5c",
            transition: "all .5s ease-in-out",
            mt: "0.8rem",
            "&:hover": {
              color: "white",
              background: "#6272bc",
            },
          }}
          onClick={() => Router.push('/collectables')}
          variant="outlined"
        >
          my collectables
        </Button>
        </>
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
    const user_id = await getUserID(token);
    const username = await getUserName(token, user_id);
    const admin = await isAdminUser(token, user_id);

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

export default Buy;
