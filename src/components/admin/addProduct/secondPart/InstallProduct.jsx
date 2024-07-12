import { Button } from '../../../UI/Button';
import { Input } from '../../../UI/Input';
import {
   Table,
   TableHead,
   TableBody,
   TableRow,
   TableCell,
   styled,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { InstallProductItem } from './InstallProductItem';
import { useEffect, useState } from 'react';

export const InstallProduct = ({ onInstallProductSubmit, setTab }) => {
   const selectedCategory = useSelector(
      state => state.productCategory.selectedCategory,
   );
   const { smartPhone, smartWatch, laptop, tablet } = useSelector(
      state => state.productCategory,
   );
   const [price, setPrice] = useState('');
   const [displayedPrice, setDisplayedPrice] = useState('');

   const getInitialProducts = () => {
      return selectedCategory === 1
         ? smartPhone
         : selectedCategory === 2
           ? smartWatch
           : selectedCategory === 3
             ? laptop
             : selectedCategory === 4
               ? tablet
               : [];
   };
   const [products, setProducts] = useState([]);


   useEffect(() => {
      setProducts(getInitialProducts());
   }, [selectedCategory, smartPhone, smartWatch, laptop, tablet]);

   const handlePriceChange = event => {
      setPrice(event.target.value);
   };

   const handleSubmitPrice = () => {
      setDisplayedPrice(price);
      setPrice('');
   };
   const handleProductPriceChange = (id, newPrice) => {
      setProducts(prevProducts =>
         prevProducts.map(product =>
            product.id === id ? { ...product, price: newPrice } : product,
         ),
      );
   };

   const handleProductQuantityChange = (id, newQuantity) => {
      setProducts(prevProducts =>
         prevProducts.map(product =>
            product.id === id ? { ...product, quantity: newQuantity } : product,
         ),
      );
   };

   const handleNextClick = () => {
      const newData = products.map(product => ({
         ...product,
         price: displayedPrice,
      }));
      onInstallProductSubmit(newData);
      setTab('3');
   };

   return (
      <Box>
         <Wrapper>
            <FormBox>
               <InputBox>
                  <LabelStyle>Общая цена</LabelStyle>
                  <InputStyle
                     type="number"
                     value={price}
                     onChange={handlePriceChange}
                  />
               </InputBox>
               <ButtonStyle variant="contained" onClick={handleSubmitPrice}>
                  Установить цену
               </ButtonStyle>
            </FormBox>
            <Table>
               <TableHeadStyle>
                  <TableRow>
                     {selectedCategory === 1 && (
                        <>
                           <TableCellStyle>Бренд</TableCellStyle>
                           <TableCellStyle>Основной цвет</TableCellStyle>
                           <TableCellStyle>Объем памяти</TableCellStyle>
                           <TableCellStyle>Оперативная память</TableCellStyle>
                           <TableCellStyle>Кол-во SIM-карт</TableCellStyle>
                           <TableCellStyle>Дата выпуска</TableCellStyle>
                        </>
                     )}
                     {selectedCategory === 2 && (
                        <>
                           <TableCellStyle>Бренд</TableCellStyle>
                           <TableCellStyle>Основной цвет</TableCellStyle>
                           <TableCellStyle>Тип экрана</TableCellStyle>
                           <TableCellStyle>
                              Объем оперативной памяти
                           </TableCellStyle>
                           <TableCellStyle>Операционная система</TableCellStyle>
                           <TableCellStyle>Дата выпуска</TableCellStyle>
                        </>
                     )}

                     {selectedCategory === 3 && (
                        <>
                           <TableCellStyle>Бренд</TableCellStyle>
                           <TableCellStyle>
                              Размер смарт часов (mm)
                           </TableCellStyle>
                           <TableCellStyle>Материал корпуса</TableCellStyle>
                           <TableCellStyle>
                              Диагональ дисплея (дюйм)
                           </TableCellStyle>
                           <TableCellStyle>Дата выпуска</TableCellStyle>
                        </>
                     )}
                     {selectedCategory === 4 && (
                        <>
                           <TableCellStyle>Бренд</TableCellStyle>
                           <TableCellStyle>Операционная система</TableCellStyle>
                           <TableCellStyle>Процессор</TableCellStyle>
                           <TableCellStyle>Связь</TableCellStyle>
                           <TableCellStyle>Дата выпуска</TableCellStyle>
                        </>
                     )}
                     <HeaderCellContainer>
                        <div>Кол-во товара</div>
                        <div>Цена</div>
                     </HeaderCellContainer>
                  </TableRow>
               </TableHeadStyle>

               <TableBody>
                  {products.map(item => (
                     <InstallProductItem
                        key={item.id}
                        {...item}
                        price={displayedPrice}
                        onPriceChange={handleProductPriceChange}
                        onQuantityChange={handleProductQuantityChange}
                     />
                  ))}
               </TableBody>
            </Table>
         </Wrapper>
         <SecondButonStyle variant="contained" onClick={handleNextClick}>
            Далее
         </SecondButonStyle>
      </Box>
   );
};
const HeaderCellContainer = styled('div')(() => ({
   display: 'flex',
   gap: '150px',
   div: {
      color: '#ffffff',
      fontFamily: 'Inter',
      fontWeight: '600',
      fontSize: '14px',
      paddingTop: '19px',
   },
}));

const Wrapper = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '60px',
}));

const LabelStyle = styled('label')(() => ({
   fontFamily: 'Inter',
   fontWeight: '500',
   fontSize: '14px',
}));
const InputStyle = styled(Input)(() => ({
   '.MuiInputBase-root': {
      background: '#ffffff',
      borderColor: '#909CB5',
      fontFamily: 'Inter',
      fontWeight: '400',
      width: '140px',
      height: '47px',
   },
}));
const InputBox = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '8px',
}));
const ButtonStyle = styled(Button)(() => ({
   width: '186px',
   height: '47px',
   textTransform: 'inherit',
   fontFamily: 'Inter',
   fontWeight: '600',
   marginTop: '24px',
}));
const FormBox = styled('form')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '20px',
}));
const TableHeadStyle = styled(TableHead)(() => ({
   height: '40px',
   backgroundColor: '#384255',
}));
const TableCellStyle = styled(TableCell)(() => ({
   color: '#ffffff',
   fontFamily: 'Inter',
   fontWeight: '600',
   fontSize: '14px',
}));

const SecondButonStyle = styled(Button)(() => ({
   width: '99px',
   textTransform: 'inherit',
   fontFamily: 'Inter',
   fontWeight: '600',
   position: 'absolute',
   bottom: '0',
   right: '150px',
}));

const Box = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '28px',
}));
