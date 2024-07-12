import {
   Link,
   Rating,
   Tooltip,
   styled,
   IconButton as MuiIconButton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { IconButton } from '../UI/IconButton';
import { Icons } from '../../assets';
import {
   gadgetDiscountsThunks,
   newGadgetThunks,
   recommendedGadgetthunks,
} from '../../store/thunks/mainPageThunks';
import {
   gadgetBasketThunk,
   gadgetComparisonThunk,
   gadgetFavoriteThunk,
} from '../../store/thunks/mainPageCardPhoneThunks';
import { notify } from '../main/SnackBar';
import { useDispatch } from 'react-redux';
export const SecondPhoneCard = ({
   images,
   price,
   currentPrice,
   colour,
   memory,
   quantity,
   percent,
   rating,
   id,
   comparison,
   subGadgetId,
   likes,
   nameOfGadget,
   image,
   imageURL,
}) => {
   const [value, setValue] = useState(0);
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(gadgetDiscountsThunks());
      dispatch(newGadgetThunks());
      dispatch(recommendedGadgetthunks());
   }, [dispatch]);

   const handleFavoriteClick = favoriteId => {
      dispatch(gadgetFavoriteThunk({ subGadgetId: favoriteId }));
      notify(
         <NotifyStyled>
            Товар добавлен в избранное!
            <Link to="favorite-product" className="link">
               Перейти в избранное
            </Link>
         </NotifyStyled>,
      );
   };

   const handleCompariseClick = subGadgetId => {
      dispatch(gadgetComparisonThunk({ subGadgetId }));
      notify(
         <NotifyStyled>
            Товар добавлен в список сравнения!
            <Link to="/comparison" className="link">
               Перейти к сравнению
            </Link>
         </NotifyStyled>,
      );
   };

   const handleBasketClick = subGadgetId => {
      dispatch(gadgetBasketThunk({ subGadgetId }));
      notify(
         <NotifyStyled>
            Товар успешно добавлен в корзину!
            <Link to="/comparison" className="link">
               Перейти в корзину
            </Link>
         </NotifyStyled>,
      );
   };
   return (
      <CartPhoneStyled key={id}>
         <div className="topdivstyle">
            {percent > 0 ? (
               <p>-{percent}%</p>
            ) : percent === 'new' ? (
               <p style={{ background: '#2FC509' }}>New</p>
            ) : percent == 'recommend' ? (
               <p>
                  <Icons.LikeHand />
               </p>
            ) : (
               <p style={{ background: 'transparent' }}></p>
            )}
            <div>
               {' '}
               <p style={{ background: 'transparent' }}></p>
               <Tooltip
                  title={
                     comparison
                        ? 'Удалить из сравнения'
                        : 'Добавить к сравнению'
                  }
                  placement="top"
                  arrow
               >
                  <MuiIconButton
                     isComparise={comparison}
                     onClick={() => handleCompariseClick(subGadgetId)}
                  >
                     {comparison ? (
                        <Icons.ClickComparise />
                     ) : (
                        <Icons.Comparasion className="comparison" />
                     )}
                  </MuiIconButton>
               </Tooltip>
               <Tooltip
                  title={
                     likes ? 'Удалить из избранного' : 'Добавить в избранное'
                  }
                  placement="top"
                  arrow
               >
                  <MuiIconButton
                     isFavorite={likes}
                     onClick={() => handleFavoriteClick(id)}
                  >
                     {likes ? (
                        <Icons.RedHeartLike className="redheartlike" />
                     ) : (
                        <Icons.HeartLike className="heartlike" />
                     )}
                  </MuiIconButton>
               </Tooltip>
            </div>
         </div>
         <div className="image-block">
            {images ? (
               <img src={images} />
            ) : image ? (
               <img src={image} />
            ) : (
               <img src={imageURL} />
            )}
         </div>
         <ParentInfoStyled>
            <InfoDivStyled>
               <p>В наличии {quantity ? `${{ quantity }}` : null}</p>
               <p>
                  {nameOfGadget} {memory} {colour}{' '}
               </p>
               <p>
                  Рейтинг
                  <Rating
                     name="simple-controlled"
                     value={rating}
                     precision={0.5}
                     onChange={newValue => {
                        setValue(newValue);
                     }}
                  />
               </p>
            </InfoDivStyled>
            <LowerDivStyled>
               <div>
                  <p>
                     {currentPrice}
                     <span> c</span>
                  </p>
                  {price ? <p>{price} с</p> : null}
               </div>
               <StyledIconButton onClick={() => handleBasketClick(subGadgetId)}>
                  <Icons.Cart /> В КОРЗИНУ
               </StyledIconButton>
            </LowerDivStyled>
         </ParentInfoStyled>
      </CartPhoneStyled>
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

const CartPhoneStyled = styled('div')(() => ({
   width: '280px',
   borderRadius: '4px',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-between',
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
         background: '#F10000CC',
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
   '.redheartlike': {
      path: {
         fill: 'red',
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
   'p:first-child': {
      fontSize: '12px',
      fontWeight: '500',
      color: '#2FC509',
   },
   'p:nth-child(2)': {
      fontSize: '16px',
      fontWeight: '500',
      display: 'flex',
      flexWrap: 'wrap',
   },
   'p:nth-child(3)': {
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
   gap: '25.5px',
   div: {
      width: '260px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'column',
      padding: '0px',

      'p:first-child': {
         height: '24px',
         lineHeight: '130%',
         fontSize: '18px',
         fontWeight: '700',
         textWrap: 'nowrap',
         display: 'flex',
         alignItems: 'center',
      },
      'p:last-child': {
         height: '22px',
         fontSize: '16px',
         fontWeight: '400',
         color: '#909CB5',
         textDecoration: 'line-through',
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
