import React, { useState } from 'react';
import { BaseModal } from '../../components/UI/BaseModal';
import { Form, useNavigate } from 'react-router-dom';
import { Input } from '../../components/UI/Input';
import { Button, IconButton, InputAdornment, styled } from '@mui/material';
import CancelationInRadioation from '../../assets/icons/cancelation.svg?react';
import ClosedPassword from '../../assets/icons/closed-password.svg?react';
import LookPassword from '../../assets/icons/look-password.svg?react';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../../components/ErrorMessage';
import { useDispatch } from 'react-redux';
import { signInPostThunks } from '../../store/thunks/authThunks';
import { notify } from '../../components/main/SnackBar';

const SigIn = ({ open, onClose, onSiginSignUp }) => {
   const [showPassword, setShowPassword] = useState(false);

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm({
      defaultValues: {
         email: '',
         password: '',
      },
      mode: 'onBlur',
   });

   const onSubmit = async userData => {
      dispatch(signInPostThunks({ userData, navigate, notify }));
      onClose();
      resetFields();
   };

   const resetFields = () => {
      reset({
         email: '',
         password: '',
      });
   };

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   return (
      <BaseModal open={open} onClose={onClose}>
         <Form onSubmit={handleSubmit(onSubmit)}>
            <ConsiletionStyle>
               <CancelationInRadioation onClick={onClose} />
            </ConsiletionStyle>
            <Label>
               <label htmlFor="">Войти</label>
            </Label>

            <InputContainer>
               <InputSyle
                  {...register('email', {
                     required: 'заполните почту',
                     pattern: {
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                     },
                  })}
                  type="email"
                  placeholder="Напишите email"
                  error={errors.email}
               />
               <ErrorMessage>{errors.email?.message}</ErrorMessage>
               <InputSyle
                  {...register('password', {
                     required: 'заполните пароль',
                     minLength: {
                        value: 8,
                        message: 'пароль должен быть не менее 8 символов',
                     },
                  })}
                  placeholder="Напишите пароль"
                  error={errors.password}
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                     endAdornment: (
                        <InputAdornment position="end">
                           <IconButton onClick={togglePasswordVisibility}>
                              {showPassword ? (
                                 <LookPassword />
                              ) : (
                                 <ClosedPassword />
                              )}
                           </IconButton>
                        </InputAdornment>
                     ),
                  }}
               />
               <ErrorMessage>{errors.password?.message}</ErrorMessage>
            </InputContainer>

            <BtnSyle>
               <ButtonSigin type="submit" variant="contained">
                  Войти
               </ButtonSigin>
            </BtnSyle>
            <LinkDiv>
               Нет аккаунта?
               <LinkStyle onClick={() => onSiginSignUp('signUp')}>
                  Зарегистрироваться
               </LinkStyle>
            </LinkDiv>
         </Form>
      </BaseModal>
   );
};

export default SigIn;

const ConsiletionStyle = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'flex-end',
}));

const Label = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   padding: '24px 0 24px 0',
   color: ' rgb(41, 41, 41)',
   fontFamily: 'Inter',
   fontSize: '28px',
   fontWeight: '500',
   lineHeight: '34px',
}));

const InputContainer = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '12px',
   padding: '0 60px 12px 50px',
   color: ' rgb(145, 150, 158)',
   fontFamily: 'Inter',
   fontSize: '16px',
   fontWeight: '400',
   lineHeight: '19px',
}));

const InputSyle = styled(Input)(({ error }) => ({
   width: '459px',
   height: '43px',

   '.MuiInputBase-root': {
      border: `1px solid ${error ? '#F10000' : ' rgba(144, 156, 181, 0.3)'}`,
      background: '#f6f6f6',
      width: '100%',
      height: '43px',
      borderRadius: '6px',
      '&:active': {
         borderColor: '#CB11AB',
      },
   },

   '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active':
      {
         WebkitTransition:
            'color 9999s ease-out, background-color 9999s ease-out',
         WebkitTransitionDelay: '9999s',
      },
   '& fieldset': {
      border: 'none',
   },
}));
const BtnSyle = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   padding: '24px 0 0 17px',
   color: ' rgb(255, 255, 255)',
   fontFamily: 'Inter',
   fontSize: '16px',
   fontWeight: '600',
   lineHeight: '19px',
}));
const ButtonSigin = styled(Button)(() => ({
   color: 'white',
   width: '460px',
   height: '47px',
   '&:hover': {
      backgroundColor: 'rgb(203, 17, 171)',
   },
}));

const LinkDiv = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   padding: '12px 0 60px 0',
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '600',
   lineHeight: '140%',
   color: 'rgb(41, 41, 41)',
}));

const LinkStyle = styled('span')(() => ({
   color: 'rgb(44, 104, 245)',
   cursor: 'pointer',
}));
