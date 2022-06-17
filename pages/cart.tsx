/* Next */
import { Button } from "@mui/material";
import type { NextPage } from "next";
import { GetServerSidePropsContext } from "next";

//Components
import Header from "../components/Header";
import NewCard from "../components/Header/Cart.tsx/NewCard";

const Cart: NextPage = (props) => {
  return (
    <div className="main-cart">
      <section className="header">
        <Header currentPage="Cart" token={""} />
      </section>
      <div className="content-cart-title">
          <div className="content-cart-price">
            <h1>Total: 0.0355565 </h1>
            <img 
                className="token-icon" 
                src="/assets/img/bnb-token.svg" 
            />
          </div>
          <Button variant="contained" color="primary">
            Finally Pay
          </Button>
      </div>
      <section className="content">
           <NewCard />
           <NewCard />
      </section>
    </div>
  );
};

export default Cart;
