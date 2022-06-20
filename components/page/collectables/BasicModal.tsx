//React
import * as React from 'react';

//Material-UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { CircularProgress, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

//Services
import updateProduct from '../../../services/products/updateProduct';
import getProductByUser from '../../../services/users/getProductByUser';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '1px solid #cbcbcb',
  boxShadow: 24,
  borderRadius: '2%',
  p: 4,
};

interface State {
  amount: string;
}

interface ProductsCollectables {
  id:string;
  product_name:string;
  category_name:string;
  price:number;
  img_url:string;
  forSale:boolean;
}

interface Props {
  token:string;
  open:boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  indexProduct:number;
  products:ProductsCollectables[];
  setResponseAmount: React.Dispatch<React.SetStateAction<{
    status: boolean;
    message: string;
  }>>;
  responseAmount: {
    status: boolean;
    message: string;
  };
  values:State;
  setValues: React.Dispatch<React.SetStateAction<State>>;
  setProducts: React.Dispatch<React.SetStateAction<ProductsCollectables[]>>;
}

export default function BasicModal({
  token,
  open,
  setOpen,
  indexProduct,
  products,
  setResponseAmount,
  responseAmount,
  values,
  setValues,
  setProducts,
}:Props) {
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleClose = () => setOpen(false);
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
  };

  function verify() {
    const type = Number(values.amount)*1;
    if ( isNaN(type) || values.amount === '') {
        setResponseAmount({
            status: true,
            message: 'Please enter a number',
        });
        return 'error';
    }
    if (Number(values.amount) <= 0) {
        setResponseAmount({
            status: true,
            message: 'Amount must be greater than 0',
        });
        return 'error';
    }
    if(Number(values.amount) > 1000 ) {
        setResponseAmount({
            status: true,
            message: 'Amount must be less than 1000',
        });
        return 'error';
    }
    if (Number(values.amount) === products[indexProduct].price) {
        setResponseAmount({
            status: true,
            message: 'Amount must be different than price',
        });
        return 'error';
    }
    setResponseAmount({
      status: false,
      message: '',
    });  
    return 'OK'; 
  }

  async function sell() {
    if (verify() === 'OK') {
        setLoading(true);
        const response = await updateProduct(
          token, 
          products[indexProduct].id, 
          Number(values.amount), 
          !products[indexProduct].forSale
        );
        if (response === 'Updated category') {
            const productsALL = await getProductByUser(token);
            if(productsALL.length > 0) {
               setProducts(productsALL);
               setOpen(false);
            }
        }
        setLoading(false);
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2> {products[indexProduct].product_name} </h2>
          <p>  {responseAmount.message} </p>
          <FormControl fullWidth sx={{ m: 1, width: '92.5%' }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={values.amount}
              onChange={handleChange('amount')}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Amount"
              error={responseAmount.status}
            />
          </FormControl>
          {!loading &&
            <Button 
              sx={{
                width: '100%',
              }}
              onClick={() => sell()}
              variant="contained" 
              endIcon={<SendIcon />}
              >
              Sell
            </Button>
          }
          {loading && 
              <div className="progress-modal"> 
                <CircularProgress color="inherit" /> 
              </div>
          }
        </Box>
      </Modal>
    </div>
  );
}