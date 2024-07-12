import { styled } from '@mui/material';
import React, { useState } from 'react';
import CheckBox from '../../../UI/CheckBox';
import CartLogo from '../../../../assets/icons/cart-logo.svg?react';
import { OnlinePayment } from './OnlinePayment';

export const PaymentMethod = ({ onSubmit }) => {
   const [selectedOption, setSelectedOption] = useState(null);

   const handleCheckBoxChange = option => {
      setSelectedOption(option);
   };
   return (
      <div>
         <Title>Способ оплаты</Title>
         <Container>
            <Block isChecked={selectedOption === 'online'}>
               <MiniBlock>
                  <CheckBox
                     type="checkbox"
                     checked={selectedOption === 'online'}
                     onChange={() => handleCheckBoxChange('online')}
                  />
                  <p>Оплата картой онлайн</p>
               </MiniBlock>
               <BlockItem>
                  <CartLogo />
               </BlockItem>
            </Block>
            <Block isChecked={selectedOption === 'uponReceipt'}>
               <MiniBlock>
                  <CheckBox
                     type="checkbox"
                     checked={selectedOption === 'uponReceipt'}
                     onChange={() => handleCheckBoxChange('uponReceipt')}
                  />
                  <p>Картой при получении</p>
               </MiniBlock>
               <BlockItem>
                  <p>Предоплата не требуется.</p>
                  <CartLogo />
               </BlockItem>
            </Block>
            <Block isChecked={selectedOption === 'cash'}>
               <MiniBlock>
                  <CheckBox
                     type="checkbox"
                     checked={selectedOption === 'cash'}
                     onChange={() => handleCheckBoxChange('cash')}
                  />
                  <p>Наличными при получении</p>
               </MiniBlock>
               <BlockItem>
                  <span>Предоплата не требуется. </span>
               </BlockItem>
            </Block>
         </Container>
         {selectedOption === 'online' && <OnlinePayment onSubmit={onSubmit} />}
      </div>
   );
};
const Title = styled('h2')(() => ({
   fontFamily: 'Inter',
   fontWeight: '700',
   fontSize: '24px',
   paddingTop: '30px',
   paddingBottom: '30px',
}));
const BlockItem = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '5px',
   paddingLeft: '40px',
}));
const Block = styled('div')(({ isChecked }) => ({
   width: '310px',
   height: '189px',
   borderRadius: '6px',
   background: '#ffffff',
   padding: '26px 12px',
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
   border: `2px solid ${isChecked ? '#2fc509' : 'white'}`,
   span: {
      fontFamily: 'Inter',
      fontWeight: '400',
   },
}));

const Container = styled('div')(() => ({
   display: 'flex',
   gap: '30px',
   paddingBottom: '40px',
}));
const MiniBlock = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   p: {
      fontFamily: 'Inter',
      fontWeight: '700',
      fontSize: '18px',
   },
}));
