import { styled } from '@mui/material';
import { Button } from '../../UI/Button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderAmounts } from '../../../store/thunks/productBasketThunks';

export const OrderAmount = () => {
   const dispatch = useDispatch();
   const { orderAmounts, products, gadgetQuantities } = useSelector(
      state => state.basketProducts,
   );

   useEffect(() => {
      if (products.length > 0) {
         const ids = products.map(product => product.id);
         dispatch(getOrderAmounts({ ids }));
      }
   }, [products, dispatch]);
   const totalQuantity = Object.values(gadgetQuantities).reduce(
      (sum, quantity) => sum + quantity,
      0,
   );

   return (
      <Container>
         <Title>Сумма заказа</Title>
         <Line></Line>
         <Box>
            <Block>
               <p>Количество товаров: </p>
               <p>Ваша скидка:</p>
               <p>Сумма:</p>
               <Total>Итого</Total>
            </Block>
            <Block>
               <p>{totalQuantity}</p>
               <p style={{ color: 'red' }}> {orderAmounts.discountPrice} -с</p>
               <p> {orderAmounts.price} с</p>
               <p
                  style={{
                     fontFamily: 'Inter',
                     fontWeight: '600',
                     paddingTop: '15px',
                  }}
               >
                  {orderAmounts.currentPrice}c
               </p>
            </Block>
         </Box>
         <ButtonStyle variant="contained">Перейти к оформлению</ButtonStyle>
      </Container>
   );
};

const Container = styled('div')(() => ({
   width: '449px',
   height: '289px',
   borderRadius: '4px',
   background: '#ffffff',
   padding: '30px',
}));
const Title = styled('p')(() => ({
   fontFamily: 'Inter',
   fontWeight: '500',
   paddingBottom: '13px',
   fontSize: '20px',
}));
const Block = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '5px',
   p: {
      fontFamily: 'Inter',
      fontWeight: '400',
   },
}));
const Box = styled('div')(() => ({
   paddingTop: '13px',
   display: 'flex',
   gap: '65px',
}));
const Line = styled('div')(() => ({
   width: '100%',
   borderBottom: '1px solid #cdcdcd',
}));
const Total = styled('h3')(() => ({
   fontFamily: 'Inter',
   fontWeight: '600',
   padding: '15px 0px 20px 0px',
}));
const ButtonStyle = styled(Button)(() => ({
   width: '100%',
   height: '45px',
   fontFamily: 'Inter',
   fontWeight: '700',
   fontSize: '14px',
}));
