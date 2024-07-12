import { Rating, styled } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import PlusIcon from '../../assets/icons/plus-icon.svg?react';
import MinusIcon from '../../assets/icons/minus-icon.svg?react';
import FavoriteIcon from '../../assets/icons/favoriteIcon.svg?react';
import DeleteIcon from '../../assets/icons/delete-сhoice.svg?react';
import CartIcon from '../../assets/icons/cart.svg?react';
import FavoriteRedIcon from '../../assets/icons/heart-red.svg?react';
import { Button } from '../UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
   deleteFavorite,
   postBasket,
   postFavorites,
} from '../../store/thunks/cardThunks';
import { deleteProduct } from '../../store/thunks/productsthunks';
import { useNavigate } from 'react-router';

const colors = ['#00c8ff', '#37ff00', '#d9ff00', '#383535'];

export const ProductInfo = () => {
   const dispatch = useDispatch();
   const { productInfo } = useSelector(state => state.productCategory);
   const navigate = useNavigate();

   const [count, setCount] = useState(1);
   const { role } = useSelector(state => state.auth);
   const [selectedColors, setSelectedColors] = useState({
      red: false,
      blue: false,
      lilas: false,
      brown: false,
      black: false,
   });

   const handleColorClick = color => {
      setSelectedColors({
         ...selectedColors,
         [color]: !selectedColors[color],
      });
   };

   const increment = () => {
      setCount(count + 1);
   };

   const decrement = () => {
      if (count > 1) {
         setCount(count - 1);
      }
   };

   const handleSubmit = () => {
      dispatch(
         postBasket({
            subGadgetId: productInfo.subGadgetId,
            quantity: count,
            gadgetId: productInfo.gadgetId,
         }),
      );
      setCount(1);
   };
   const handleSubmitIcon = () => {
      dispatch(
         postFavorites({
            subGadgetId: productInfo.subGadgetId,
            gadgetId: productInfo.gadgetId,
         }),
      );
      setCount(1);
   };

   const removeFromFavorite = () => {
      dispatch(
         deleteFavorite({
            subGadgetId: productInfo.subGadgetId,
            gadgetId: productInfo.gadgetId,
         }),
      );
      setCount(1);
   };

   const removeProduct = () => {
      dispatch(deleteProduct({ gadgetId: productInfo.subGadgetId, navigate }));
   };

   const handleNavigateToBasket = () => {
      // navigate to basket function
   };

   return (
      <div className="container">
         <Title>{productInfo?.nameOfGadget}</Title>
         <ContainerP>
            <p>B наличии ({productInfo?.quantity})</p>
            <span>Артикул:{productInfo?.articleNumber}</span>
            <ContainerChildP>
               <Rating readOnly value={+productInfo.rating} />
               <p>({productInfo?.rating?.toFixed(2)})</p>
            </ContainerChildP>
         </ContainerP>
         <Container>
            <div style={{ display: 'flex', gap: '45px', width: '290px' }}>
               <div>
                  <h3
                     style={{
                        fontFamily: 'Inter',
                        fontWeight: '700',
                        paddingBottom: '10px',
                     }}
                  >
                     Цвет товара:
                  </h3>
                  <ColorsStyle>
                     {colors.map(color => (
                        <div
                           key={color}
                           style={{ padding: '2px' }}
                           onClick={() => handleColorClick('black')}
                        >
                           <Colors color={color} />
                        </div>
                     ))}
                  </ColorsStyle>
               </div>
               {!productInfo.basket && role === 'USER' && (
                  <div
                     style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                     }}
                  >
                     <p style={{ fontFamily: 'Inter', fontWeight: '700' }}>
                        Количество:
                     </p>
                     <div
                        style={{
                           display: 'flex',
                           gap: '10px',
                           alignItems: 'center',
                        }}
                     >
                        <MinusIcon
                           onClick={decrement}
                           style={{ cursor: 'pointer' }}
                        />
                        <span
                           style={{
                              fontFamily: 'Inter',
                              fontSize: '20px',
                              fontWeight: '400',
                              color: '#909CB5',
                           }}
                        >
                           {count}
                        </span>
                        <PlusIcon
                           onClick={increment}
                           style={{ cursor: 'pointer' }}
                        />
                     </div>
                  </div>
               )}
            </div>
            <SecondContainer>
               <div
                  style={{
                     borderBottom: '1px solid #d6dce9',
                     padding: '10px',
                  }}
               >
                  <div
                     style={{
                        font: 'small-caption',
                        width: '127px',
                        height: '36px',
                        fontSize: '30px',
                        display: 'flex',
                        alignItems: 'center',
                     }}
                  >
                     {productInfo?.percent > 0 && (
                        <div style={{ marginRight: '12px' }}>
                           <p
                              style={{
                                 display: 'inline-block',
                                 width: '36px',
                                 height: '36px',
                                 background: 'red',
                                 color: '#ffffff',
                                 borderRadius: '30px',
                                 fontSize: '12px',
                                 fontWeight: '900',
                                 textAlign: 'center',
                                 paddingTop: '10px',
                              }}
                           >
                              {productInfo?.percent}%
                           </p>
                        </div>
                     )}
                     <p>{productInfo?.currentPrice}</p>
                     <div
                        style={{
                           textDecoration: 'underline',
                           marginLeft: '10px',
                           fontSize: '30px',
                           lineHeight: '36.31px',
                        }}
                     >
                        с
                     </div>
                     {productInfo?.percent > 0 && (
                        <p
                           style={{
                              font: 'small-caption',
                              color: 'grey',
                              textDecoration: 'line-through',
                              width: '20px',
                              fontSize: '18px',
                              paddingTop: '10px',
                              marginLeft: '16px',
                           }}
                        >
                           {productInfo?.price}c
                        </p>
                     )}
                  </div>
               </div>

               <ButtonAndIconContainer>
                  <BlockIcon favorite={productInfo.likes}>
                     {role === 'USER' &&
                        (productInfo.likes ? (
                           <FavoriteRedIcon onClick={removeFromFavorite} />
                        ) : (
                           <FavoriteIcon onClick={handleSubmitIcon} />
                        ))}
                     {role === 'ADMIN' && (
                        <DeleteIcon onClick={removeProduct} />
                     )}
                  </BlockIcon>
                  {role === 'USER' ? (
                     productInfo.basket ? (
                        <ButtonStyle
                           variant="outlined"
                           onClick={handleNavigateToBasket}
                        >
                           <StyledCart /> Перейти в корзину
                        </ButtonStyle>
                     ) : (
                        <ButtonStyle variant="contained" onClick={handleSubmit}>
                           <CartIcon /> В корзину
                        </ButtonStyle>
                     )
                  ) : null}
                  {role === 'ADMIN' && (
                     <ButtonStyle variant="contained" onClick={handleSubmit}>
                        редактировать
                     </ButtonStyle>
                  )}
               </ButtonAndIconContainer>
            </SecondContainer>
         </Container>
         <div>
            <h4 style={{ fontFamily: 'Inter', fontWeight: '700' }}>
               Коротко о товаре:
            </h4>
            <InfoList>
               <InfoItem>
                  Цвет<Value>{productInfo.mainColour}</Value>
               </InfoItem>
            </InfoList>
            <InfoList>
               <InfoItem>
                  Дата выпуска<Value>{productInfo?.releaseDate}</Value>
               </InfoItem>
            </InfoList>
            <InfoList>
               <InfoItem>
                  Память<Value>{productInfo.memory}</Value>
               </InfoItem>
            </InfoList>
            <InfoList>
               <InfoItem>
                  SIM-карты<Value>{productInfo.countSim}</Value>
               </InfoItem>
            </InfoList>
            <InfoList>
               <InfoItem>
                  Гарантия ({productInfo.warranty} месяцев)
                  <Value>{productInfo.warranty}</Value>
               </InfoItem>
            </InfoList>
         </div>
      </div>
   );
};

