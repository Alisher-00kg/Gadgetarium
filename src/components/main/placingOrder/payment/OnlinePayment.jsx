import { Input } from '../../../UI/Input';
import { styled } from '@mui/material';
import CartLogo from '../../../../assets/icons/cart-logo.svg?react';
import { Button } from '../../../UI/Button';

export const OnlinePayment = ({ onSubmit }) => {
   return (
      <Wrapper>
         <Container>
            <CartLogo
               style={{ position: 'relative', top: '0px', left: '250px' }}
            />
            <Block>
               <LabelStyle>Номер карты</LabelStyle>
               <InputStyle />
            </Block>
            <SecondBlock>
               <Row>
                  <AnotherInputStyle placeholder="MM" /> /
                  <AnotherInputStyle placeholder="YY" />
                  <ThirdInputStyle placeholder="CVC" />
               </Row>
            </SecondBlock>
            <Block>
               <LabelStyle>Имя владельца</LabelStyle>
               <InputStyle />
            </Block>
         </Container>

         <ButtonStyle onClick={onSubmit} variant="contained">
            Продолжить
         </ButtonStyle>
      </Wrapper>
   );
};
const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
   width: '450px',
   height: '300px',
   borderRadius: '6px',
   background: '#ffffff',
   padding: '20px 30px',
}));
const Wrapper = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '30px',
}));
const LabelStyle = styled('label')(() => ({
   color: '#91969E',
   fontFamily: 'Inter',
   fontWeight: '400',
   fontSize: '14px',
}));
const Block = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
}));
const SecondBlock = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   paddingTop: '20px',
}));

const InputStyle = styled(Input)(() => ({
   '.MuiInputBase-root': {
      border: 'none',
      background: '#ffffff',
      borderBottom: '1px solid #cdcdcd',
      borderRadius: '0px',
      fontFamily: 'Inter',
      fontWeight: '500',
   },
}));
const AnotherInputStyle = styled(Input)(() => ({
   '.MuiInputBase-root': {
      border: 'none',
      background: '#ffffff',
      borderBottom: '1px solid #cdcdcd',
      borderRadius: '0px',
      width: ' 60px',
      fontFamily: 'Inter',
      fontWeight: '500',
   },
}));
const ThirdInputStyle = styled(Input)(() => ({
   '.MuiInputBase-root': {
      border: 'none',
      background: '#ffffff',
      borderBottom: '1px solid #cdcdcd',
      borderRadius: '0px',
      width: ' 70px',
      fontFamily: 'Inter',
      fontWeight: '500',
   },
}));
const ButtonStyle = styled(Button)(() => ({
   width: '450px',
   height: '44px',
   fontFamily: 'Inter',
   fontWeight: '600',
   textTransform: 'capitalize',
}));
const Row = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '40px',
}));
const Description = styled('p')(() => ({
   width: '450px',
   color: '#384255',
   fontFamily: 'Inter',
   fontWeight: '400',
   fontSize: '14px',
}));
