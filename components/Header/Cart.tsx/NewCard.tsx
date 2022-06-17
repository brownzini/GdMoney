// Material-UI
import { IconButton } from "@mui/material";

//Icons
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  id: string;
  product_name: string;
  img_url: string;
  price: number;
}

const NewCard = ({
  id,
  product_name,
  img_url,
  price,
}:Props) => {
    return (
      <div className="content-cart-items">
        <div className="content-header">
          <h3> {product_name} </h3>
        </div>
        <div className="content-body">
          <img src={img_url} />

          <div className="content-footer">
            <div className="content-footer-price">
              <p> {price} </p>
              <img 
                className="token-icon" 
                src="/assets/img/bnb-token.svg" 
              />
            </div>
            <IconButton
              onClick={() => console.log(id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      </div>
    )
}

export default NewCard;