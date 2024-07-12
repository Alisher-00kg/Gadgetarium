import { styled } from '@mui/material';
import React, { useState } from 'react';
import { FirstProgressBar } from './FirstProgressBar';
import { DeliveryOptions } from './DeliveryOptions';
import { BreadCrumbs } from '../../../UI/BreadCrumbs';
import { Payment } from '../payment/Payment';
import { OrderPrice } from './OrderPrice';
import { SuccessfulModal } from '../payment/SuccessfulModal';

export const PlacingOrder = () => {
   const [showPayment, setShowPayment] = useState(true);

   const bread = [
      {
         label: 'Главная',
         href: '/hfjds',
      },
      {
         label: 'Корзина',
         href: '/card',
      },
      {
         label: 'Оформление заказа',
         href: '/hfjds',
      },
   ];
   const paymentChange = () => {
      setShowPayment(false);
   };
   return (
      <Wrapper>
         <BreadCrumbs breadcrumbs={bread} />
         <Title>Оформление заказа</Title>
         <Line></Line>
         {showPayment ? (
            <Block>
               <Container>
                  <FirstProgressBar />
                  <DeliveryOptions paymentChange={paymentChange} />
               </Container>
               <OrderPrice />
               <SuccessfulModal />
            </Block>
         ) : (
            <Payment />
         )}
      </Wrapper>
   );
};

const Title = styled('h1')(() => ({
   fontFamily: 'Ubuntu',
   fontWeight: '500',
   fontSize: '30px',
}));
const Line = styled('div')(() => ({
   width: '100%',
   borderBottom: '1px solid #cdcdcd',
   paddingTop: '20px',
}));
const Wrapper = styled('div')(() => ({
   padding: '100px',
   background: '#f4f4f4',
}));
const Block = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   paddingTop: '50px',
}));
const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '39px',
}));
