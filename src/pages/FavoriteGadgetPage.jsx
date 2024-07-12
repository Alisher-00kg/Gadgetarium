import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { styled } from '@mui/material';
import { BreadCrumbs } from '../components/UI/BreadCrumbs';
import { useDispatch, useSelector } from 'react-redux';
import {
   deleteFavoriteAllThunk,
   getFavoriteThunk,
} from '../store/thunks/mainPageCardPhoneThunks';
import { Button } from '../components/UI/Button';
import { SecondPhoneCard } from '../components/test/SecondPhoneCard';
import { Icons } from '../../src/assets';

const routeArray = [
   {
      label: 'Главная',
      href: '/',
   },
   {
      label: 'Избранное',
      href: '/favorite-product',
   },
];

export const FavoriteGadgetPage = () => {
   const { favorites } = useSelector(state => state.favorites);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getFavoriteThunk());
   }, [dispatch]);

   const handleButtonClick = () => {
      navigate('/');
   };

   const handleDelete = () => {
      dispatch(deleteFavoriteAllThunk());
   };
   return (
      <>
         <MainStyle>
            <BoxDivStyled>
               <BreadCrumbs breadcrumbs={routeArray} />
               <h1>Избранное</h1>
            </BoxDivStyled>
            {favorites?.length > 0 ? (
               <div className="wrapper">
                  <p className="delete-list" onClick={handleDelete}>
                     <Icons.Delete /> <span>Очистить список товаров</span>
                  </p>
                  <article>
                     <SectionStyled>
                        {favorites?.map(item => (
                           <SecondPhoneCard key={item.id} {...item} />
                        ))}
                     </SectionStyled>
                     <div className="button-div-block">
                        <Button
                           type="submit"
                           variant="outlined"
                           onClick={handleButtonClick}
                        >
                           Продолжить покупки
                        </Button>
                     </div>
                  </article>
               </div>
            ) : (
               <EmptyArticle>
                  <StyledSection>
                     <div>
                        <Icons.FavoritePageDelivery
                           style={{ width: '300px', height: '300px' }}
                        />
                     </div>
                     <div className="block-box">
                        <p className="paragraph">В избранном пока пусто</p>
                        <p className="second-text">
                           Воспользуйтесь поиском или каталогом,
                           <br /> выберите нужные товары и добавьте их в
                           избранное!
                        </p>
                        <Button
                           onClick={() => navigate('/')}
                           style={{
                              width: '141px',
                              height: '43px',
                              padding: '10px 24px 10px 24px',
                           }}
                           variant="contained"
                        >
                           К покупкам
                        </Button>
                     </div>
                  </StyledSection>
               </EmptyArticle>
            )}
         </MainStyle>
      </>
   );
};
const MainStyle = styled('div')(() => ({
   display: 'flex',
   flexWrap: 'wrap',
   background: 'rgb(244, 244, 244)',
   article: {
      display: 'flex',
      flexDirection: 'column',
      '.button-div-block': {
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         button: {
            width: '213px',
            height: '44px',
            margin: '41px 120px 120px 120px',
         },
      },
   },
   '& .wrapper': {
      marginTop: '40px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      '.delete-list': {
         display: 'flex',
         alignItems: 'center',
         paddingLeft: '32px',
         gap: '5px',
         cursor: 'pointer',
      },
   },
}));

const SectionStyled = styled('section')(() => ({
   display: 'flex',
   flexWrap: 'wrap',
   gap: '15px 7px',
   padding: '30px 0 0 5px',
}));

const BoxDivStyled = styled('div')(() => ({
   width: '95%',
   margin: '0 auto',
   h1: {
      fontWeight: '500',
      fontSize: '30px',
      lineHeight: '33px',
      padding: '30px 0px 20px 0px',
      borderBottom: '1px solid #CDCDCD',
   },
   '.delete-list': {
      width: 'auto',
      height: '20px',
      padding: '40.5px 0px 30px 0px',
      path: {
         fill: '#292929',
      },
   },
   button: {
      display: 'flex',
      alignItems: 'center',
      gap: '6.04px',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '400',
   },
}));

const StyledSection = styled('section')(() => ({
   display: 'flex',
   alignItems: 'center',
   flexDirection: 'column',
   background: 'rgb(244, 244, 244)',
   '.paragraph': {
      fontSize: '24px',
      fontWeight: '500',
   },
   '.second-text': {
      width: '476px',
      height: '46px',
      fontSize: '18px',
      fontWeight: '400',
   },
   '.block-box': {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      alignItems: 'center',
      textAlign: 'center',
   },
   button: {
      marginBottom: '120px',
   },
}));

const EmptyArticle = styled('article')(() => ({
   width: '100%',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}));
