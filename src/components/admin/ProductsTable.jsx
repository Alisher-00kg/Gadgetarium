import React, { useCallback, useEffect, useState } from 'react';
import { SearchInput } from '../UI/SearchInput';
import { InfoGraphics } from '../UI/InfoGraphics';
import DatePicker from '../UI/DatePicker';
import Banner from '../../assets/icons/banner.svg?react';
import dayjs from 'dayjs';
import { Button } from '../UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
   deleteProduct,
   getGadgetById,
   getProducts,
} from '../../store/thunks/productsthunks';
import ModalBanner from '../UI/modalbannerdropzone/ModalBanner';
import { AdminTableList } from './AdminTableList';
import { Tab, Tabs, styled } from '@mui/material';
import { DiscountModal } from '../DiscountModal';
import { Icons } from '../../assets';
import DeleteModal from '../UI/deleteModal';
import { IconButton } from '../UI/IconButton';
import { useNavigate } from 'react-router';

const ProductsTable = () => {
   const dispatch = useDispatch();
   const { products, isLoading } = useSelector(state => state.productCategory);
   const navigate = useNavigate();

   const [startDate, setStartDate] = useState(dayjs('2023-01-01'));
   const [endDate, setEndDate] = useState(dayjs('2024-05-30'));
   const [pageNumber, setPageNumber] = useState(1);
   const [pageSize, setPageSize] = useState(1000000);
   const [openModal, setOpenModal] = useState({
      banner: false,
      discount: false,
      delete: false,
   });
   const [searchInput, setsearchInput] = useState('');
   const [selectedTab, setSelectedTab] = useState('');
   const [selectedProductsId, setSelectedProductsId] = useState([]);

   const columns = [
      { field: 'id', name: 'ID' },

      {
         field: 'images',
         name: 'Фото',
         render: data => {
            return (
               <img
                  src={data.images}
                  alt={data.nameOfGadget}
                  style={{ width: '64px', height: '64px' }}
               />
            );
         },
      },
      { field: 'article', name: 'Артикул' },
      { field: 'nameOfGadget', name: 'Наименование товара' },

      { field: 'releaseDate', name: 'Дата создания' },
      { field: 'quantity', name: 'Кол-во' },
      {
         field: 'price',
         name: 'Цена товара',
         render: data => (
            <div>
               <Price>{data.price}</Price>
               <Percent>{data.percent}%</Percent>
            </div>
         ),
      },

      {
         field: 'currentPrice',
         name: 'Текущая цена',
         render: data => (
            <div>
               <Price>{data.currentPrice}</Price>
            </div>
         ),
      },
      {
         field: 'percent',
         name: 'Действия',
         render: data => {
            return (
               <div
                  style={{
                     display: 'flex',
                     gap: '18px',
                  }}
               >
                  <IconButton>
                     <Icons.EditLine />
                  </IconButton>

                  <IconButton onClick={e => handleDeleteTable(e, data.id)}>
                     <Icons.DeleteChoice />
                  </IconButton>
               </div>
            );
         },
      },
   ];

   const handleDeleteTable = useCallback((e, gadgetId) => {
      e.stopPropagation();
      dispatch(
         deleteProduct({
            gadgetId,
            params: {
               sort: selectedTab,
               discount: 'ALL_DISCOUNTS',
               page: pageNumber,
               size: pageSize,
            },
         }),
      );
   }, []);

   const handleTabChange = (event, newValue) => {
      setSelectedTab(newValue);
   };

   const handleSearchChange = event => {
      setsearchInput(event.target.value);
   };

   const toggleModal = (modalName, isOpen) => {
      setOpenModal(prevState => ({
         ...prevState,
         [modalName]: isOpen,
      }));
   };
   const handleStartDateChange = date => {
      setStartDate(date);
   };

   const handleEndDateChange = date => {
      setEndDate(date);
   };

   useEffect(() => {
      dispatch(
         getProducts({
            params: {
               sort: selectedTab,
               discount: 'ALL_DISCOUNTS',
               page: pageNumber,
               size: pageSize,
            },
         }),
      );
   }, [dispatch, pageSize, selectedTab]);

   const filteredProducts = products?.paginationGadgets?.filter(product => {
      const searchTerm = searchInput.toLowerCase();
      const article =
         typeof product.article === 'string'
            ? product.article.toLowerCase()
            : '';
      const nameOfGadget =
         typeof product.nameOfGadget === 'string'
            ? product.nameOfGadget.toLowerCase()
            : '';
      const releaseDate = dayjs(product.releaseDate);

      const matchesSearch =
         article.includes(searchTerm) || nameOfGadget.includes(searchTerm);
      const matchesDate =
         (!startDate || releaseDate.isAfter(startDate)) &&
         (!endDate || releaseDate.isBefore(endDate));

      return matchesSearch && matchesDate;
   });

   const handleNavigate = () => {
      navigate('/admin/add-product');
   };

   const navigateProductInfo = id => {
      dispatch(getGadgetById(id));
      navigate(`${id}`);
   };

   return (
      <WrapperDiv>
         <ContainerDiv>
            <IconBtnStyle>
               <BtnContainer>
                  <div>
                     <SearchStyle
                        placeholder="Поиск по артикулу или ..."
                        onChange={handleSearchChange}
                        value={searchInput}
                     />
                  </div>
                  <TabsStyle value={selectedTab} onChange={handleTabChange}>
                     <AllProductIcon
                        sx={{ marginRight: '12px' }}
                        value=""
                        label="Все товары"
                     />
                     <OnSaleIcon value="onsale" label="В продаже" />
                     <InFavoritesIcon
                        sx={{ marginRight: '12px' }}
                        value="infavorites"
                        label="В избранном"
                     />
                     <InBasketIcon
                        sx={{ marginRight: '12px' }}
                        value="inbasket"
                        label="В корзине"
                     />
                  </TabsStyle>
               </BtnContainer>

               <IconBanner>
                  <ButtonStyle>
                     <Button onClick={handleNavigate}>Добавить товар</Button>
                     <Button onClick={() => toggleModal('discount', true)}>
                        Создать скидку
                     </Button>
                  </ButtonStyle>
                  <BannerStyle>
                     {openModal.banner ? (
                        <ModalBanner />
                     ) : (
                        <BannerTitle
                           onClick={() => toggleModal('banner', true)}
                        >
                           <BannerIcon />
                           Загрузить баннер
                        </BannerTitle>
                     )}
                  </BannerStyle>
               </IconBanner>
            </IconBtnStyle>
            <BigDatePickerContainer>
               <ContainerDatePicker>
                  <DatePickerStyle>
                     <DatePicker
                        selected={startDate}
                        onChange={handleStartDateChange}
                     />
                  </DatePickerStyle>
                  <DatePickerStyle>
                     <DatePicker
                        selected={endDate}
                        onChange={handleEndDateChange}
                        placeholder="до"
                        minDate={startDate}
                     />
                  </DatePickerStyle>
               </ContainerDatePicker>
               {products ? (
                  <AdminTableList
                     data={filteredProducts}
                     columns={columns}
                     onSelectIdsChange={setSelectedProductsId}
                     setPage={setPageNumber}
                     page={pageNumber}
                     navigate={navigateProductInfo}
                  />
               ) : null}
            </BigDatePickerContainer>
         </ContainerDiv>

         <InfoGrafiStyle>
            <h2>ИНФОГРАФИКА</h2>
            <InfoGraphics />
         </InfoGrafiStyle>
         <ModalBanner
            open={openModal.banner}
            onClose={() => toggleModal('banner', false)}
         />
         <DiscountModal
            open={openModal.discount}
            onClose={() => toggleModal('discount', false)}
            selectedProductsId={selectedProductsId}
         />
         <DeleteModal
            open={openModal.delete}
            onClose={() => toggleModal('delete', false)}
         />
      </WrapperDiv>
   );
};

