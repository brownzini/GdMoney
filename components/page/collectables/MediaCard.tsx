//React
import * as React from 'react';

//Material-UI
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

//Components
import BasicChips from './BasicChips';

//Services
import stopSell from '../../../services/products/stopSell';
import getProductByUser from '../../../services/users/getProductByUser';

interface ProductsCollectables {
  id:string;
  product_name:string;
  category_name:string;
  img_url:string;
  forSale:boolean;
  price:number;
}

interface Props {
  handleOpen: (id: string) => void;
  id:string;
  product_name:string;
  category_name:string;
  img_url:string;
  forSale:boolean;
  token:string;
  setProducts: React.Dispatch<React.SetStateAction<ProductsCollectables[]>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MediaCard({
  handleOpen,
  id,
  product_name,
  category_name,
  img_url,
  forSale,
  token,
  setProducts,
  setOpen,
}:Props) {

  async function cancel () {
    const response = await stopSell(
      token, 
      id, 
      !forSale
    );
    if (response === 'Updated category') {
        const productsALL = await getProductByUser(token);
        if(productsALL.length > 0) {
           setProducts(productsALL);
           setOpen(false);
        }
    }  
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={img_url}
        alt="green iguana"
      />
      <CardContent>
        <Typography 
         gutterBottom variant="h5" 
         component="div"
         sx={{
            display: 'flex',
            gap: '2%',
         }}
      >
          {product_name} <BasicChips name={category_name} />
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          size="small"
          onClick={() => (forSale) ? cancel() : handleOpen(id)}
          sx={{
            color: (!forSale) ? 'red' : '#556cd6',
          }}
        >
          {(forSale) ? 'Stop selling' : 'Sell' }
        </Button>
      </CardActions>
    </Card>
  );
}