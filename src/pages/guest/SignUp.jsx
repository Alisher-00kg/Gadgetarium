import React, { useState } from 'react';
import { BaseModal } from '../../components/UI/BaseModal';
import { Form, useNavigate } from 'react-router-dom';

import { Button } from '../../components/UI/Button';
import CancelationInRadioation from '../../assets/icons/cancelation.svg?react';
import ClosedPassword from '../../assets/icons/closed-password.svg?react';
import { IconButton, InputAdornment, styled } from '@mui/material';
import { useForm } from 'react-hook-form';

import ErrorMessage from '../../components/ErrorMessage';
import LookPassword from '../../assets/icons/look-password.svg?react';
import { Input } from '../../components/UI/Input';
import { useDispatch } from 'react-redux';
import { notify } from '../../components/main/SnackBar';
import { signInPostThunks, signUpThunks } from '../../store/thunks/authThunks';
import { setName } from '../../store/auth/authSlice';

const SignUp = ({ open, onClose, onSiginSignUp }) => {
   const [showPassword, setShowPassword] = useState(false);
   const [showConfigrPassword, setShowConfigrPassword] = useState(false);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };
   const togglePasswordConfigr = () => {
      setShowConfigrPassword(!showConfigrPassword);
   };

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      defaultValues: {
         firstName: '',
         lastName: '',
         phoneNumber: '',
         email: '',
         password: '',
      },
      mode: 'onBlur',
   });

   const onSubmit = async userData => {
      const { confirmPassword, ...userDataWithoutConfirm } = userData;
      dispatch(
         signUpThunks({
            userData: userDataWithoutConfirm,
            navigate,
            notify,
         }),
         onClose(),
      );
   };

   return (
      <BaseModal open={open} onClose={onClose}>
         <Form onSubmit={handleSubmit(onSubmit)}>
            <ConsiletionStyle>
               <CancelationInRadioation onClick={onClose} />
            </ConsiletionStyle>
            <Label htmlFor="">Регистрация</Label>
            <InputContainer>
               <InputSyle
                  {...register('firstName', { required: 'заполните имя' })}
                  placeholder="Напишите ваше имя"
                  typ="text"
                  error={errors.firstName}
               />
               <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
               <InputSyle
                  {...register('lastName', {
                     required: 'заполните фамилию',
                  })}
                  type="text"
                  placeholder="Напишите вашу фамилию"
                  error={errors.lastName}
               />
               <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
               <InputSyle
                  {...register('phoneNumber', {
                     required: 'заполните номер телефона',
                  })}
                  placeholder="+996  _ _  _ _  _ _"
                  error={errors.phoneNumber}
               />
               <ErrorMessage>{errors.phoneNumber?.message}</ErrorMessage>
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
                     required: 'заполните пароль ',
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

               <InputSyle
                  {...register('confirmPassword', {
                     required: 'Подтвердите пароль',
                     minLength: {
                        value: 8,
                        message: 'пароль должен быть не менее 8 символов',
                     },
                  })}
                  error={errors.confirmPassword}
                  placeholder="Подтвердите пароль"
                  type={showConfigrPassword ? 'text' : 'password'}
                  InputProps={{
                     endAdornment: (
                        <InputAdornment position="end">
                           <IconButton onClick={togglePasswordConfigr}>
                              {showConfigrPassword ? (
                                 <LookPassword />
                              ) : (
                                 <ClosedPassword />
                              )}
                           </IconButton>
                        </InputAdornment>
                     ),
                  }}
               />
               <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
            </InputContainer>

            <BtnSyle>
               <ButtonSigin type="submit" variant="contained">
                  Создать аккаунт
               </ButtonSigin>
            </BtnSyle>
            <LinkDiv>
               У вас уже есть аккаунт?
               <LinkStyle onClick={() => onSiginSignUp('signIn')}>
                  {' '}
                  Войти
               </LinkStyle>
            </LinkDiv>
         </Form>
      </BaseModal>
   );
};

export default SignUp;

const ConsiletionStyle = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'flex-end',
}));

const Label = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   paddingTop: '16px',
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
   padding: ' 24px 60px 40px 50px',
   color: ' rgb(145, 150, 158)',
   fontFamily: 'Inter',
   fontSize: '16px',
   fontWeight: '400',
   lineHeight: '19px',
}));
const InputSyle = styled(Input)(({ error }) => ({
   width: '460px',
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
   paddingLeft: '20px',
   color: ' rgb(255, 255, 255)',
   fontFamily: 'Inter',
   fontSize: '16px',
   fontWeight: '600',
   lineHeight: '19px',
   letterSpacing: '0%',
}));
const ButtonSigin = styled(Button)(() => ({
   color: 'white',
   width: '460px',
   height: '47px',
   textTransform: 'inherit',
   '&:hover': {
      backgroundColor: 'rgb(203, 17, 171)',
   },
}));
const LinkDiv = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   padding: '12px 60px',
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
