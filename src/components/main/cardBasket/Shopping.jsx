import { Button } from '../../UI/Button';
import ShopImage from '../../../assets/images/shopping.svg?react';
import { styled } from '@mui/material';
import { useNavigate } from 'react-router';
// import { useNavigate } from 'react-router-dom';

export const Shopping = () => {
   //    const navigate = useNavigate();
   const handleSubmit = () => {
      //   navigate('/main');
   };
   return (
      <Wrapper>
         <Title>Товары в корзине</Title>
         <Line></Line>
         <Container>
            <ShopImage />
            <Block>
               <h3>Ваша корзина пуста</h3>
               <p>Но вы всегда можете ее наполнить </p>
               <ButtonStyle variant="contained" onClick={handleSubmit}>
                  К покупкам
               </ButtonStyle>
            </Block>
         </Container>
      </Wrapper>
   );
};
const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: '50px',
   paddingTop: '90px',
}));
const Block = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: '20px',
   h3: {
      fontFamily: 'Inter',
      fontWeight: '500',
      fontSize: '24px',
   },
   p: {
      fontFamily: 'Inter',
      fontWeight: '400',
      fontSize: '18px',
      color: '#1A1A25',
   },
}));
const ButtonStyle = styled(Button)(() => ({
   width: ' 140px',
   height: '39px',
   textTransform: 'inherit',
   fontFamily: 'Inter',
   fontWeight: '500',
}));
const Title = styled('h1')(() => ({
   fontFamily: 'Ubuntu',
   fontSize: '30px',
   fontWeight: '500',
   paddingBottom: '20px',
}));
const Line = styled('div')(() => ({
   width: '100%',
   borderBottom: '1px solid #cdcdcd',
}));
const Wrapper = styled('div')(() => ({
   padding: '90px',
}));
