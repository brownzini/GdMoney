//React
import * as React from 'react';

// Material-UI
import { IconButton } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

//Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

//Context
import { useCart } from '../../../hooks/context/useCart';

type Props = {
  id:string;
  product_name: string;
  priceConverted:string;
}

export default function SimpleAccordion({
  id,
  product_name,
  priceConverted,
}:Props) {
  const { deleteCart } = useCart();
  return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {product_name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="my-accordion-price">
            <Typography>
            {priceConverted} BNB
            </Typography>
            <IconButton
              onClick={() => {
                deleteCart(id)
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        </AccordionDetails>
      </Accordion>
  );
}