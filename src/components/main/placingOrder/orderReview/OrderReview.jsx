import React, { useEffect } from 'react';
import { ThirdProgressBar } from './ThirdProgressBar';
import { styled } from '@mui/material';
import { Button } from '../../../UI/Button';
import { OrderPrice } from '../variant/OrderPrice';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderReview } from '../../../../store/thunks/cartThunks';

export const OrderReview = () => {
   const dispatch = useDispatch();
   const { order } = useSelector(state => state.orderAmounts);

   useEffect(() => {
      dispatch(getOrderReview({ ids: 2 }));
   }, []);
   return (
      <Wrapper>
         <div>
            <ThirdProgressBar />
            <Title>Обзор заказа</Title>
            <Description>Итого</Description>
            <DescriptionPrice>{order.price} c</DescriptionPrice>
            <Line></Line>
            <FirstBlock>
               <h5>Доставка</h5>
               <p>{order.delivery}</p>
               <span>Изменить</span>
            </FirstBlock>
            <SecondBlock>
               <h5>Оплата</h5>
               <p>{order.payment}</p>
               <span>Изменить</span>
            </SecondBlock>
            <Line></Line>
            <ButtonStyle variant="contained">Оформить заказ</ButtonStyle>
         </div>
         <OrderPrice />
      </Wrapper>
   );
};

const Title = styled('h2')(() => ({
   fontFamily: 'Inter',
   fontWeight: '500',
   fontSize: '24px',
   paddingTop: '30px',
   paddingBottom: '30px',
}));
const Line = styled('div')(() => ({
   width: '400px',
   borderBottom: '1px solid #cdcdcd',
   paddingBottom: '20px',
}));
const Description = styled('span')(() => ({
   fontFamily: 'Inter',
   fontWeight: '800',
   fontSize: '20px',
   color: '#cb11ab',
   paddingRight: '55px',
}));
const DescriptionPrice = styled('span')(() => ({
   fontFamily: 'Inter',
   fontWeight: '700',
   fontSize: '17px',
   color: '#cb11ab',
}));
const FirstBlock = styled('div')(() => ({
   display: 'flex',
   gap: '48px',
   paddingTop: '20px',
   paddingBottom: '20px',
   h5: {
      fontFamily: 'Inter',
      fontWeight: '700',
      color: '#384255',
   },
   p: {
      fontFamily: 'Inter',
      fontWeight: '400',
      color: '#384255',
      width: '150px',
   },
   span: {
      fontFamily: 'Inter',
      fontWeight: '700',
      color: '#4b7ee8',
      fontSize: '14px',
   },
}));
const SecondBlock = styled('div')(() => ({
   display: 'flex',
   gap: '55px',
   h5: {
      fontFamily: 'Inter',
      fontWeight: '700',
      color: '#384255',
   },
   p: {
      fontFamily: 'Inter',
      fontWeight: '400',
      color: '#384255',
      width: '150px',
   },
   span: {
      fontFamily: 'Inter',
      fontWeight: '700',
      color: '#4b7ee8',
      fontSize: '14px',
   },
}));
const ButtonStyle = styled(Button)(() => ({
   width: '400px',
   height: '57px',
   marginTop: '20px',
}));

const Wrapper = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   paddingTop: '40px',
}));
