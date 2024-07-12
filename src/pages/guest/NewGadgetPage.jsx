import React, { useEffect, useState } from 'react';
import { Button } from '../../components/UI/Button';
import { Link, Rating, Tooltip, styled } from '@mui/material';
import { IconButton } from '../../components/UI/IconButton';
import { Icons } from '../../assets';
import { useDispatch, useSelector } from 'react-redux';
import { RecommendedGadgetPage } from './RecommendedGadgetPage';
import { newGadgetThunks } from '../../store/thunks/mainPageThunks';
import { IconButton as MuiIconButton } from '@mui/material';
import {
   gadgetBasketThunk,
   gadgetComparisonThunk,
   gadgetFavoriteThunk,
} from '../../store/thunks/mainPageCardPhoneThunks';
import { notify } from '../../components/main/SnackBar';
import { useNavigate } from 'react-router';

export const NewGadgetPage = () => {
   const dispatch = useDispatch();
   const { newgadget } = useSelector(state => state.newgadget);
   const navigate = useNavigate();

   const [pageSize, setPageSize] = useState(5);
   const { Cart, HeartLike, Comparasion, RedHeartLike, ClickComparise } = Icons;

   useEffect(() => {
      dispatch(newGadgetThunks(pageSize));
   }, [dispatch, pageSize]);

   const showMore = () => {
      setPageSize(prev => prev + 5);
   };

   const handleFavoriteClick = subGadgetId => {
      dispatch(gadgetFavoriteThunk({ subGadgetId, notify }));
   };

   const handleCompariseClick = subGadgetId => {
      dispatch(gadgetComparisonThunk({ subGadgetId, notify }));
   };

   const handleBasketClick = subGadgetId => {
      dispatch(gadgetBasketThunk({ subGadgetId, notify }));
   };

   const handleNavigate = id => {
      navigate(`/product/${id}`);
   };

   const handleNavigateToBasket = () => {
      navigate(`/basket`);
   };

   return (
      <>
         <ColumnDiv>
            <h3>Новинки</h3>
            <SectionStyled>
               {newgadget?.mainPages?.map(item => (
                  <CartPhoneStyled key={item.subGadgetId}>
                     <div className="topdivstyle">
                        <p>New</p>
                        <div>
                           <Tooltip
                              title={
                                 item.comparison
                                    ? 'Удалить из сравнения'
                                    : 'Добавить к сравнению'
                              }
                              placement="top"
                              arrow
                           >
                              <MuiIconButton
                                 // comparison={item.comparison}
                                 onClick={() =>
                                    handleCompariseClick(item.gadgetId)
                                 }
                              >
                                 {item.comparison ? (
                                    <ClickComparise />
                                 ) : (
                                    <Comparasion className="comparison" />
                                 )}
                              </MuiIconButton>
                           </Tooltip>
                           <Tooltip
                              title={
                                 item.likes
                                    ? 'Удалить из избранного'
                                    : 'Добавить в избранное'
                              }
                              placement="top"
                              arrow
                           >
                              <MuiIconButton
                                 onClick={() =>
                                    handleFavoriteClick(item.subGadgetId)
                                 }
                              >
                                 {item.likes ? (
                                    <RedHeartLike className="redheartlike" />
                                 ) : (
                                    <HeartLike className="heartlike" />
                                 )}
                              </MuiIconButton>
                           </Tooltip>
                        </div>
                     </div>
                     <div className="image-block">
                        <img src={item.image} />
                     </div>
                     <ParentInfoStyled>
                        <InfoDivStyled
                           onClick={() => {
                              handleNavigate(item.gadgetId);
                           }}
                        >
                           <p>В наличии ({item.quantity})</p>
                           <p>
                              {item.nameOfGadget}
                              {''} {item.memory}
                              {''} {item.colour}{' '}
                           </p>
                           <p>
                              Рейтинг
                              <Rating
                                 name="simple-controlled"
                                 precision={0.5}
                                 value={item.rating}
                                 readOnly
                              />
                           </p>
                        </InfoDivStyled>
                        <LowerDivStyled>
                           <div>
                              <p style={{ width: '78px' }}>
                                 <b>
                                    {item.currentPrice} <span> c</span>
                                 </b>
                              </p>
                           </div>
                           {!item.basket ? (
                              <StyledIconButton
                                 onClick={() =>
                                    handleBasketClick(item.subGadgetId)
                                 }
                              >
                                 <Cart /> В КОРЗИНУ
                              </StyledIconButton>
                           ) : (
                              <StyledIconButton
                                 onClick={handleNavigateToBasket}
                              >
                                 <Cart /> В КОРЗИНЕ
                              </StyledIconButton>
                           )}
                        </LowerDivStyled>
                     </ParentInfoStyled>
                  </CartPhoneStyled>
               ))}
            </SectionStyled>
            <div className="button-div-block">
               <Button type="submit" variant="outlined" onClick={showMore}>
                  Показать ещё
               </Button>
            </div>
         </ColumnDiv>
         <RecommendedGadgetPage />
      </>
   );
};

