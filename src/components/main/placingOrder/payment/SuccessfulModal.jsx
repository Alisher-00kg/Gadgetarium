import { useEffect, useState } from 'react';
import { BaseModal } from '../../../UI/BaseModal';
import { Button } from '../../../UI/Button';
import { styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../../../store/thunks/cartThunks';

export const SuccessfulModal = () => {
   const [openModal, setIsOpenModal] = useState(false);
   const dispatch = useDispatch();
   const { paypalOrder } = useSelector(state => state.orderAmounts);

   useEffect(() => {
      dispatch(getOrder({ orderId: 4 }));
   }, []);

   const handleCloseModal = () => {
      setIsOpenModal(!openModal);
   };
   return (
      <BaseModal open={openModal} onClose={handleCloseModal}>
         <Description>Спасибо! </Description>
         <SecondDescription>Заявка успешна оформлена!</SecondDescription>
         <Block>
            <Title>
               Номер заявки <span>{paypalOrder.number}</span>
            </Title>
            <Review>
               Ваш заявка №{paypalOrder.number} от {paypalOrder.createAd}{' '}
               оформлена Вся актуальная информация о статусе исполнения заказа
               придет на указанный email:
               {paypalOrder.email}
            </Review>
            <ButtonStyle variant="contained">Продолжить покупки</ButtonStyle>
         </Block>
      </BaseModal>
   );
};

const Description = styled('p')(() => ({
   fontFamily: 'Inter',
   fontWeight: '500',
   fontSize: '18px',
   textAlign: 'center',
}));
const SecondDescription = styled('p')(() => ({
   fontFamily: 'Inter',
   fontWeight: '500',
   fontSize: '18px',
   textAlign: 'center',
}));
const Review = styled('p')(() => ({
   width: '340px',
   fontFamily: 'Inter',
   fontWeight: '400',
   textAlign: 'center',
}));
const Title = styled('h4')(() => ({
   fontFamily: 'Inter',
   fontWeight: '600',
   fontSize: '20px',
   textAlign: 'center',
   paddingTop: '20px',
   span: {
      color: '#cb11ab',
      fontFamily: 'Inter',
      fontWeight: '600',
      fontSize: '20px',
      paddingLeft: '5px',
   },
}));
const Block = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '20px',
   alignItems: 'center',
}));

const ButtonStyle = styled(Button)(() => ({
   width: '221px',
   textTransform: 'inherit',
}));
