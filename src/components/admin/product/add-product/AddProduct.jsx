import React, { useEffect, useState } from 'react';
import Select from '../../../UI/Select';
import { useDispatch, useSelector } from 'react-redux';
import {
   getBrand,
   getCategory,
   getSubCategory,
} from '../../../../store/thunks/productThunk';
import { Input } from '../../../UI/Input';
import DatePicker from '../../../UI/DatePicker';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material';
import PhoneCategory from './categories/PhoneCategory.jsx';
import { Button } from '../../../UI/Button.jsx';
import { postGadget } from '../../../../store/thunks/productsthunks.js';
import dayjs from 'dayjs';
import { addProduct } from '../../../../store/slices/productSlice.js';

const AddProduct = ({ setTab }) => {
   const dispatch = useDispatch();
   const { imageLink, isLoading } = useSelector(state => state.banner);
   const { category, subCategory, brand } = useSelector(
      state => state.category,
   );

   const [categoryId, setCategoryId] = useState();
   const [subCategoryId, setSubCategoryId] = useState();
   const [brandId, setBrandId] = useState();

   const [formData, setFormData] = useState({
      mainColour: '',
      memory: '',
      ram: '',
      countSim: '',
      images: [],
   });

   const { register, getValues, setValue, handleSubmit } = useForm({
      defaultValues: {
         nameOfGadget: '',
         dateOfIssue: '',
         warranty: 0,
      },
      mode: 'onChange',
   });

   const handleGetSubCategory = id => {
      dispatch(getSubCategory(id));
   };

   const handleCategoryChange = e => {
      const id = e.target.value;

      setCategoryId(id);
      handleGetSubCategory(id);
   };

   const handleSubCategoryChange = e => {
      setSubCategoryId(e.target.value);
   };
   const handleBrandChange = e => {
      setBrandId(e.target.value);
   };

   const handleDateChange = newDate => {
      const formatDate = dayjs(newDate).format('YYYY-MM-DD');
      setValue('dateOfIssue', formatDate);
   };

   const submitHandler = value => {
      const newData = {
         ...value,
         productsRequests: [{ ...formData, images: imageLink }],
      };
      dispatch(postGadget({ subCategoryId, brandId, newData, setTab }));
      // dispatch(addProduct({ subCategoryId, brandId, newData }));
   };

   useEffect(() => {
      dispatch(getCategory());
   }, []);

   useEffect(() => {
      dispatch(getBrand());
   }, []);

   return (
      <div>
         <form onSubmit={handleSubmit(submitHandler)}>
            <FirstContainer>
               <Select
                  options={category}
                  onChange={handleCategoryChange}
                  value={categoryId}
                  label="Выберите категорию *"
               />
               <Select
                  options={subCategory}
                  onChange={handleSubCategoryChange}
                  value={subCategoryId}
                  label="Выберите подкатегорию *"
               />
               <Select
                  options={brand}
                  onChange={handleBrandChange}
                  value={brandId}
                  label="Бренд *"
               />
               <div>
                  <label>Гарантия (месяцев) *</label>
                  <Input
                     placeholder="Введите гарантию товара"
                     fullWidth
                     type={'number'}
                     {...register('warranty', {
                        required: true,
                        valueAsNumber: true,
                     })}
                  />
               </div>
               <div>
                  <label>Название товара *</label>
                  <Input
                     placeholder="Введите название товара"
                     fullWidth
                     {...register('nameOfGadget')}
                  />
               </div>
               <InputContainer>
                  <Description htmlFor="">
                     Дата выпуска <em>*</em>
                  </Description>
                  <DatePickerBox>
                     <DatePickerStyle
                        dateFormat="yyyy-MM-dd"
                        onChange={handleDateChange}
                     />
                  </DatePickerBox>
               </InputContainer>{' '}
            </FirstContainer>
            <PhoneCategory formData={formData} setFormData={setFormData} />
            <Button variant="contained" type={'submit'} disabled={isLoading}>
               Далее
            </Button>
         </form>
      </div>
   );
};

export default AddProduct;

const FirstContainer = styled('div')(() => ({
   display: 'grid',
   gridTemplateColumns: '400px 400px',
   width: 'fit-content',
   gap: '20px',
   margin: '0 0 50px 0',
}));

const InputContainer = styled('div')(() => ({}));

const DatePickerStyle = styled(DatePicker)(() => ({
   fontFamily: 'Inter',
   width: '400px',
   fontWeight: '400',
   '.MuiInputBase-input-MuiOutlinedInput-input': {
      fontFamily: 'Inter',
      height: '40px',
   },
   '& .MuiOutlinedInput-input': {
      padding: '0 !important',
   },

   '& .MuiInputBase-root': {
      padding: 0,
      '& .MuiButtonBase-root': {
         padding: 0,
         paddingLeft: 10,
      },
      '& .MuiInputBase-input': {
         padding: 15,
         paddingLeft: 0,
      },
   },
}));

const Description = styled('label')(() => ({}));

const DatePickerBox = styled('div')(() => ({
   fontFamily: 'Inter',
   height: '40px',

   color: 'red',
   '& .MuiStack-root': {
      padding: '0 ',

      color: 'red',
      flexDirection: 'column',
   },
   '& .MuiInputBase-input-MuiOutlinedInput-input': {
      fontFamily: 'Inter',
      color: 'red',
      padding: '0',
   },
}));
