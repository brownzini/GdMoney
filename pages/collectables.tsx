//React
import * as React from "react";

/* Next */
import type { NextPage } from "next";
import { GetServerSidePropsContext } from "next";

// Nookies
import { parseCookies, setCookie } from "nookies";

//Components page
import Header from "../components/Header";

// Services API
import refresh_token from '../services/refresh_token'
import getProductByUser from "../services/users/getProductByUser";
import getUserID from "../services/users/getUserID";
import getWalletUser from "../services/users/getWalletUser";
import getUserName from "../services/users/getUserName";
import isAdminUser from "../services/users/isAdminUser";

//Context
import { useCart } from "../hooks/context/useCart";

//Global
import getCart from "../global/functions/getCart";

//Components
import MediaCard from "../components/page/collectables/MediaCard";
import BasicModal from "../components/page/collectables/BasicModal";
import ErrorModal from "../components/page/collectables/ErrorModal";

//Types
import { ProductsCollectables, State } from "../global/types/collectables";

const Collectables: NextPage = (props) => {
  const { token, cart, productsALL, wallet_address, username, admin }: any = props;
  const { getCartCookie } = useCart();

  const [open, setOpen] = React.useState(false);
  const [indexProduct, setIndexProduct] = React.useState(0);

  const [responseAmount, setResponseAmount] = React.useState({
     status: false,
     message: '',
  });

  const [values, setValues] = React.useState<State>({
    amount: '',
  });

  const [products, setProducts] = React.useState<ProductsCollectables[]>(productsALL);

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

  const handleOpen = (id:string) => {
    setIndexProduct(products.findIndex((prod: { id: string; }) => prod.id === id));
    setOpen(true);
  }

  return (
    <div className="main-collectables">
      {(wallet_address !== '') ? (
         <BasicModal 
          token={token}
          open={open}
          setOpen={setOpen}
          indexProduct={indexProduct}
          products={products}
          setResponseAmount={setResponseAmount}
          responseAmount={responseAmount}
          values={values}
          setValues={setValues}
          setProducts={setProducts}
         />
        ) : (
          <ErrorModal 
            open={open} 
            setOpen={setOpen} 
          />
        )}
      <section className="header">
        <Header 
          currentPage="Collectables" 
          token={token} 
          username={username}
          isAdmin={admin}
        />
      </section>
      <section className="content">
        <div className="content-collectable-title">
          <h1> My Collectables </h1>
        </div>
        <div className="content-body"> 
         <ul>
          {products.map((product: ProductsCollectables, index: React.Key | null | undefined) =>
            <li key={index}>
               <MediaCard
                  handleOpen={handleOpen} 
                  id={product.id} 
                  token={token}
                  product_name={product.product_name} 
                  category_name={product.category_name}
                  img_url={product.img_url}
                  forSale={product.forSale}
                  setProducts={setProducts}
                  setOpen={setOpen}
                />
            </li>
          )}
         </ul>
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
    const productsALL = await getProductByUser(token);
    const user_id = await getUserID(token);
    const wallet_address = await getWalletUser(token, user_id);
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
        productsALL,
        wallet_address,
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

export default Collectables;
