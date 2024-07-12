import { IconButton, Menu, MenuItem, styled } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { Icons } from '../assets';
import { SearchInput } from '../components/UI/SearchInput';
import { Button } from '../components/UI/Button';
import { useEffect, useState } from 'react';
import { MenuAccessories } from '../components/Accessories/MenuAccessories';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/auth/authSlice';
import SigIn from '../pages/guest/SigIn';
import SignUp from '../pages/guest/SignUp';
import { fetchProfile } from '../store/thunks/profilThunks';

const quantityInCart = 0;
const comparisonQuantity = 0;
const userNumber = '8 900 900 89 89';

const {
   Group,
   Adgetarium,
   UserIcon,
   Facebook,
   Instagram,
   WhatsappIcon,
   Cart,
   HeartLike,
   Comparasion,
} = Icons;
const showCartIcon = quantityInCart !== 0;
const showComparisonIcon = comparisonQuantity !== 0;

export const Header = () => {
   const { isAuth } = useSelector(state => state.auth);
   const { profile } = useSelector(state => state.profile);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [openMenu, setOpenMenu] = useState(null);
   const [showNumber, setShowNumber] = useState(isAuth);
   const [isOpenModal, setIsOpenModal] = useState('');
   const handleLogout = () => {
      dispatch(logout(navigate));
   };

   const openSiginIn = (param = '') => {
      setIsOpenModal(param);
   };

   const closeModal = () => {
      setIsOpenModal('');
   };

   const handleShowMenu = event => {
      setOpenMenu(event.currentTarget);
   };

   const closeMenu = () => {
      setOpenMenu(null);
   };

   useEffect(() => {
      dispatch(fetchProfile());
   }, [dispatch]);

   return (
      <StyledHeader>
         <FirstHeaderBlock>
            <div>
               <Group />
               <Adgetarium />
            </div>
            <nav>
               <NavLinkStyle to="/">Главная</NavLinkStyle>
               <NavLinkStyle to="/about-store">О магазине</NavLinkStyle>
               <NavLinkStyle to="delivery">Доставка</NavLinkStyle>
               <NavLinkStyle to="faq">FAQ</NavLinkStyle>
               <NavLinkStyle to="contacts">Контакты</NavLinkStyle>
            </nav>
            <ContactBlock>
               {showNumber ? (
                  <span>{userNumber}</span>
               ) : (
                  <span>{profile.phoneNumber}</span>
               )}
               <UserIcon onClick={handleShowMenu} />
               <MenuStyle
                  anchorEl={openMenu}
                  open={Boolean(openMenu)}
                  onClose={closeMenu}
               >
                  {isAuth ? (
                     <div>
                        <MenuItemStyle>История заказов</MenuItemStyle>
                        <MenuItemStyle>Избранное</MenuItemStyle>
                        <MenuItemStyle onClick={() => navigate('profil')}>
                           Профиль
                        </MenuItemStyle>

                        <MenuItemStyle onClick={handleLogout}>
                           Выйти
                        </MenuItemStyle>
                     </div>
                  ) : (
                     <div>
                        <MenuItemStyle onClick={() => openSiginIn('signIn')}>
                           Войти
                        </MenuItemStyle>
                        <MenuItemStyle onClick={() => openSiginIn('signUp')}>
                           Регистрация
                        </MenuItemStyle>
                     </div>
                  )}
               </MenuStyle>
            </ContactBlock>
         </FirstHeaderBlock>
         <SecondHeaderBlock>
            <SearchInputBlock>
               {/* <ButtonStyle
                  startIcon={
                     <CatalogButton style={{ width: '24px', height: '24px' }} />
                  }
               >
                  Каталог
               </ButtonStyle> */}
               <MenuAccessories />
               <SearchInputStyle />
            </SearchInputBlock>
            <IconsContainer>
               <NetworkIconsStyle>
                  <IconButton>
                     <Facebook />
                  </IconButton>
                  <IconButton>
                     <Instagram />
                  </IconButton>
                  <IconButton>
                     <WhatsappIcon />
                  </IconButton>
               </NetworkIconsStyle>
               <QuantityContainer>
                  <SalesIconsStyle>
                     <IconButton onClick={() => navigate('comparision')}>
                        <Comparasion />
                     </IconButton>

                     {showComparisonIcon && (
                        <ComparisonIconStyle>
                           {comparisonQuantity}
                        </ComparisonIconStyle>
                     )}
                     <IconButton onClick={() => navigate('favorite-product')}>
                        <HeartLike />
                     </IconButton>
                     <IconButton>
                        <Cart />
                     </IconButton>

                     {showCartIcon && (
                        <CartIconStyle>{quantityInCart}</CartIconStyle>
                     )}
                  </SalesIconsStyle>
               </QuantityContainer>
            </IconsContainer>
         </SecondHeaderBlock>
         <SigIn
            open={isOpenModal === 'signIn'}
            onClose={closeModal}
            onSiginSignUp={setIsOpenModal}
         />
         <SignUp
            open={isOpenModal === 'signUp'}
            onClose={closeModal}
            onSiginSignUp={setIsOpenModal}
         />
      </StyledHeader>
   );
};

