import React from 'react';
import styled from '@emotion/styled';
import { Box, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as cartSlice from '../../store/cart';
import store from '../../store';

const GridTitles = styled(Grid)({
  padding: '15px 30px',
});

const ProductRow = styled(Grid)({
  padding: '26px 30px',
  justifyContent: 'center',
  alignItems: 'center',
});

const QuantityRow = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '26px 30px',
  [theme.breakpoints.down('sm')]: {
    paddingTop: '0px',
    justifyContent: 'initial',
  },
}));

const GridContainer = styled(Grid)(({ theme }) => ({
  borderTop: '0px',
  borderLeft: '0px',
  borderRight: '0px',
  borderBottom: '1px',
  borderStyle: 'solid',
  borderColor: theme.palette.gridColor.main,
}));

const GridMainContainer = styled(Grid)(({ theme }) => ({
  borderTop: '1px',
  borderLeft: '1px',
  borderRight: '1px',
  borderBottom: '0px',
  borderStyle: 'solid',
  borderColor: theme.palette.gridColor.main,
}));

const CartTable = ({ cartItems }) => {
  const navigate = useNavigate();

  const removeFromCart = (id) => {
    const reduxAction = cartSlice.removeFromCart(id);
    store.dispatch(reduxAction);
  };

  return (
    <GridMainContainer color="textColor.main" container>
      <GridContainer container display={{ xs: 'none', sm: 'flex' }}>
        <GridTitles item xs={12} sm={6}>Product</GridTitles>
        <GridTitles item xs={12} sm={4} textAlign="center">Quantity</GridTitles>
        <GridTitles item sm={2} textAlign="center">Total</GridTitles>
      </GridContainer>
      {cartItems.map(({
        id, title, images, price, quantity,
      }) => (
        <GridContainer container key={id}>
          <ProductRow item xs={12} sm={6}>
            <Box sx={{ display: 'flex' }}>
              <Box
                component="img"
                src={images[0]}
                sx={{
                  width: '80px', objectFit: 'contain', cursor: 'pointer', mr: '20px',
                }}
                onClick={() => navigate(`/catalog/${id}`)}
              />
              <Box>
                <Typography
                  color="primary.main"
                  fontWeight="500"
                  sx={{ cursor: 'pointer' }}
                  mb="8px"
                  onClick={() => navigate(`/catalog/${id}`)}
                >
                  {title}
                </Typography>
                <Typography fontSize="15px" color="secondary.main">
                  €&nbsp;
                  {price}
                </Typography>
              </Box>
            </Box>
          </ProductRow>
          <QuantityRow item xs={12} sm={4} textAlign="center">
            <Box sx={{ flexDirection: { xs: 'row', sm: 'column' } }} display="flex" alignItems="center">
              <Typography color="primary" fontSize="17px" fontWeight={500}>{quantity}</Typography>
              <Typography onClick={() => removeFromCart(id)} sx={{ ml: { xs: '10px', sm: '0px' }, mt: { xs: '0px', sm: '12px' } }}>Remove</Typography>
            </Box>
          </QuantityRow>
          <ProductRow item xs={12} sm={2} display={{ xs: 'none', sm: 'flex' }} textAlign="center" fontSize="17px">
            {quantity * price}
            &nbsp;EUR
          </ProductRow>
        </GridContainer>
      ))}
    </GridMainContainer>
  );
};

export default CartTable;