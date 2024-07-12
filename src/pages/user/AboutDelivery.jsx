import { styled } from '@mui/material';
import React from 'react';
import { Icons } from '../../assets';
import { BreadCrumbs } from '../../components/UI/BreadCrumbs';
const { Wallet, Delivery, PaymentMahted, Payment, PaymentByCard } = Icons;

const array = [
   {
      label: 'Главная',
      href: '/',
   },
   {
      label: 'Доставка',
      href: '/delivery',
   },
];

export const AboutDelivery = () => {
   return (
      <ContainerDiv>
         <BreadCrumbs breadcrumbs={array} />
         <DeliveryStyle>Доставка</DeliveryStyle>
         <AboutDeliveryStyle>
            <p>Город дотавки</p>
            <h3>Бишкек</h3>
         </AboutDeliveryStyle>
         <AboutDeliveryAndBuy>
            <div>
               <DeliveryMethods>
                  <div>
                     <Delivery />
                  </div>
                  <div>
                     <span>Самовывоз со склада</span>
                     <p>Забрать в течение 14 дней</p>
                  </div>
               </DeliveryMethods>
               <Prepayment>
                  <Wallet />
                  <div>Предоплата не требуется</div>
               </Prepayment>
            </div>
            <div>
               <DeliveryMethods>
                  <div>
                     <Delivery />
                  </div>
                  <div>
                     <span>Самовывоз из магазина</span>
                     <p>Забрать в течение 14 дней</p>
                  </div>
               </DeliveryMethods>
               <Prepayment>
                  <Wallet />
                  <div>Предоплата не требуется</div>
               </Prepayment>
            </div>
            <div>
               <DeliveryMethods>
                  <div>
                     <Delivery />
                  </div>
                  <div>
                     <span>Доставка</span>
                     <p>
                        По городу 200сом, по регионам Бесплатная доставка при
                        покупках свыше — 10 000с.
                     </p>
                  </div>
               </DeliveryMethods>
               <Prepayment>
                  <Wallet />
                  <div>Предоплата не требуется</div>
               </Prepayment>
            </div>
         </AboutDeliveryAndBuy>
         <div style={{ width: '780px' }}>
            <h2>Способы оплаты</h2>
            <PaymentMethods>
               <PaymentCash>
                  <IconsStyle>
                     <PaymentByCard />
                  </IconsStyle>
                  Оплата картой онлайн
               </PaymentCash>
               <PaymentCash>
                  <IconsStyle>
                     <PaymentMahted />
                  </IconsStyle>
                  Наличными при получении
               </PaymentCash>

               <PaymentCash>
                  <IconsStyle>
                     <Payment />
                  </IconsStyle>
                  <div>
                     Картой <div>при получении</div>
                  </div>
               </PaymentCash>
            </PaymentMethods>
         </div>
      </ContainerDiv>
   );
};
const ContainerDiv = styled('div')(() => ({
   width: '80%',
   margin: '0 auto',
}));

const DeliveryStyle = styled('div')(() => ({
   fontWeight: 'bold',
   fontSize: '30px',
   padding: '30px',
   marginLeft: '-30px',
   borderBottom: '1px solid #CDCDCD',
}));

const AboutDeliveryStyle = styled('div')(() => ({
   display: 'flex',
   gap: '10px',
   padding: '10px',
   margin: '17px 0px ',
}));
const AboutDeliveryAndBuy = styled('div')(() => ({
   display: 'flex',
   gap: '110px',
   height: '146px',
}));
const Prepayment = styled('div')(() => ({
   display: 'fles',
   gap: '15px',
}));
const DeliveryMethods = styled('div')(() => ({
   display: 'flex',
   gap: '15px',
   width: '350px',

   '& span': {
      fontWeight: 'bold',
      display: 'inline-block',
   },
   '& p': {
      marginTop: '2px',
   },
}));
const PaymentMethods = styled('div')(() => ({
   display: 'flex',
   gap: '50px',
   width: '980px',
   padding: '40px',
}));
const PaymentCash = styled('div')(() => ({
   display: 'flex',
   gap: '12px',
   width: '240px',
}));
const IconsStyle = styled('div')(() => ({
   backgroundColor: 'white',
   border: '1px solid white',
   borderRadius: '30px',
   width: '50px',
   height: '50px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
}));
