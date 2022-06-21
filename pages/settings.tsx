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

//Context
import { useCart } from "../hooks/context/useCart";

//Material-UI
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";

//Global
import getCart from "../global/functions/getCart";
import Header from "../components/Header";

const Settings: NextPage = (props) => {
  const { token, cart, username }: any = props;
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
    <div className="main-settings">
      <section className="header">
        <Header 
          currentPage="Cart" 
          token={token} 
          username={username}
        />
      </section>
      <section className="content">
        <div className="content-settings-title">
            <h1> Settings </h1>
        </div>
        <div className="content-body">
            <form>
                <div className="content-username">
                <TextField 
                  id="filled-basic" 
                  label="Username" 
                  variant="filled" 
                />
                </div>
                <div className="content-wallet-address">
                <TextField
                  id="outlined-password-input"
                  label="Wallet Address"
                  type="normal"
                  autoComplete="wallet-address"
                />
                </div>
                <div className="content-password">
                <TextField
                  id="outlined-password-input"
                  label="Current password"
                  type="password"
                  autoComplete="current-password"
                />
                </div>
                <div className="content-newpassword">
                <TextField
                  id="outlined-password-input"
                  label="New password"
                  type="password"
                  autoComplete="new-password"
                />
                </div>
                <div className="content-button">
                    <Button
                        sx={{
                            background: 'black',
                            color: 'white',
                            width: '100%',
                        }}
                    >
                        Save
                    </Button>
                </div>
            </form>    
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
        username
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

export default Settings;
