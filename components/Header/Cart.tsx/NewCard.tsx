// Material-UI
import { IconButton } from "@mui/material";

//Icons
import DeleteIcon from '@mui/icons-material/Delete';

//Context
import { useCart } from "../../../hooks/context/useCart";

type Props = {
  id: string;
  product_name: string;
  img_url: string;
  price: number;
  balance:number;
}

const NewCard = ({
  id,
  product_name,
  img_url,
  price,
  balance,
}:Props) => {
    const { deleteCart } = useCart();
    return (
      <div className="content-cart-items">
        <div className="content-header">
          <h3> {product_name} </h3>
        </div>
        <div className="content-body">
          <img src={img_url} />

          <div className="content-footer">
            <div className="content-footer-price">
              <p> {String(price/balance).substr(0, 7)}BNB </p>
              <img 
                className="token-icon" 
                src="/assets/img/bnb-token.svg" 
              />
            </div>
            <IconButton
              onClick={() => {
                deleteCart(id)
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      </div>
    )
}

export default NewCard;