const StyledCart = styled(CartIcon)(() => ({
   path: {
      fill: '#cb11ab',
   },
}));

const Colors = styled('div')(({ color }) => ({
   width: '24px',
   height: '24px',
   backgroundColor: color,
   borderRadius: '50%',
}));

const InfoList = styled('ul')(() => ({
   padding: 0,
   listStyle: 'none',
   width: '400px',
}));

const InfoItem = styled('li')(() => ({
   alignItems: 'center',
   display: 'flex',

   '&::before': {
      content: '" "',
      borderBottom: '1px dashed #222',
      flexGrow: 1,
      order: 2,
      margin: '0 5px',
   },
}));

const Value = styled('span')(() => ({
   order: 3,
}));

const Title = styled('h3')(() => ({
   fontFamily: 'Ubuntu',
   fontSize: '30px',
   fontWeight: '500',
   paddingBottom: '40px',
}));

const Container = styled('div')(() => ({
   display: 'flex',
   gap: '140px',
   paddingTop: '30px',
}));
const ContainerP = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '115px',
   borderBottom: '1px solid #d6dce9',
   paddingBottom: '10px',
   p: {
      fontFamily: 'Inter',
      fontWeight: '500',
      color: '#2fc509',
   },
   span: {
      fontFamily: 'Inter',
      fontWeight: '500',
   },
}));
const ContainerChildP = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '2.5px',
   svg: {
      width: '20px',
      height: '20px',
   },
   p: {
      fontFamily: 'Inter',
      fontWeight: '500',
      color: '#909cb5',
   },
}));

const SecondContainer = styled('div')(() => ({
   width: '273px',
   height: '113px',
}));

const ColorsStyle = styled('div')(() => ({
   display: 'flex',
   gap: '10px',
   width: '200px',
   overflow: 'hidden',
   overflowX: 'auto',
}));
const ButtonAndIconContainer = styled('div')(() => ({
   display: 'flex',
   gap: '10px',
   paddingTop: '25px',
}));
const ButtonStyle = styled(Button)(() => ({
   width: '196px',
   display: 'flex',
   gap: '10px',
   textTransform: 'inherit',
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '600',
}));

const BlockIcon = styled('div')(({ favorite }) => ({
   width: '64px',
   height: '45px',
   border: favorite ? '2px solid #cb11ab' : '2px solid #909cb5',
   borderRadius: '4px',
   padding: '13px 18px',
   cursor: 'pointer',
}));
