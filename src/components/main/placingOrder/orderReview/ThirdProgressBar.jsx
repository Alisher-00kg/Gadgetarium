import { styled } from '@mui/material';
import React from 'react';

export const ThirdProgressBar = () => {
   return (
      <Container>
         <div>
            <LineBlock>
               <AllNumber>1</AllNumber>
               <AllLine></AllLine>
            </LineBlock>
            <p>Варианты доставки</p>
         </div>
         <div>
            <LineBlock>
               <AllNumber>2</AllNumber>
               <AllLine></AllLine>
            </LineBlock>
            <p>Оплата</p>
         </div>
         <div>
            <LineBlock>
               <AllNumber>3</AllNumber>
            </LineBlock>
            <p>Обзор заказа</p>
         </div>
      </Container>
   );
};
const Container = styled('div')(() => ({
   display: 'flex',
   p: {
      color: '#cb11ab',
      fontWeight: '500',
      paddingTop: '16px',
   },
}));
const AllLine = styled('div')(() => ({
   width: '300px',
   borderBottom: '2px solid #cd11ab',
}));

const LineBlock = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
}));
const AllNumber = styled('span')(() => ({
   color: '#ffffff',
   width: '35px',
   height: '35px',
   background: '#cb11ab',
   borderRadius: '30px',
   textAlign: 'center',
   paddingTop: '5px',
   fontFamily: 'Inter',
   fontWeight: '600',
   fontSize: '18px',
}));
