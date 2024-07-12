import { useEffect, useState } from 'react';
import { ProductInfo } from '../../ProductInfo/ProductInfo';
import { SliderPhoneImageItem } from '../../SliderPhone/SliderPhoneImageItem';
import Samsung from '../../../assets/images/samsungImage.svg?react';
import Card from '../../UI/cards/Card';
import { getViewedProducts } from '../../../store/thunks/cardThunks';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material';
import { ProductCardTub } from './ProductCardTub';
import { BreadCrumbs } from '../../UI/BreadCrumbs';
import { useParams } from 'react-router';
import { getGadgetById } from '../../../store/thunks/productsthunks';

export const ProductCards = () => {
   const dispatch = useDispatch();
   const { productInfo, isLoading } = useSelector(
      state => state.productCategory,
   );
   const { productId } = useParams();

   useEffect(() => {
      dispatch(getGadgetById(productId));
   }, []);

   const { viewedProducts } = useSelector(state => state.viewedProducts);
   const displayedProducts = viewedProducts.slice(0, 6);
   useEffect(() => {
      dispatch(getViewedProducts());
   }, []);

   if (isLoading) return;

   const breadcrumbs = [
      { href: '/', label: 'Главная' },
      { href: '/', label: 'Смартфоны' },
      { href: `/product/${productId}`, label: productInfo.nameOfGadget },
   ];

   return (
      <div style={{ background: '#f4f4f4' }}>
         <div style={{ padding: '0 0 0 90px' }}>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
         </div>
         <div style={{ padding: '90px' }}>
            {productInfo.brandLogo && (
               <img src={productInfo.brandLogo} alt="brandLogo" />
            )}
            <LineStyle></LineStyle>
            <SliderStyle>
               <SliderPhoneImageItem images={productInfo.images} />
               <ProductInfo />
            </SliderStyle>
         </div>
         <ProductCardTub id={productId} />
         <div>
            <CardTitle>Просмотренные товары</CardTitle>
            <CardsContainer>
               {displayedProducts.map(viewedProducts => (
                  <Card
                     key={viewedProducts.id}
                     price={viewedProducts.price}
                     image={viewedProducts.image}
                     title={viewedProducts.nameOfGadget}
                     number={viewedProducts.rating}
                  />
               ))}
            </CardsContainer>
         </div>
      </div>
   );
};
const CardsContainer = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   gap: '16px',
   padding: '30px 0px 80px 0px',
}));
const SliderStyle = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   gap: '40px',
   paddingTop: '40px',
}));

const CardTitle = styled('h3')(() => ({
   fontFamily: 'Ubuntu',
   fontSize: '30px',
   fontWeight: '500',
   padding: '90px 0 0 100px',
}));
const LineStyle = styled('div')(() => ({
   borderBottom: '1px solid #cdcdcd',
   width: '100%',
   paddingTop: '20px',
}));
const CardStyle = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   gap: '10px',
   padding: ' 20px 70px 70px 70px',
}));
