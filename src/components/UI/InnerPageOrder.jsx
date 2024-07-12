import { Typography, styled } from '@mui/material';

// const orderData = {
//    orderNumber: '000000-455247',
//    items: [
//       {
//          label: 'Samsung Galaxy S21 128gb синий 9(MLP3RU)',
//          quantity: 1,
//          totalPrice: 60000,
//          state: 'Завершено',
//          phoneNumber: '+996 (400) 00-00-00',
//          adress: ' г.Бишкек, Токтоналиева, 145/7 кв 24, дом 5',
//       },
//    ],
// };

export const InnerPageOrder = ({ orderData }) => {
   const totalPrice = orderData.items[0].totalPrice;
   const discountAmount = totalPrice * 0.15;
   const totalPriceWithDiscount = totalPrice - discountAmount;
   return (
      <div>
         <StyledMainTypography variant="h1">
            Оплата заказа {orderData.orderNumber}
         </StyledMainTypography>
         {orderData.items.map((item, index) => (
            <SectionStyled key={index}>
               <div>
                  <DivWrapper>
                     <LeftDivTypography>
                        <p>Наименование:</p>
                        <p>Кол-во товара:</p>
                        <p>Общая сумма заказа:</p>
                        <p>Скидка: 15%</p>
                        <p>Сумма скидки:</p>
                     </LeftDivTypography>
                     <RightDivTypography>
                        <p>{item.label}</p>
                        <p>
                           {item.quantity}
                           <span>шт</span>
                        </p>
                        <p>
                           {item.totalPrice} <span>с</span>
                        </p>
                        <p>no word</p>
                        <p>
                           {discountAmount} <span>с</span>
                        </p>
                     </RightDivTypography>
                  </DivWrapper>
                  <TotalTag>
                     <p>Итого:</p>
                     <p>
                        {totalPriceWithDiscount} <span>с</span>
                     </p>
                  </TotalTag>
               </div>

               <RightBlockDiv>
                  <InsideDivBlock>
                     <TypographyStyledInsideBlock>
                        Информация о заказе
                     </TypographyStyledInsideBlock>
                     <p className="pTag">
                        Заказ № <span>{orderData.orderNumber}</span>
                     </p>
                     <p className="pTag">
                        Состояние: <span> {item.state}</span>
                     </p>
                     <div>
                        <p className="pTag">Контактный телефон:</p>
                        <span>{item.phoneNumber}</span>
                     </div>
                     <div>
                        <p className="pTag">Адрес доставки:</p>
                        <span>{item.adress}</span>
                     </div>
                  </InsideDivBlock>
               </RightBlockDiv>
            </SectionStyled>
         ))}
      </div>
   );
};
const SectionStyled = styled('section')(() => ({
   margin: '30px 100px 100px 100px',
   display: 'flex',
   justifyContent: 'space-between',
   color: 'Black #292929',
}));

const StyledMainTypography = styled(Typography)(() => ({
   margin: '0 100px 0 100px',
   fontWeight: 'normal',
   fontSize: '30px',
   paddingBottom: '19.5px',
   borderBottom: '1px solid rgb(205, 205, 205)',
}));

const DivWrapper = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   gap: '46px',
   flexWrap: 'wrap',
   paddingBottom: '20px',
   borderBottom: '1px solid rgb(205, 205, 205)',
}));

const LeftDivTypography = styled(Typography)(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '0 0 9px 0',
   fontWeight: '600',
   fontSize: '16px',
   '& p:nth-of-type(4)': {
      color: '#F10000',
   },
}));

const RightDivTypography = styled(Typography)(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '0 0 9px 0',
   fontWeight: '400',
   fontSize: '16px',
   '& p:nth-of-type(4)': {
      color: 'white',
   },
}));

const TotalTag = styled(Typography)(() => ({
   position: 'relative',
   left: '435px',
   display: 'flex',
   gap: '18px',
   paddingTop: '15px',
   '& p:first-of-type': {
      fontWeight: '600',
      fontSize: '16px',
   },
}));

const RightBlockDiv = styled('div')(() => ({
   border: '1px solid #CDCDCD',
   borderRadius: '4px',
   background: ' rgb(255, 255, 255)',
}));

const InsideDivBlock = styled('div')(() => ({
   padding: '30px',
   display: 'flex',
   gap: '14px',
   flexDirection: 'column',
   alignItems: 'left',
   '& .pTag': {
      fontSize: ' 16px',
      fontWeight: ' 600',
      '& span': {
         fontSize: '16px',
         fontWeight: ' 400',
      },
   },
}));

const TypographyStyledInsideBlock = styled(Typography)(() => ({
   borderBottom: '1px solid rgb(205, 205, 205)',
   fontWeight: 'normal',
   fontSize: '20px',
   paddingBottom: '16px',
}));
