import React, { useEffect, useState } from 'react';
import Delete from '../../assets/icons/delete.svg?react';
import { BreadCrumbs } from '../../components/UI/BreadCrumbs';
import {
   Tab,
   Table,
   TableBody,
   TableCell,
   TableRow,
   Tabs,
   styled,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { historyBasketThunks } from '../../store/thunks/historyBasketThunks';
import HistoryMan from '../../assets/images/nothistoeryman.svg?react';
import { useNavigate } from 'react-router';
import { IconButton } from '../../components/UI/IconButton';

const breadcrumbsArray = [
   {
      label: 'Личный кабинет',
      href: '/user',
   },
   {
      label: 'История заказов',
      href: '/order/${orderId}',
   },
];
const HistoryBasket = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [activeTab, setActiveTab] = useState('history');

   const { orders } = useSelector(state => state.orders);

   useEffect(() => {
      dispatch(historyBasketThunks());
   }, []);

   const handleOrderClick = orderId => {
      navigate(`/order/${orderId}`);
   };

   return (
      <BigWrapper>
         <BreadCrumbs breadcrumbs={breadcrumbsArray} />
         <ConHistory>
            <TitleHistory>История заказов</TitleHistory>
         </ConHistory>
         <TabsContainer>
            <Tabs>
               <AllProductIcon
                  label="История заказов"
                  sx={{ marginRight: '12px' }}
                  onClick={() => setActiveTab('history')}
               />

               <InFavoritesIcon
                  label="Избранное"
                  sx={{ marginRight: '12px' }}
                  onClick={() => setActiveTab('favorites')}
               />

               <ProfileTab
                  label="Профиль"
                  sx={{ marginRight: '12px' }}
                  onClick={() => setActiveTab('profile')}
               />
            </Tabs>
            <StyleDeleteReset>
               <ResetBasket>
                  <DeleteIcon />
                  Очистить список заказов
               </ResetBasket>
            </StyleDeleteReset>
         </TabsContainer>
         {activeTab === 'history' && (
            <>
               {orders?.data?.length > 0 ? (
                  <TableContainer>
                     <TableBody>
                        {orders.data.map(order => (
                           <TableRow
                              key={order.id}
                              onClick={() => handleOrderClick(order.id)}
                              style={{ cursor: 'pointer' }}
                           >
                              <TableCell>{order.createdAt}</TableCell>
                              <TableCellNumber>№{order.number}</TableCellNumber>
                              <TableCell
                                 style={{
                                    paddingRight: '200px',
                                    color: 'rgb(41, 154, 13)',
                                 }}
                              >
                                 {order.status}
                              </TableCell>
                              <TableCellNumber>
                                 {order.deliveryPrice} руб.
                              </TableCellNumber>
                           </TableRow>
                        ))}
                     </TableBody>
                  </TableContainer>
               ) : (
                  <OrderNotFaound>
                     <HistoryMan />
                     <p>Здесь пока пусто</p>
                     <p>Здесь будет храниться история ваших заказов.</p>
                     <StyledIconButton>К покупкам</StyledIconButton>
                  </OrderNotFaound>
               )}
            </>
         )}
      </BigWrapper>
   );
};

export default HistoryBasket;
const BigWrapper = styled('div')(() => ({
   padding: '0 100px 0 100px',
   overflow: 'hidden',
}));
const ConHistory = styled('div')(() => ({
   padding: '30px 30px 20px 0',
}));
const TitleHistory = styled('h3')(() => ({
   width: '1050px',
   borderBottom: '1px solid rgb(205, 205, 205)',
   paddingBottom: '20px',
   color: 'rgb(41, 41, 41)',
   fontFamily: 'Ubuntu',
   fontSize: '30px',
   fontWeight: '500',
}));
const TabsContainer = styled('div')(() => ({
   display: 'flex',
   gap: '400px',
   paddingBottom: '30px',
}));
const StyleDeleteReset = styled('div')(() => ({
   display: 'flex',
}));
const ResetBasket = styled('div')(() => ({
   paddingTop: '25px',
   color: 'rgb(41, 41, 41)',
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '400',
}));

const TableContainer = styled(Table)(() => ({
   width: '1050px',
}));

const AllProductIcon = styled(Tab)(() => ({
   border: 'none',
   background: ' rgb(56, 66, 85)',
   color: 'rgb(255, 255, 255)',
   cursor: 'pointer',
   borderRadius: '4px',
   width: '160px',
   height: '34px',
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '600',
   lineHeight: '19px',
   textTransform: 'inherit',
}));
const InFavoritesIcon = styled(Tab)(() => ({
   background: 'rgb(224, 226, 231)',
   color: 'rgb(56, 66, 85)',
   width: '117px',
   height: '34px',
   borderRadius: '4px',
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '600',
   lineHeight: '19px',
   textTransform: 'inherit',
   '&.Mui-selected': {
      backgroundColor: ' rgb(56, 66, 85)',
      color: 'white',
   },
}));
const ProfileTab = styled(Tab)(() => ({
   background: 'rgb(224, 226, 231)',
   color: 'rgb(56, 66, 85)',
   width: '105px',
   height: '34px',
   borderRadius: '4px',
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '600',
   lineHeight: '19px',
   textTransform: 'inherit',
   '&.Mui-selected': {
      backgroundColor: ' rgb(56, 66, 85)',
      color: 'white',
   },
}));
const TableCellNumber = styled(TableCell)(() => ({
   color: 'rgb(41, 41, 41)',
   fontFamily: 'Inter',
   fontSize: '18px',
   fontWeight: '700',
}));
const DeleteIcon = styled(Delete)(() => ({
   paddingTop: '3px',
   path: {
      fill: 'rgb(41, 41, 41)',
      stroke: 'rgb(41, 41, 41)',
   },
}));
const OrderNotFaound = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
}));
const StyledIconButton = styled(IconButton)(() => ({
   width: '141px',
   height: '43px',
   borderRadius: '4px',
   backgroundColor: ' rgb(203, 17, 171)',

   marginTop: '12px',
   marginLeft: '20px',
   cursor: 'pointer',
   color: 'rgb(255, 255, 255)',
   fontFamily: 'Inter',
   fontSize: '16px',
   fontWeight: '600',
   lineHeight: '19px',
   '&:hover': {
      backgroundColor: ' rgb(203, 17, 171)',
   },
}));
