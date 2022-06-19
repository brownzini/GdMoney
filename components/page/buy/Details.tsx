//Components
import SimpleAccordion from "./SimpleAccordion";

//Icons
import AppsIcon from "@mui/icons-material/Apps";

type Product = {
    id: string;
    product_name: string;
    img_url: string;
    price: number;
};
  
interface Props {
    cartProducts: Product[];
    balance: number;
}

const Details = ({
    cartProducts,
    balance,
}:Props) => {
    return (
        <div className="content-details">
        <div className="content-details-title">
          <AppsIcon fontSize="large" /> <h1>Product History</h1>
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
    )
}

export default Details;