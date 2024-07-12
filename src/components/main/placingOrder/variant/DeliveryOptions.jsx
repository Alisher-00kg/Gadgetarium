import { styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CheckBox from '../../../UI/CheckBox.jsx';
import { PersonalDataDelivery } from './PersonalDataDelivery.jsx';
import { PersonalDataPickup } from './PersonalDataPickup.jsx';

export const DeliveryOptions = ({ paymentChange }) => {
   const [selectedOption, setSelectedOption] = useState(null);

   const handleCheckBoxChange = option => {
      setSelectedOption(option);
   };

   return (
      <div>
         <Title>Варианты доставки</Title>
         <Container>
            <FirstBlock isChecked={selectedOption === 'pickup'}>
               <Block>
                  <CheckBox
                     type="checkbox"
                     checked={selectedOption === 'pickup'}
                     onChange={() => handleCheckBoxChange('pickup')}
                  />
                  <span>Самовывоз из магазина</span>
               </Block>
               <BlockItem>
                  <p>Забрать 20 июля</p>
                  <span>Бесплатно</span>
               </BlockItem>
            </FirstBlock>
            <SecondBlock isChecked={selectedOption === 'delivery'}>
               <Block>
                  <CheckBox
                     type="checkbox"
                     checked={selectedOption === 'delivery'}
                     onChange={() => handleCheckBoxChange('delivery')}
                  />
                  <span>Доставка курьером</span>
               </Block>
               <BlockItem>
                  <p>Забрать 20 июля</p>
                  <span>Бесплатно свыше 10 000 с</span>
                  <p>до 10 000 с — от 200 с</p>
               </BlockItem>
            </SecondBlock>
         </Container>
         <Line></Line>
         {selectedOption === 'pickup' && (
            <PersonalDataPickup paymentChange={paymentChange} />
         )}
         {selectedOption === 'delivery' && <PersonalDataDelivery />}
      </div>
   );
};
const Line = styled('div')(() => ({
   width: '750px',
   borderBottom: '1px solid #cdcdcd',
   paddingTop: '40px',
}));
const Container = styled('div')(() => ({
   display: 'flex',
   gap: '30px',
}));
const Title = styled('h2')(() => ({
   fontFamily: 'Inter',
   fontWeight: '700',
   fontSize: '24px',
   paddingBottom: '30px',
}));
const FirstBlock = styled('div')(({ isChecked }) => ({
   width: '320px',
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
      fontWeight: '700',
      fontSize: '18px',
   },
}));
const Block = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
}));
const BlockItem = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '5px',
   paddingLeft: '40px',
}));
const SecondBlock = styled('div')(({ isChecked }) => ({
   width: '320px',
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
      fontWeight: '700',
      fontSize: '18px',
      //   width: '220px',
   },
}));
