import React from 'react';
import { Outlet, useNavigate, useParams } from 'react-router';
import { ProductInfo } from '../ProductInfo/ProductInfo';
import { SliderPhoneImageItem } from '../SliderPhone/SliderPhoneImageItem';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { BreadCrumbs } from '../UI/BreadCrumbs';

const SingleProduct = () => {
   const { productInfo } = useSelector(state => state.productCategory);
   const { productId } = useParams();

   const BREADCRUMBS = [
      {
         href: '',
         label: 'Товары',
      },
      {
         href: '',
         label: productInfo.nameOfGadget,
      },
   ];

   return (
      <Container>
         <BreadCrumbs breadcrumbs={BREADCRUMBS} />
         <div>
            <img src={productInfo.brandLogo} alt="" />
         </div>
         <hr />
         <br />
         {/* <StyledBtn>Товар</StyledBtn>
         <StyledBtn>Детали товара</StyledBtn> */}
         <ProductInfoContainer>
            <SliderPhoneImageItem images={productInfo.images} />
            <ProductInfo />
         </ProductInfoContainer>
         <Links>
            <Link to={'description'}>Описание</Link>
            <Link to={'characteristic'}>Характеристики</Link>
            <Link to={'review'}>Отзывы</Link>
         </Links>

         <Outlet />
      </Container>
   );
};

export default SingleProduct;

const Container = styled('div')(() => ({
   padding: '0 100px',
}));

const StyledBtn = styled('button')(() => ({
   border: 'none',
   background: 'rgb(224, 226, 231)',
   color: 'rgb(56, 66, 85)',
   cursor: 'pointer',
   borderRadius: '4px',
   fontWeight: '600',
   lineHeight: '19px',
   padding: '5px 10px',
   margin: '10px 10px 0 0 ',
}));

const ProductInfoContainer = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   gap: '40px',
}));

const Links = styled('div')(() => ({
   display: 'flex',
   gap: '40px',
   borderBottom: '1px solid #CDCDCD',
}));

const Link = styled(NavLink)(() => ({
   textDecoration: 'none',
   color: '#222',
   paddingBottom: '5px',
   fontWeight: 500,

   '&.active': {
      borderBottom: '1px solid #CB11AB',

      color: '#CB11AB',
   },
}));
