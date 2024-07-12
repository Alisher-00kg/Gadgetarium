import React, { useEffect, useState } from 'react';
import { Tab, Tabs, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
   infoThunks,
   infograficThunks,
} from '../../store/thunks/infograficThunks';

const tabData = [
   {
      label: 'За День',
      content: 'Доставлено товаров на сумму',
      CurrentPeriod: '120 000',
      PreviousPeriod: '100 500 ',
      period: 'FOR_DAY',
   },
   {
      label: 'За Месяц',
      content: 'Доставлено товаров на сумму',
      period: 'FOR_MONTH',
      CurrentPeriod: '200 000',
      PreviousPeriod: '150 500 ',
   },
   {
      label: 'За Год',
      content: 'Доставлено товаров на сумму',
      CurrentPeriod: '400 000',
      PreviousPeriod: '300 500 ',
      period: 'FOR_YEAR',
   },
];

const BoughtData = [
   {
      Amount: '7 556',
      content: 'Выкупили на сумму',
      Quantity: '12',
      id: '1',
   },
];
const OrderedData = [
   {
      Amount: '34 562',
      content: 'Заказали на сумму',
      id: '2',
      Quantity: '56',
   },
];

export const InfoGraphics = () => {
   const [value, setValue] = useState(0);
   const { infografic, info } = useSelector(state => state.infografic);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(infograficThunks(tabData[0].period));
   }, []);

   useEffect(() => {
      dispatch(infoThunks());
   }, []);

   const handleChange = (event, newValue) => {
      setValue(newValue);
      dispatch(infograficThunks(tabData[newValue].period));
   };

   return (
      <ParentContainer>
         <Box>
            {BoughtData.map(item => (
               <StyledBoughtBox key={item.id}>
                  <div>
                     <p>
                        {info.buyPrice} <span>c</span>
                     </p>
                     <p>{item.content}</p>
                  </div>
                  <p>
                     {info.buyCount} <span>шт</span>
                  </p>
               </StyledBoughtBox>
            ))}
            {OrderedData.map(item => (
               <StyledOrderBox key={item.id}>
                  <div>
                     <p>
                        {info.orderPrice} <span>c</span>
                     </p>
                     <p>{item.content}</p>
                  </div>
                  <p>
                     {info.orderCount} <span>шт</span>
                  </p>
               </StyledOrderBox>
            ))}
         </Box>
         <StyledTabs
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{
               style: {
                  backgroundColor: 'black',
               },
            }}
         >
            {tabData.map((tab, index) => (
               <Tab key={index} label={tab.label} />
            ))}
         </StyledTabs>
         <StyledMainContainer>
            <p>{tabData[value].content}</p>
            <Container>
               <StyledFirstContainer>
                  <p>
                     {infografic.currentPeriod || 0} <span>c</span>
                  </p>
                  <p>Текущий период</p>
               </StyledFirstContainer>
               <StyledSecondContainer>
                  <p>
                     {infografic.previousPeriod || 0} <span>c</span>
                  </p>
                  <p>Предыдущий период</p>
               </StyledSecondContainer>
            </Container>
         </StyledMainContainer>
      </ParentContainer>
   );
};

const Box = styled('div')(() => ({
   display: 'flex',
   gap: '20px',
}));
const StyledBoughtBox = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
   paddingRight: '16px',
   borderRight: '1px solid rgb(205, 205, 205)',
   '& div': {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      '& p:': {
         fontSize: '26px',
         fontFamily: 'Inter',
         fontWeight: '500',
         color: 'rgb(21, 86, 222)',
      },
      ' & span': {
         color: '#384255',
         fontWeight: '500',
         borderBottom: '1px solid #384255',
      },
      '& p:last-of-type': {
         fontSize: '14px',
         fontWeight: '400',
         fontFamily: 'Inter',
         color: 'rgba(56, 66, 85, 0.7)',
      },
   },
   '& p': {
      fontFamily: 'Inter',
      fontSize: '22px',
      fontWeight: '500',
      color: '#2C68F5',
   },
}));
const StyledOrderBox = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
   paddingRight: '16px',

   '& div': {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      '& p:': {
         fontSize: '26px',
         fontFamily: 'Inter',
         fontWeight: '500',
         color: 'rgb(21, 86, 222)',
      },
      ' & span': {
         color: '#384255',
         fontWeight: '500',
         borderBottom: '1px solid #384255',
      },
      '& p:last-of-type': {
         fontSize: '14px',
         fontWeight: '400',
         fontFamily: 'Inter',
         color: 'rgba(56, 66, 85, 0.7)',
      },
   },
   '& p': {
      fontFamily: 'Inter',
      fontSize: '22px',
      fontWeight: '500',
      color: 'rgb(249, 152, 8)',
   },
}));

const ParentContainer = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '20px',
}));
const StyledTabs = styled(Tabs)(() => ({
   '.MuiButtonBase-root': {
      borderBottom: '1px solid rgb(230, 230, 230)',
   },
   '.MuiButtonBase-root:focus': {
      color: 'black',
      borderBottom: ' solid 1px black',
   },
}));

const StyledMainContainer = styled('div')(() => ({
   width: '329px',
   height: '117px',

   backgroundColor: 'rgba(21, 86, 222, 0.09)',
   borderRadius: '8px',
   padding: '14px 14px 19px 14px',

   display: 'flex',
   flexDirection: 'column',
   gap: '19px',
   '& p': {
      fontSize: '14px',
      fontWeight: '600',
      color: '#384255',
      fontFamily: 'Inter',
   },
}));

const Container = styled('div')(() => ({
   display: 'flex',
   gap: '15px',
}));

const StyledFirstContainer = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   listStyleType: 'none',
   gap: '4px',
   '& p:first-of-type': {
      fontFamily: 'Inter',
      fontSize: '24px',
      fontWeight: '600',
      color: 'rgb(47, 197, 9)',
      '& span': {
         borderBottom: '3px solid rgb(47, 197, 9) ',
      },
   },
   '& p:last-of-type': {
      fontSize: '12px',
      fontWeight: '400',
      fontFamily: 'Inter',
   },
}));
const StyledSecondContainer = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   listStyleType: 'none',
   marginTop: '11px',
   gap: '4px',

   '& p:first-of-type': {
      fontFamily: 'Inter',
      fontSize: '16px',
      fontWeight: '600',
      color: 'rgb(47, 197, 9)',
      '& span': {
         borderBottom: '2px solid rgb(47, 197, 9) ',
      },
   },
   '& p:last-of-type': {
      fontSize: '12px',
      fontWeight: '400',
      fontFamily: 'Inter',
   },
}));
