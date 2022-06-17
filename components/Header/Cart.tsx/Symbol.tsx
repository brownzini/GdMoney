//React
import * as React from 'react';

//Material-UI
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

//Components
import { useCart } from '../../../hooks/context/useCart';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function Symbol() {
  const { cartTotal } = useCart();

  return (
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={cartTotal} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
}