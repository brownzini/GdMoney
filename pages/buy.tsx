//React
import * as React from "react";

//Compnents
import Header from "../components/Header";
import SimpleAccordion from "../components/page/buy/SimpleAccordion";

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

//Icons
import AppsIcon from "@mui/icons-material/Apps";

type Product = {
  id: string;
  product_name: string;
  img_url: string;
  price: number;
};

const Buy = (props: any) => {
  const { token, cart, balance }: any = props;
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
    <div className="main-buy">
      <section className="header">
        <Header currentPage="Buy" token={token} />
      </section>
      <section className="content">
        <div className="content-details">
          <div className="content-details-title">
            <AppsIcon fontSize="large" /> <h1>Purchase Details</h1>
          </div>
          <div className="content-details-body">
            <div>
              {cartProducts.map((product: Product, index) => (
                <div className="sub-content" key={index}>
                  <SimpleAccordion
                    id={product.id}
                    product_name={product.product_name}
                    priceConverted={String(product.price/balance).substr(0, 7)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="content-payment">
          <h1>confirm</h1>
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
