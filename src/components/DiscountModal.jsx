import React, { useEffect, useState } from 'react';
import { Button } from '../components/UI/Button';
import { styled } from '@mui/system';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../components/UI/Input';
import DatePicker from './UI/DatePicker';
import dayjs from 'dayjs';
import { BaseModal } from './UI/BaseModal';
import ErrorMessage from './ErrorMessage';
import { useDispatch } from 'react-redux';
import { discountsPost } from '../store/thunks/discountThunks';

export const DiscountModal = ({ open, onClose, selectedProductsId }) => {
   const {
      register,
      control,
      watch,
      setValue,
      formState: { errors },
      handleSubmit,
      reset,
   } = useForm({
      defaultValues: {
         startDate: null,
         lastDate: null,
         AmountOfDiscount: '',
      },
   });

   const dispatch = useDispatch();
   const startDate = watch('startDate');
   const lastDate = watch('lastDate');
   const dateToday = dayjs();

   useEffect(() => {
      if (startDate && lastDate && new Date(startDate) > new Date(lastDate)) {
         setValue('lastDate', null);
      }
   }, [startDate, lastDate, setValue]);

   const OnSubmit = data => {
      const discount = {
         discountSize: parseInt(data.AmountOfDiscount, 10),
         startDay: dayjs(data.startDate).format('YYYY-MM-DD'),
         endDay: dayjs(data.lastDate).format('YYYY-MM-DD'),
      };

      dispatch(
         discountsPost({
            selectedProducts: selectedProductsId.map(product => product.id),
            discount,
         }),
      );
      reset();
      onClose();
   };

   return (
      <div>
         <BaseModal open={open} onClose={onClose}>
            <StyledModalForm onSubmit={handleSubmit(OnSubmit)}>
               <StyledModalFormFirstChild>
                  <h2>Создать Скидку</h2>
                  <div>
                     <label>
                        Размер Скидку<sup>*</sup>
                     </label>
                     <StyledFirstInput
                        placeholder="0%"
                        {...register('AmountOfDiscount', {
                           required: {
                              value: true,
                              message: 'Поля обязательно к зополнению',
                           },

                           maxLength: {
                              value: 15,
                              message: 'Максимум 15 символов',
                           },
                        })}
                     />

                     <ErrorMessage>
                        {errors?.AmountOfDiscount?.message}
                     </ErrorMessage>
                  </div>
               </StyledModalFormFirstChild>
               <StyledModalFormSecondChild>
                  <StyledInteriorDataInput>
                     <DateStyle>
                        <label>
                           Дата начала скидки <sup>*</sup>
                        </label>
                        <Controller
                           name="startDate"
                           control={control}
                           rules={{
                              required: {
                                 value: true,
                                 message: 'Поля обязательно к зополнению',
                              },
                           }}
                           render={({ field }) => (
                              <DatePicker
                                 onChange={field.onChange}
                                 selected={field.value}
                                 value={startDate}
                                 minDate={dateToday}
                              />
                           )}
                        />
                        <ErrorMessage>
                           {errors?.firstDate?.message}
                        </ErrorMessage>
                     </DateStyle>
                     <DateStyle>
                        <label>
                           Дата окончания скидки<sup>*</sup>
                        </label>

                        <Controller
                           name="lastDate"
                           control={control}
                           rules={{
                              required: {
                                 message: 'Поля обязательно к зополнению',
                              },
                           }}
                           render={({ field }) => (
                              <DatePicker
                                 onChange={field.onChange}
                                 selected={field.value}
                                 value={lastDate}
                                 minDate={watch('lastDate')}
                                 maxDate={dayjs(
                                    new Date().setFullYear(
                                       new Date().getFullYear() + 1,
                                    ),
                                 )}
                              />
                           )}
                        />
                        <ErrorMessage>{errors?.lastDate?.message}</ErrorMessage>
                     </DateStyle>
                  </StyledInteriorDataInput>
                  <StyledInteriorDataInput>
                     <StyledButton
                        variant="outlined"
                        type="submit"
                        onClick={onClose}
                     >
                        Отменить
                     </StyledButton>
                     <StyledButton variant="contained" type="submit">
                        Добавить
                     </StyledButton>
                  </StyledInteriorDataInput>
               </StyledModalFormSecondChild>
            </StyledModalForm>
         </BaseModal>
      </div>
   );
};

const StyledModalForm = styled('form')(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: '20px',

   width: '544px',
   height: '400px',
   background: 'white',
   borderRadius: '4px',
   padding: '30px 32px 50px',
   '& sup': {
      color: 'red',
   },
   '& label': {
      fontFamily: 'Inter',
      fontSize: '14px',
      fontWeight: '400',
   },
}));

const StyledModalFormFirstChild = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   gap: '30px',
   '& h2': {
      fontFamily: 'Inter',
   },
   '& div': {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
   },
}));
const StyledModalFormSecondChild = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   flexDirection: 'column',
   gap: '30px',
   '& div': {
      display: 'flex',
   },
}));

const StyledInteriorDataInput = styled('div')(() => ({
   display: 'flex',
   gap: '32px',
   '& div': {
      display: 'flex',
      gap: '6px',
   },
}));
const DateStyle = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
}));
const StyledFirstInput = styled(Input)(() => ({
   '.MuiInputBase-input ': {
      width: '456px',
      height: '20px',
      paddingTop: '10px',
      paddingLeft: '12px',
   },
   width: '480px',
   height: '36px',
}));

const StyledButton = styled(Button)(() => ({
   fontFamily: 'Inter',
   fontWeight: '500',
   width: '230px',
   height: '37px',
   borderRadius: '4px',
}));