const StyledHeader = styled('header')({
   width: '100%',
   height: '173px',
   backgroundColor: ' rgb(26, 26, 37)',
   padding: '21px 195px 24px 195px',
   display: 'flex',
   flexDirection: 'column',
   gap: '43px',
});
const FirstHeaderBlock = styled('div')({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   nav: {
      display: 'flex',
   },
   div: {
      display: 'flex',
      gap: '2px',
      alignItems: 'end',
   },
});
const NavLinkStyle = styled(NavLink)({
   color: '#ffffff',
   textDecoration: 'none',
   fontFamily: 'Inter',
   fontWeight: '400',
   padding: '12px 14px',
   fontSize: '16px',
   '&:hover': {
      borderRadius: '4px',
      background: 'rgba(133, 143, 164, 0.15)',
   },
});
const ContactBlock = styled('div')({
   span: {
      color: '#ffffff',
      fontFamily: 'Inter',
      fontWeight: '500',
      paddingRight: '30px',
   },
});
const SecondHeaderBlock = styled('div')({
   display: 'flex',
   alignItems: 'center',
});
const ButtonStyle = styled(Button)({
   width: '136px',
   height: '49px',
   fontFamily: 'Inter',
   fontWeight: '700',
   fontSize: '16px',
   backgroundColor: '#CB11AB',
   color: '#ffffff',
   textTransform: 'capitalize',
});

const NetworkIconsStyle = styled('div')({
   display: 'flex',
   alignItems: 'center',
   cursor: 'pointer',
});
const SalesIconsStyle = styled('div')({
   display: 'flex',
   alignItems: 'center',
   cursor: 'pointer',
});
const IconsContainer = styled('div')({
   display: 'flex',
   gap: '25px',
});

const QuantityContainer = styled('div')({ position: 'relative' });
const CartIconStyle = styled('span')({
   fontWeight: '400',
   fontSize: '12px',
   fontFamily: 'Inter',
   backgroundColor: '#f10000',
   color: '#ffffff',
   padding: '0 4px',
   border: '2px solid #1A1A25',
   borderRadius: '50%',
   position: 'absolute',
   bottom: '13px',
   left: '123px',
});
const ComparisonIconStyle = styled('span')({
   fontWeight: '400',
   fontSize: '12px',
   fontFamily: 'Inter',
   backgroundColor: '#f10000',
   color: '#ffffff',
   padding: '0 4px',
   border: '2px solid #1A1A25',
   borderRadius: '50%',
   position: 'absolute',
   bottom: '13px',
   left: '16px',
});
const SearchInputBlock = styled('div')({
   display: 'flex',
   alignItems: 'center',
   gap: '85px',
   width: '80%',
   margin: '0 85px 0 0',
});
const SearchInputStyle = styled(SearchInput)({
   '.MuiInputBase-root': {
      height: '40px',
      borderRadius: '10px',
      fontSize: '14px',
      fontFamily: 'Inter',
      fontWeight: '400',
   },
});
const MenuStyle = styled(Menu)({
   '& .MuiPaper-root': {
      backgroundColor: '#ffffff',
      borderRadius: '4px',
   },
});

const MenuItemStyle = styled(MenuItem)({
   color: '#292929',
   fontFamily: 'Inter',
   fontWeight: '400',
   backgroundColor: 'transparent',
   '&:hover': {
      color: '#CB11AB',
      backgroundColor: 'transparent',
   },
});
