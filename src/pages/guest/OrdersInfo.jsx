import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { orderinfoThunks } from '../../store/thunks/orderinfoThunks';
import Card from '../../components/UI/cards/Card';
import { Button, styled } from '@mui/material';
import { BreadCrumbs } from '../../components/UI/BreadCrumbs';
import { IconButton } from '../../components/UI/IconButton';
import { Icons } from '../../assets';

const OrdersInfo = () => {
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
   const dispatch = useDispatch();

   const { orderinfo } = useSelector(state => state.orderinfo);

   useEffect(() => {
      dispatch(orderinfoThunks({ orderId: 2 }));
   }, [dispatch]);
   return (
      <WrapperStyle>
         <BreaCrumStyle breadcrumbs={breadcrumbsArray} />

         <ConHistory>
            <TitleHistory>История заказов</TitleHistory>
         </ConHistory>
         {orderinfo ? (
            <div>
               <h4>Номер заказа: {orderinfo.number}</h4>
               <div style={{ display: 'flex' }}>
                  {orderinfo.privateGadgetResponse?.slice(0, 4).map(gadget => (
                     <CardContainer key={gadget.id}>
                        <Card
                           image={gadget.gadgetImage}
                           title={gadget.nameOfGadget}
                           rating={gadget.rating}
                           price={gadget.currentPrice}
                        />
                     </CardContainer>
                  ))}
               </div>
               <BoxInfoContainer>
                  <FirstInfoContainer>
                     <InfoAllTittle>Статус</InfoAllTittle>
                     <StatusStyle>
                        <PendingStyle>О ожидании</PendingStyle>
                        <Inprogress>В обработке</Inprogress>
                     </StatusStyle>
                     <div>
                        <InfoAllTittle>Клиент</InfoAllTittle>
                        <TittleServerAray>
                           {orderinfo.clientFullName}
                        </TittleServerAray>
                     </div>
                     <div>
                        <InfoAllTittle>Имя</InfoAllTittle>
                        <TittleServerAray>
                           {orderinfo.userName}
                        </TittleServerAray>
                     </div>
                     <div>
                        <InfoAllTittle>Область/регион </InfoAllTittle>
                        <TittleServerAray>Чуй </TittleServerAray>
                     </div>
                     <div>
                        <InfoAllTittle>Адрес</InfoAllTittle>
                        <TittleServerAray>{orderinfo.address}</TittleServerAray>
                     </div>
                     <div>
                        <InfoAllTittle>Телефон</InfoAllTittle>
                        <TittleServerAray>
                           {orderinfo.phoneNumber}
                        </TittleServerAray>
                     </div>
                     <div>
                        <InfoAllTittle>Email</InfoAllTittle>
                        <TittleServerAray>{orderinfo.email}</TittleServerAray>
                     </div>
                     <div style={{ paddingTop: '47px' }}>
                        <div>Скидка: {orderinfo.discount}с</div>
                        <div>Итого: 3 560 с</div>
                     </div>
                  </FirstInfoContainer>
                  <SehondInfoContainer>
                     <div>
                        <InfoAllTittle>Дата</InfoAllTittle>
                        <TittleServerAray>
                           {orderinfo.createdAt}
                        </TittleServerAray>
                     </div>
                     <div>
                        <InfoAllTittle>Способ оплаты</InfoAllTittle>
                        <TittleServerAray>{orderinfo.payment}</TittleServerAray>
                     </div>
                     <div>
                        <InfoAllTittle>Фамилия</InfoAllTittle>
                        <TittleServerAray>
                           {orderinfo.lastName}
                        </TittleServerAray>
                     </div>
                     <div>
                        <InfoAllTittle>Город</InfoAllTittle>
                        <TittleServerAray>Чуй</TittleServerAray>
                     </div>
                  </SehondInfoContainer>
               </BoxInfoContainer>
            </div>
         ) : (
            <OrderNotFaound>
               <img src="" alt="" />
               <p>Здесь пока пусто</p>
               <p>Здесь будет храниться история ваших заказов.</p>
               <StyledIconButton>К покупкам</StyledIconButton>
            </OrderNotFaound>
         )}
      </WrapperStyle>
   );
};

export default OrdersInfo;
const WrapperStyle = styled('div')(() => ({
   padding: '100px 100px',
   background: 'rgb(233, 237, 238)',
   width: '100%',
}));

const CardContainer = styled('div')(() => ({
   display: 'flex',
}));
const BoxInfoContainer = styled('div')(() => ({
   display: 'flex',
   gap: '200px',
   paddingTop: '30px',
}));
const StatusStyle = styled('div')(() => ({
   display: 'flex',
   gap: '18px',
}));
const Inprogress = styled('p')(() => ({
   borderRadius: '6px',
   background: 'rgb(189, 222, 241)',
   width: '125px',
   height: '31px',
   textAlign: 'center',
   color: 'rgb(3, 49, 82)',
   fontFamily: 'Manrope',
   fontSize: ' 14px',
   fontWeight: '600',
   lineHeight: '19px',
   padding: '5px 5px',
}));
const PendingStyle = styled('p')(() => ({
   borderRadius: '6px',
   background: ' rgb(243, 218, 165)',
   width: '125px',
   height: '31px',
   color: 'rgb(3, 49, 82)',
   fontFamily: 'Manrope',
   fontSize: ' 14px',
   fontWeight: '600',
   lineHeight: '19px',
   padding: '5px 5px',
}));

const InfoAllTittle = styled('div')(() => ({
   color: 'rgb(56, 66, 85)',
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '400',
   lineHeight: '17px',
}));

const TittleServerAray = styled('div')(() => ({
   color: 'rgb(0, 0, 0)',
   fontFamily: 'Manrope',
   fontSize: '16px',
   fontWeight: '400',
   lineHeight: '22px',
}));
const FirstInfoContainer = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '15px',
}));
const SehondInfoContainer = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '15px',
   paddingTop: '80px',
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
const BreaCrumStyle = styled(BreadCrumbs)(() => ({
   paddingRight: '0 100px 0 0',
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
const OrderNotFaound = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
}));
