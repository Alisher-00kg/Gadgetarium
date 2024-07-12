import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBasketAmount } from '../../../../store/thunks/cartThunks';
import { styled } from '@mui/material';

export const OrderPrice = () => {
   const dispatch = useDispatch();
   const { orderAmounts, gadgetResponse } = useSelector(
      state => state.orderAmounts,
   );
   useEffect(() => {
      dispatch(getBasketAmount({ ids: 2 }));
   }, []);
   return (
      <div>
         <Container>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               <Title>Сумма заказа</Title>
               <TextStyle>Изменить</TextStyle>
            </div>
            <Line></Line>
            <Box>
               <Block>
                  <p>Количество товаров: </p>
                  <p>Ваша скидка:</p>
                  <p>Сумма:</p>
                  <Total>Итого</Total>
               </Block>
               <Block>
                  <p>{orderAmounts.quantity}шт</p>
                  <p style={{ color: 'red' }}>
                     {' '}
                     {orderAmounts.discountPrice} -с
                  </p>
                  <p> {orderAmounts.price} с</p>
                  <p
                     style={{
                        fontFamily: 'Inter',
                        fontWeight: '600',
                        paddingTop: '15px',
                     }}
                  >
                     {orderAmounts.currentPrice} c
                  </p>
               </Block>
            </Box>
         </Container>
         {gadgetResponse.map(item => (
            <BoxItem key={item.id}>
               <ImageStyle src={item.image} alt="" />
               <div>
                  <Description>{item.nameOfGadget}</Description>
                  <p> Артикул: {item.article}</p>
                  <p>Кол-во: {item.quantity}</p>
                  <p>Цвет: {item.colour}</p>
               </div>
            </BoxItem>
         ))}
      </div>
   );
};
const ImageStyle = styled('img')(() => ({
   width: '74px',
   height: '84px',
}));
const Description = styled('h3')(() => ({
   fontFamily: 'Inter',
   fontSize: '18px',
   fontWeight: '400',
}));
const BoxItem = styled('div')(() => ({
   display: 'flex',
   gap: '20px',
   paddingTop: '15px',
   p: {
      fontFamily: 'Inter',
      fontSize: '14px',
      fontWeight: '400',
      color: '#384255',
   },
   div: {
      display: ' flex',
      flexDirection: 'column',
      gap: '5px',
   },
}));
const Container = styled('div')(() => ({
   width: '434px',
   height: '210px',
   borderRadius: '4px',
   background: '#ffffff',
   padding: '30px',
}));
const Title = styled('p')(() => ({
   fontFamily: 'Inter',
   fontWeight: '500',
   paddingBottom: '13px',
   fontSize: '18px',
}));
const TextStyle = styled('p')(() => ({
   fontFamily: 'Inter',
   fontWeight: '700',
   fontSize: '14px',
   color: '#4B7EE8',
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
