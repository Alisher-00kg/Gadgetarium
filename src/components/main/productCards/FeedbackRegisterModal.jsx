import { useState } from 'react';
import { BaseModal } from '../../UI/BaseModal';
import { IconButton, InputAdornment, styled } from '@mui/material';
import { Button } from '../../UI/Button';
import { Input } from '../../UI/Input';
import ErrorMessage from '../../ErrorMessage';
import { useForm } from 'react-hook-form';
import ClosedPassword from '../../../assets/icons/closed-password.svg?react';
import LookPassword from '../../../assets/icons/look-password.svg?react';
import CloseIcon from '../../../assets/icons/grey-cancalation.svg?react';
import { Form, Link, useNavigate } from 'react-router-dom';
import { signInPostThunks } from '../../../store/thunks/authThunks';
import { useDispatch } from 'react-redux';
import { notify } from '../SnackBar';
import { FeedbackSignUpModal } from './FeedbackSignUpModal';

export const FeedbackRegisterModal = ({ onClose }) => {
   const [showPassword, setShowPassword] = useState(false);
   const [isOpen, setIsOpen] = useState(true);
   const [openSigUp, setOpenSignUp] = useState(false);
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
   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   const handleCloseModal = () => {
      setIsOpen(false);
   };
   const resetFields = () => {
      reset({
         email: '',
         password: '',
      });
   };
   const onSubmit = async userData => {
      dispatch(signInPostThunks({ userData, navigate, notify }));
      onClose();
      resetFields();
   };
   const handleClick = () => {
      setOpenSignUp(true);
   };
   return (
      <BaseModal open={isOpen} onClose={handleCloseModal}>
         <div>
            <CloseIcon
               style={{
                  width: '20px',
                  height: '20px',
                  position: 'absolute',
                  right: '30px',
                  top: '30px',
                  cursor: 'pointer',
               }}
               onClick={handleCloseModal}
            />
            <Description>
               Войдите или зарегистрируйтесь чтобы опубликовать отзыв
            </Description>
            <Title>Войти</Title>
         </div>
         <Form onSubmit={handleSubmit(onSubmit)}>
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
               {openSigUp && <FeedbackSignUpModal />}
               <LinkStyle onClick={handleClick}>Зарегистрироваться</LinkStyle>
            </LinkDiv>
         </Form>
      </BaseModal>
   );
};
const Description = styled('h2')(() => ({
   fontFamily: 'Inter',
   fontWeight: '600',
   fontSize: '20px',
   width: '326px',
   textAlign: 'center',
   margin: '0 auto',
   padding: '30px 0px  30px 0px ',
}));
const Title = styled('h3')(() => ({
   fontFamily: 'Inter',
   fontWeight: '500',
   fontSize: '28px',
   textAlign: 'center',
   paddingBottom: '20px',
}));
const CloseIconStyle = styled('svg')(() => ({
   width: '32px',
   height: '32px',
}));
const InputContainer = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '12px',
   padding: '0 60px 12px 50px',
   color: ' rgb(145, 150, 158)',
   fontFamily: 'Inter',
}));

const InputSyle = styled(Input)(({ error }) => ({
   width: '459px',
   height: '43px',

   '.MuiInputBase-root': {
      fontFamily: 'Inter',
      fontWeight: '400',
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
   textTransform: 'inherit',
   fontFamily: 'Inter',
   fontWeight: '600',
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

const LinkStyle = styled('div')(() => ({
   color: 'rgb(44, 104, 245)',
   cursor: 'pointer',
}));