const NotifyStyled = styled('div')(() => ({
   width: '623px',
   height: '65px',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   gap: '36px',
   fontSize: '18px',
   fontWeight: '400',
   borderRadius: '4px',
   color: '#FFFFFF',
   padding: '20px 18px 20px 18px',
   '.link': {
      fontWeight: '700',
      color: '#3CDE14',
   },
}));

const ColumnDiv = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   h3: {
      display: 'flex',
      alignItems: 'flex-start',
      fontSize: '30px',
      fontWeight: '500',
      lineHeight: '110%',
      padding: '3px 50px 40px',
   },
   '.button-div-block': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      button: {
         width: '290px',
         height: '43px',
         margin: '41px 120px 120px 120px',
      },
   },
}));

const SectionStyled = styled('section')(() => ({
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'space-around',
   gap: '8px',
   flexWrap: 'wrap',
}));

const CartPhoneStyled = styled('div')(() => ({
   width: '280px',
   borderRadius: '4px',
   background: '#FFFFFF',
   cursor: 'pointer',
   ':hover': {
      boxShadow:
         'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
      zIndex: '5',
   },
   '.image-block': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      img: {
         width: '180px',
         height: '236px',
         objectFit: 'contain',
      },
   },
   '.topdivstyle': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      p: {
         width: '36px',
         height: '36px',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         borderRadius: '50px',
         background: '#2FC509',
         color: '#FFFFFF',
         fontWeight: '900',
         fontSize: '12px',
         margin: '10px',
      },
      div: {
         display: 'flex',
         justifyContent: 'space-between',
         gap: '15.67px',
         alignItems: 'center',
         margin: '15px',
         svg: {
            width: '24px',
            height: '24px',
            cursor: 'pointer',
         },
         '.comparison': {
            path: {
               fill: '#AAB1BF',
            },
         },
         '.heartlike': {
            path: {
               stroke: '#AAB1BF',
            },
         },
      },
   },
}));

const ParentInfoStyled = styled('div')(() => ({
   padding: '28px 20px 21px 20px',
   display: 'flex',
   flexDirection: 'column',
   gap: '16px',
}));

const InfoDivStyled = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '8px',
   'p:first-of-type': {
      fontSize: '12px',
      fontWeight: '500',
      color: '#2FC509',
   },
   'p:nth-of-type(2)': {
      fontSize: '16px',
      fontWeight: '500',
      display: 'flex',
      flexWrap: 'wrap',
   },
   'p:nth-of-type(3)': {
      display: 'flex',
      alignItems: 'center',
      fontSize: '12px',
      fontWeight: '500',
      color: '#909CB5',
      gap: '6px',
      ' svg': {
         width: '12px',
         height: '12px',
      },
   },
}));

const LowerDivStyled = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   flexDirection: 'row',
   gap: '33px',
   div: {
      width: '80px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'column',
      padding: '0px',
      'p:firs-child': {
         height: '24px',
         lineHeight: '130%',
         fontSize: '18px',
         fontWeight: '700',
      },
      span: {
         textDecoration: 'underline',
      },
   },
}));

const StyledIconButton = styled(IconButton)(() => ({
   width: '138px',
   height: '45px',
   borderRadius: '4px',
   backgroundColor: ' rgb(203, 17, 171)',
   color: '#FFFFFF',
   cursor: 'pointer',
   display: ' flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   fontSize: '14px',
   fontWeight: '500',
   gap: '5px',
   padding: '12px 13px 12px 13px',
   '&:hover': {
      backgroundColor: ' rgb(203, 17, 171)',
   },
   path: {
      fill: 'white',
   },
}));
