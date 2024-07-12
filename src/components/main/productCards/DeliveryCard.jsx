import { styled } from '@mui/material';
import Delivery from '../../../assets/icons/delivery.svg?react';
import Prepayment from '../../../assets/icons/prepayment.svg?react';
import Payment from '../../../assets/icons/payment.svg?react';
import PaymentByCard from '../../../assets/icons/paymentbycard.svg?react';
import PaymentMathed from '../../../assets/icons/payment-mathed.svg?react';
export const DeliveryCard = () => {
   const info = [
      {
         id: Date.now().toString(),
         title: 'Самовывоз со склада',
         description: 'Забрать в течение 14 дней',
         payment: 'Предоплата не требуется',
         price: 0,
         icon1: <Delivery />,
         icon2: <Prepayment />,
      },
      {
         id: Date.now().toString(),
         title: 'Самовывоз из магазина',
         description: 'Забрать в течение 14 дней',
         payment: 'Предоплата не требуется',
         price: 0,
         icon1: <Delivery />,
         icon2: <Prepayment />,
      },
      {
         id: Date.now().toString(),
         title: 'Доставка',
         description: 'Бесплатная доставка при покупках свыше  — 10 000с.',
         payment: 'Предоплата не требуется',
         price: 200,
         icon1: <Delivery />,
         icon2: <Prepayment />,
      },
   ];

   const way = [
      {
         title: 'Оплата картой онлайн',
         id: Date.now().toString(),
         icon: <PaymentByCard />,
      },
      {
         title: 'Наличными при получении',
         id: Date.now().toString(),
         icon: <PaymentMathed />,
      },
      {
         title: 'Картой при получении',
         id: Date.now().toString(),
         icon: <Payment />,
      },
   ];
   return (
      <>
         <Title>Доставка</Title>
         <Description>
            Город доставки <span>Бишкек</span>
         </Description>
         <Container>
            {info.map(item => (
               <Wrapper key={item.id}>
                  <Box>
                     <Block>
                        <div>{item.icon1}</div>
                        <div>
                           <span>{item.title}</span>
                           <p>{item.description}</p>
                        </div>
                     </Block>
                     <SecondBlock>
                        <div>{item.icon2}</div>
                        <p>Предоплата не требуется</p>
                     </SecondBlock>
                  </Box>
                  <span>
                     {item.price}{' '}
                     <span style={{ borderBottom: '2px solid black' }}>c</span>
                  </span>
               </Wrapper>
            ))}
         </Container>
         <WayTitle>Способы оплаты</WayTitle>
         <SecondContainer>
            {way.map(item => (
               <div key={item.id}>
                  <div>{item.icon}</div>
                  <p>{item.title}</p>
               </div>
            ))}
         </SecondContainer>
      </>
   );
};

const Title = styled('h1')(() => ({
   fontFamily: 'Ubuntu',
   fontWeight: '500',
   fontSize: '30px',
   padding: '90px 0px 30px 0px',
}));
const Description = styled('p')(() => ({
   fontFamily: 'Inter',
   fontWeight: '400',
   fontSize: '18px',
   paddingBottom: '30px',
   span: {
      fontWeight: '700',
   },
}));
const Container = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   p: { fontFamily: 'Inter', fontWeight: '400' },
   span: {
      fontFamily: 'Inter',
      fontWeight: '700',
   },
}));

const Block = styled('div')(() => ({
   display: 'flex',
   gap: '12px',
   width: '260px',
}));
const SecondBlock = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '13px',
}));
const Box = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '20px',
}));
const Wrapper = styled('div')(() => ({
   display: 'flex',
   gap: '80px',
}));
const SecondContainer = styled('div')(() => ({
   display: 'flex',
   gap: '70px',
   div: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
   },
   p: {
      width: '154px',
      fontFamily: 'Inter',
      fontWeight: '400',
   },
}));

const WayTitle = styled('h3')(() => ({
   fontFamily: 'Inter',
   fontSize: '20px',
   fontWeight: '800',
   padding: ' 80px 0px 30px 0px',
}));