export default ProductsTable;

const Price = styled('p')(() => ({
   color: '#4B7EE8',
}));

const Percent = styled('p')(() => ({
   color: '#F10000',
}));

const WrapperDiv = styled('div')(() => ({
   display: 'flex',
   overflow: 'hidden',
}));
const ContainerDiv = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   padding: '40px 0 0px 50px',
}));

const IconBtnStyle = styled('div')(() => ({
   display: 'flex',
   gap: '100px',
   padding: '0 80px 0px 0px',
}));

const BtnContainer = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '44px',
   padding: '0 0 25px 0',
}));
const Iconfilter = styled('div')(() => ({
   display: 'flex',
   gap: '20px',
}));

const TabsStyle = styled(Tabs)(() => ({
   '.MuiTabs-indicator': {
      height: '0',
   },

   '.css-4edy47-MuiButtonBase-root-MuiTab-root.Mui-selected': {
      color: '#fffafe',
   },

   '.css-p9j71y-MuiButtonBase-root-MuiTab-root.Mui-selected': {
      color: '#fffdff',
   },
   '.css-1b4z0m1-MuiButtonBase-root-MuiTab-root.Mui-selected': {
      color: '#fffcff',
   },
   '.css-k5rlls-MuiButtonBase-root-MuiTab-root.Mui-selected': {
      color: '#fffcff',
   },
}));

