import { styled } from '@mui/material';
import React from 'react';

export const SecondProgressBar = () => {
   return (
      <Container>
         <div>
            <LineBlock>
               <AllNumber>1</AllNumber>
               <AllLine></AllLine>
            </LineBlock>
            <p style={{ color: '#cb11ab' }}>Варианты доставки</p>
         </div>
         <div>
            <LineBlock>
               <AllNumber>2</AllNumber>
               <AllLine></AllLine>
            </LineBlock>
            <p style={{ color: '#cb11ab' }}>Оплата</p>
         </div>
         <div>
            <LineBlock>
               <Third>3</Third>
            </LineBlock>
            <p>Обзор заказа</p>
         </div>
      </Container>
   );
};
const Container = styled('div')(() => ({
   display: 'flex',
   paddingTop: '50px',
   p: {
      paddingTop: '16px',
      fontFamily: 'Inter',
      fontWeight: '500',
      color: '#686868',
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
const Third = styled('span')(() => ({
   color: '#ffffff',
   width: '35px',
   height: '35px',
   background: '#c6c6c6',
   borderRadius: '30px',
   textAlign: 'center',
   paddingTop: '5px',
   fontFamily: 'Inter',
   fontWeight: '600',
   fontSize: '18px',
}));
