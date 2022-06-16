//React
import * as React from "react";

//Material-UI
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

type Props = {
  username: string;
  data: string;
  price: string;
  img_url:string;
}

export default function RecipeReviewCard({
  username = 'user',
  data,
  price,
  img_url,
}:Props) {
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
        onClick={() => console.log('clicou no gif kkkkkk')}
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
        <h1> { price } </h1>
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
        <IconButton aria-label="add to favorites">
          <AddShoppingCartIcon
            sx={{
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                color: "#b30794",
              },
            }}
          />
        </IconButton>

        <IconButton aria-label="add to favorites">
          <LocalAtmIcon
            sx={{
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                color: "red",
              },
            }}
          />
        </IconButton>
      </CardActions>
    </Card>
  );
}
