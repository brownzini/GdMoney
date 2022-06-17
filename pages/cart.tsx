/* Next */
import { Button, Link } from "@mui/material";
import type { NextPage } from "next";

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
        <div className="content-cart-group">
          <div className="content-cart-price">
            <h1>Total: 0.0355565 </h1>
            <img 
                className="token-icon" 
                src="/assets/img/bnb-token.svg" 
            />
          </div>
        <Link
            className="content-button-payment"
            href="#"
            underline="none"
        >
            <Button 
            variant="contained" 
            color="primary"
            sx={{
                width: "100%",
            }}
            >
               Make a Payment
            </Button>
        </Link>
        </div>
      </div>
      <section className="content">
           <NewCard 
              id="1"
              product_name="Product 1"
              img_url="https://mir-s3-cdn-cf.behance.net/project_modules/disp/52d159121302647.60c2db0fa736e.gif"
              price={0.0355565}
           />
      </section>
    </div>
  );
};

export default Cart;
