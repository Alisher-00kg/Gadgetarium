import { Input } from '../../../UI/Input.jsx';
import { Button } from '../../../UI/Button.jsx';
import { styled, TextField } from '@mui/material';
import { AdminTableList } from '../../AdminTableList.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addPriceAndQuantity } from '../../../../store/thunks/productsthunks.js';

const AddPrice = ({ setTab }) => {
   const dispatch = useDispatch();
   const { products } = useSelector(state => state.productCategory);
   const [price, setPrice] = useState(0);
   const [quantity, setQuantity] = useState(1);
   const [totalPrice, setTotalPrice] = useState(0);
   const [page, setPage] = useState(1);

   const ids = products.map(item => item.id);

   const changePrice = () => {
      setPrice(totalPrice);
   };

   const column = [
      {
         name: 'Бренд',
         field: 'brandName',
      },
      {
         name: 'Цвет',
         field: 'mainColour',
      },
      {
         name: 'Объем памяти',
         field: 'memory',
      },
      {
         name: 'Оперативная память',
         field: 'ram',
      },
      {
         name: 'Кол-во SIM-карт',
         field: 'countSim',
      },

      {
         name: 'Кол-во товара',
         field: 'quantity',
         render: data => {
            return (
               <StyledTextField
                  type={'number'}
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
               />
            );
         },
      },
      {
         name: 'Цена',
         field: 'price',
         render: data => {
            return (
               <StyledTextField
                  type={'number'}
                  value={price}
                  InputProps={{ inputProps: { min: 1 } }}
                  onChange={e => setPrice(e.target.value)}
               />
            );
         },
      },
   ];

   const handleSubmit = () => {
      dispatch(addPriceAndQuantity({ price, quantity, id: ids, setTab }));
   };

   return (
      <div>
         <label htmlFor="price">Общая цена</label>
         <FirstContainer>
            <Input
               value={totalPrice}
               onChange={e => setTotalPrice(e.target.value)}
            />
            <Button
               variant={'contained'}
               onClick={changePrice}
               disabled={!totalPrice}
            >
               Установить цену
            </Button>
         </FirstContainer>

         <AdminTableList
            columns={column}
            data={products}
            page={page}
            setPage={setPage}
         />
         <BtnContainer>
            <Button variant={'contained'} onClick={handleSubmit}>
               Далее
            </Button>
         </BtnContainer>
      </div>
   );
};

export default AddPrice;

const FirstContainer = styled('div')(() => ({
   display: 'flex',
   gap: '20px',
   margin: '0 0 60px 0',
}));

const StyledTextField = styled(TextField)(() => ({
   background: '#fae8f7',
   width: '170px',
}));

const BtnContainer = styled('div')(() => ({
   textAlign: 'right',
}));
