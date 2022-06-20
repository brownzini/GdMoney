//React
import * as React from "react";

//Material-UI
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";

//Icons
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

//Context
import { useCart } from "../../../hooks/context/useCart";

type Props = {
  id:string;
  product_name:string;
  username: string;
  data: string;
  price: string;
  convertedPrice:string;
  img_url:string;
  user_id?:string;
  forSale?:boolean;
  status:boolean;
}

export default function RecipeReviewCard({
  id,
  product_name,
  username = 'user',
  data,
  price,
  convertedPrice,
  img_url,
  user_id,
  status,
}:Props) {
  const { addCart, deleteCart, getProductInCart } = useCart();
  return (
    <Card
      sx={{
        maxWidth: 190,
        border: "1px solid #949494",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            { username.charAt(0) }
          </Avatar>
        }
        title={username}
        subheader={data}
      />
      <CardMedia
        component="img"
        height="194"
        image={img_url}
        alt="Paella dish"
        sx={{ cursor:'pointer' }}
      />
      <CardContent
        sx={{
          display: "inline-flex",
          width: "100%",
          justifyContent: 'center',
          fontSize:'1rem',
          color:'#2f2f2f',
        }}
      >
        <h1> { convertedPrice } </h1>
        <img 
          className="token-icon" 
          src="/assets/img/bnb-token.svg" 
        />
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          borderTop: "1px solid #949494",
        }}
      >
        {(user_id !== 'JMXwIGusdEyXTNEE51dV') ? (
        <IconButton 
          aria-label="add to favorites"
          onClick={() => {
            (getProductInCart(id) === false) 
                ? addCart({
                    id: id,
                    product_name: product_name,
                    img_url: img_url,
                    price: Number(price),
                    user_id: user_id,
                    forSale: true,
                  })
                : deleteCart(id);
          }}
        >
          <AddShoppingCartIcon
            sx={{
              transition: "all 0.3s ease-in-out",
              color: (getProductInCart(id)) ? "#b30794" : '#757575',
              "&:hover": {
                color: "#b30794",
              },
            }}
          />
        </IconButton>
        ) : (
          <> <h2> For sale</h2> </>
        )}
      </CardActions>
    </Card>
  );
}
