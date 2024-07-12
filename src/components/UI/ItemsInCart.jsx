import React, { useState } from 'react';

import DeleteIcon from '../../assets/icons/delete.svg?react';
import HeartIcon from '../../assets/icons/heart.svg?react';
import PlusIcon from '../../assets/icons/plus.svg?react';
import MinusIcon from '../../assets/icons/minus.svg?react';
import StarsIcon from '../../assets/icons/stars.svg?react';
import HeartRed from '../../assets/icons/heart-red.svg?react';

import { styled } from '@mui/material';

export const ItemsInCart = () => {
   const [products, setProducts] = useState([
      {
         photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUsD3zM68dhvpUvsaOwG3rVBJSh7mMk7JQuKCeBpHMxA&s',
         name: 'Samsung Galaxy S21 128gb синий 9(MLP3RU)',
         availability: 42,
         rating: 138,
         productCode: '393478',
         price: 104900,
         quantity: 1,
         favorite: false,
         id: Date.now().toString(),
      },
   ]);

   const increaseQuantity = productId => {
      setProducts(prevProducts =>
         prevProducts.map(product =>
            product.id === productId
               ? { ...product, quantity: product.quantity + 1 }
               : product,
         ),
      );
   };

   const decreaseQuantity = productId => {
      setProducts(prevProducts =>
         prevProducts.map(product =>
            product.id === productId && product.quantity > 1
               ? { ...product, quantity: product.quantity - 1 }
               : product,
         ),
      );
   };

   const toggleFavorite = productId => {
      setProducts(prevProducts =>
         prevProducts.map(product =>
            product.id === productId
               ? { ...product, favorite: !product.favorite }
               : product,
         ),
      );
   };

   const removeItem = productId => {
      setProducts(prevProducts =>
         prevProducts.filter(product => product.id !== productId),
      );
   };

   return (
      <div>
         {products.map(item => (
            <StyledMainCart key={item.id}>
               <StyledImage>
                  <img src={item.photo} alt={item.name} />
               </StyledImage>

               <MainChild>
                  <StyledPrice>
                     <StyledTitle>
                        <h3>{item.name}</h3>
                        <div>
                           <p> Рейтинг</p> <StarsIcon /> <p> ({item.rating})</p>
                        </div>
                        <p> В наличии ({item.availability}шт)</p>
                     </StyledTitle>

                     <StyledQuantity>
                        <div>
                           <PlusIcon
                              onClick={() => increaseQuantity(item.id)}
                           />
                           <p>{item.quantity}</p>
                           <MinusIcon
                              onClick={() => decreaseQuantity(item.id)}
                           />
                        </div>

                        <p> {item.price * item.quantity} c</p>
                     </StyledQuantity>
                  </StyledPrice>
                  <StyledCodeProduct>
                     <p>Код товара: {item.productCode}</p>
                     <StyledDeleteIcon>
                        <div onClick={() => toggleFavorite(item.id)}>
                           {item.favorite ? <HeartIcon /> : <HeartRed />}
                           <p>В</p> <p>избранное</p>
                        </div>
                        <div onClick={() => removeItem(item.id)}>
                           <DeleteIcon />
                           <p>Удалить</p>
                        </div>
                     </StyledDeleteIcon>
                  </StyledCodeProduct>
               </MainChild>
            </StyledMainCart>
         ))}
      </div>
   );
};

const StyledMainCart = styled('div')(() => ({
   width: '929px',
   height: '170px',
   background: 'rgb(255, 255, 255)',
   display: 'flex',
   padding: '20px',
   borderRadius: '8px',
}));

const StyledImage = styled('div')(() => ({
   width: '160px',
   height: '160px',
   marginTop: '4px',
   '& img': { width: '106px', height: '121px' },
}));

const MainChild = styled('div')(() => ({
   width: '769px',
   height: '170px',
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
}));

const StyledQuantity = styled('div')(() => ({
   display: 'flex',
   gap: '30px',
   alignItems: 'center',
   '& div': {
      display: 'flex',
      alignItems: 'center',
      gap: '12.5px',
      cursor: 'pointer',
      '& p': {
         color: 'rgb(144, 156, 181)',
         fontFamily: 'Inter',
         fontSize: '18px',
         fontWeight: '400',
      },
   },
   '& p': {
      color: 'rgb(41, 41, 41)',
      fontFamily: 'Inter',
      fontSize: '18px',
      fontWeight: '700',
   },
}));

const StyledPrice = styled('div')(() => ({
   display: 'flex',
   gap: '30px',
}));

const StyledTitle = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignContent: 'center',
   gap: '8px',
   '& h3': {
      color: 'rgb(41, 41, 41)',
      fontFamily: 'Inter',
      fontSize: '18px',
      fontWeight: '400',
   },

   '& div': {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      color: 'rgb(144, 156, 181)',
      fontFamily: 'Inter',
      fontSize: '12px',
      fontWeight: '500',
      '& p:last-of-type': {
         color: 'rgb(144, 156, 181)',
         fontFamily: 'Inter',
         fontSize: '12px',
         fontWeight: '500',
      },
   },
   '& p:last-of-type': {
      color: 'rgb(60, 222, 20)',
      fontFamily: 'Inter',
      fontSize: '12px',
      fontWeight: '500',
   },
}));

const StyledCodeProduct = styled('div')(() => ({
   display: 'flex',
   gap: '401px',
   '& p': {
      color: 'rgb(56, 66, 85)',
      fontFamily: 'Inter',
      fontSize: '14px',
      fontWeight: '400',
   },
}));

const StyledDeleteIcon = styled('div')(() => ({
   width: '191px',
   height: '20px',
   display: 'flex',
   alignItems: 'center',
   gap: '15px',
   cursor: 'pointer',
   '& div': {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      '& svg': { width: '16px', height: '13.32px' },

      '& p': {
         color: 'rgb(144, 156, 181)',
         fontFamily: 'Inter',
         fontSize: '14px',
         fontWeight: '400',
      },
   },
}));