const SearchStyle = styled(SearchInput)(() => ({
   width: '559px',
   height: '39px',
   border: '1px solid rgb(205, 205, 205)',
   borderRadius: '6px',
}));

const IconBanner = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '40px',
}));
const BannerTitle = styled('p')(() => ({
   color: ' rgb(56, 66, 85)',
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '500',
   lineHeight: '17px',
}));

const BannerIcon = styled(Banner)(() => ({
   width: '16.5px',
   height: '16.5px',
}));

const AllProductIcon = styled(Tab)(() => ({
   border: 'none',
   background: 'rgb(224, 226, 231)',
   color: 'rgb(56, 66, 85)',
   cursor: 'pointer',
   borderRadius: '4px',
   width: '133px',
   height: '36px',
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '600',
   lineHeight: '19px',
   textTransform: 'inherit',
   '&.Mui-selected': {
      backgroundColor: ' rgb(56, 66, 85)',
      color: 'white',
   },
}));
const OnSaleIcon = styled(Tab)(() => ({
   background: 'rgb(224, 226, 231)',
   color: 'rgb(56, 66, 85)',
   width: '127px',
   height: '36px',
   borderRadius: '4px',
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '600',
   lineHeight: '19px',
   textTransform: 'inherit',
   '&.Mui-selected': {
      backgroundColor: ' rgb(56, 66, 85)',
      color: 'white',
   },
}));
const InFavoritesIcon = styled(Tab)(() => ({
   background: 'rgb(224, 226, 231)',
   color: 'rgb(56, 66, 85)',
   width: '143px',
   height: '36px',
   borderRadius: '4px',
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '600',
   lineHeight: '19px',
   textTransform: 'inherit',
   '&.Mui-selected': {
      backgroundColor: ' rgb(56, 66, 85)',
      color: 'white',
   },
}));
const InBasketIcon = styled(Tab)(() => ({
   background: 'rgb(224, 226, 231)',
   color: 'rgb(56, 66, 85)',
   width: '120px',
   height: '36px',
   borderRadius: '4px',
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '600',
   lineHeight: '19px',
   textTransform: 'inherit',

   '&.Mui-selected': {
      backgroundColor: ' rgb(56, 66, 85)',
      color: 'white',
   },
}));

const InfoGrafiStyle = styled('div')(() => ({
   display: 'flex',
   width: '330px',
   height: '323px',
   flexDirection: 'column',
   padding: '40px 0 0 0px',
}));

const ButtonStyle = styled('div')(() => ({
   '.MuiButtonBase-root': {
      width: '184px',
      height: '43px',
   },
   display: 'flex',
   gap: '24px',

   color: ' rgb(203, 17, 171)',
   fontFamily: 'Inter',
   fontSize: '16px',
   fontWeight: '600',
   lineHeight: '120%',
}));

const BannerStyle = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'end',
}));

const ContainerDatePicker = styled('div')(() => ({
   display: 'flex',
   gap: '20px',
   paddingBottom: '60px',
}));

const BigDatePickerContainer = styled('div')(() => ({
   borderTop: '1px solid rgb(205, 205, 205);',
   width: '94%',
   padding: '20px 0 0 0 ',
}));
const DatePickerStyle = styled('div')(() => ({
   '.MuiInputBase-inputAdornedEnd': {
      width: '139px',
   },
}));
