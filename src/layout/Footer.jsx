import { styled } from '@mui/material';
import React from 'react';
import Phone from '../assets/icons/phone-icon.svg?react';
import Email from '../assets/icons/email.svg?react';
import Location from '../assets/icons/location.svg?react';
import Clock from '../assets/icons/clock.svg?react';
import Group from '../assets/icons/group.svg?react';
import Adgetarium from '../assets/icons/adgetarium.svg?react';
import { NavLink } from 'react-router-dom';
import { Input } from '../components/UI/Input';
import { IconButton } from '../components/UI/IconButton';

export const Footer = () => {
   return (
      <StyledFooter>
         <Container>
            <StyledFirstContainer>
               <StyledChildContainer>
                  <p>Каталог</p>
                  <ul>
                     <li>
                        <StyledNavLink to="/">Смартфоны</StyledNavLink>
                     </li>
                     <li>
                        <StyledNavLink to="/">
                           Ноутбуки и планшеты
                        </StyledNavLink>
                     </li>
                     <li>
                        <StyledNavLink to="/">
                           Смарт-часы и браслеты
                        </StyledNavLink>
                     </li>
                     <li>
                        <StyledNavLink to="/">Аксессуары</StyledNavLink>
                     </li>
                  </ul>
               </StyledChildContainer>

               <StyledChildContainer>
                  <p>Будь с нами</p>
                  <ul>
                     <li>
                        <StyledNavLink to="/">Акции</StyledNavLink>
                     </li>
                     <li>
                        <StyledNavLink to="/">Новинки</StyledNavLink>
                     </li>
                     <li>
                        <StyledNavLink to="/">
                           Популярные категории
                        </StyledNavLink>
                     </li>
                  </ul>
               </StyledChildContainer>

               <StyledChildContainer>
                  <p>Помощь и сервисы</p>
                  <ul>
                     <li>
                        <StyledNavLink to="/">О магазине</StyledNavLink>
                     </li>
                     <li>
                        <StyledNavLink to="/">Доставка</StyledNavLink>
                     </li>
                     <li>
                        <StyledNavLink to="/">FAQ</StyledNavLink>
                     </li>
                     <li>
                        <StyledNavLink to="/">Контакты</StyledNavLink>
                     </li>
                  </ul>
               </StyledChildContainer>
            </StyledFirstContainer>
            <StyledDiscounts>
               <StyledPromotions>
                  <p>Расскажем об акциях и скидках</p>
                  <div>
                     <StyledInput placeholder="Email" />
                     <StyledIconButton variant="contain">
                        Подписаться
                     </StyledIconButton>
                  </div>
                  <p>
                     Нажимая на кнопку «подписаться» Вы соглашаетесь на
                     обработку персональных данных
                  </p>
               </StyledPromotions>
               <StyledInfo>
                  <div>
                     <StyledPhone />
                     <p>+996 (400) 00 00 00</p>
                  </div>
                  <div>
                     <Email />
                     <p>Gadgetarium.kg</p>
                  </div>
                  <div>
                     <Location />
                     <p>г.Бишкек, ул. Гражданская 119</p>
                  </div>
                  <div>
                     <Clock />
                     <p>С 10:00 до 21:00 (без выходных)</p>
                  </div>
               </StyledInfo>
            </StyledDiscounts>
         </Container>
         <StyledGadgetarium>
            <div>
               <Group />
               <Adgetarium />
            </div>

            <ul>
               <li>© 2022 Gadgetarium. Интернет магазин</li>
               <li> Все права защищены.</li>
            </ul>
         </StyledGadgetarium>
      </StyledFooter>
   );
};
const StyledNavLink = styled(NavLink)(() => ({
   textDecoration: 'none',
   color: '#858fa4',
   '&:hover': {
      color: 'white',
   },
}));

const StyledFooter = styled('footer')(() => ({
   width: '100%',
   boxSizing: 'borderBox',
   backgroundColor: ' rgb(26, 26, 37)',
   height: '600px',
   display: 'flex',
   flexDirection: 'column',
   gap: '61px',
   padding: '30px 30px',
   li: {
      fontFamily: 'Inter',
   },
}));

const Container = styled('div')({
   display: 'flex',
   gap: '200px',
});

const StyledFirstContainer = styled('div')({
   display: 'flex',
   gap: '125px',
});

const StyledChildContainer = styled('ul')({
   display: 'flex',
   flexDirection: 'column',
   gap: '30px',
   '& p': {
      fontFamily: 'Inter',
      color: 'rgb(255, 255, 255)',
   },
   '& ul': {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      width: '210px',
      height: '120px',
      cursor: 'pointer',
      listStyleType: 'none',
   },
   '& li:hover': {
      color: 'white',
   },
});

const StyledDiscounts = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   gap: '40px',
});

const StyledPromotions = styled('ul')({
   display: 'flex',
   flexDirection: 'column',
   gap: '16px',
   '& p': {
      color: 'rgb(255, 255, 255)',
      fontFamily: 'Inter',
   },
   '& p:last-child': {
      fontSize: '14px',
      fontFamily: 'Inter',
   },
   '& div': {
      display: 'flex',
      justifyContent: 'center',
   },
});
const StyledInput = styled(Input)(() => ({
   '.MuiInputBase-root': {
      borderTopRightRadius: '0px',
      borderBottomRightRadius: '0px',
      borderTopLeftRadius: '5px',
      borderBottomLeftRadius: '5px',
   },
}));
const StyledIconButton = styled(IconButton)(() => ({
   width: '162px',
   height: '43px',
   backgroundColor: '#cb11ab',
   color: 'white',
   fontSize: '16px',
   fontFamily: 'Inter',
   border: '0',
   borderTopRightRadius: '5px',
   borderBottomRightRadius: '5px',
   borderTopLeftRadius: '0px',
   borderBottomLeftRadius: '0px',
   '&:hover': {
      backgroundColor: '#CB11AB',
   },
}));

const StyledInfo = styled('ul')({
   display: 'flex',
   justifyContent: 'center',

   flexDirection: 'column',
   gap: '12px',
   '& div': {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      listStyleType: 'none',
      '& p': {
         fontFamily: 'Inter',
         color: '#858fa4',
         cursor: 'pointer',
      },
   },
   '& svg': {
      cursor: 'pointer',
   },
});
const StyledPhone = styled(Phone)(() => ({
   width: '22px',
   height: '22px',
}));

const StyledGadgetarium = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: '19px',
   borderTop: '1px solid rgba(133, 143, 164, 0.15)',
   '& div': {
      marginTop: '31px',
      width: '221.47px',
      height: '41px',
   },
   '& ul': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: '14px',
      gap: '10px',
      color: '#858fa4',
      listStyleType: 'none',
   },
});
