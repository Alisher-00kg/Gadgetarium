// App.js
import React, { useEffect, useState } from 'react';
import { Form, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/UI/Input';
import { Button } from '../../components/UI/Button';
import { IconButton, InputAdornment, styled } from '@mui/material';
import { MyDropZone } from '../../components/MyDropZone';
import ErrorMessage from '../../components/ErrorMessage';
import LookPassword from '../../assets/icons/look-password.svg?react';
import ClosedPassword from '../../assets/icons/closed-password.svg?react';
import {
   editProfileThunk,
   newPasswordThunk,
} from '../../store/thunks/profilThunks';
import { notify } from '../../components/main/SnackBar';

const Profil = () => {
   const [swaper, setSwaper] = useState(true);
   const [showPassword, setShowPassword] = useState(false);
   const [showConfigrPassword, setShowConfigrPassword] = useState(false);
   const [showNewPassword, setShowNewPassword] = useState(false);
   const { profile } = useSelector(state => state.profile);

   const dispatch = useDispatch();

   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm({
      defaultValues: {
         userName: profile?.firsName,
         lastName: profile?.lastName,
         phoneNumber: profile?.phoneNumber,
         email: profile?.email,
         password: '',
         newpassword: '',
         adress: profile?.address,
         newconfirmPassword: '',
      },
      mode: 'onBlur',
   });

   const onSubmit = data => {
      const edit = {
         userName: data.userName,
         lastName: data.lastName,
         phoneNumber: data.phoneNumber,
         email: data.email,
         address: data.adress || '', // Убедитесь, что поле address не null
      };
      const newpaswword = {
         oldPassword: data.password,
         newPassword: data.newpassword,
         confirmationPassword: data.newconfirmPassword,
      };
      dispatch(editProfileThunk(edit));

      if (!setSwaper) {
         dispatch(newPasswordThunk(newpaswword));
      }

      notify(<NotifyStyled>профиль был редактирован</NotifyStyled>);
   };

   return (
      <Stylemain>
         <Stylearticle>
            <Link>{'Личный кабинет>>'}</Link>
            <Link>Учетная запись</Link>
         </Stylearticle>
         <h1>Профиль</h1>
         <Stylesection>
            <button>История заказов</button>
            <button>Избранное</button>
            <button style={{ background: 'black', color: 'white' }}>
               Профиль
            </button>
         </Stylesection>

         <Form
            style={{ display: 'flex', gap: '56px' }}
            onSubmit={handleSubmit(onSubmit)}
         >
            <MyDropZone />
            <Stylediv>
               <h2>Личные данные</h2>
               <div>
                  <span>
                     <h3>
                        имя <i>*</i>
                     </h3>
                     <Input
                        {...register('userName', {
                           required: 'заполните имя',
                        })}
                        placeholder="Напишите ваше имя"
                        typ="text"
                        error={errors.userName}
                     />
                     <ErrorMessage>{errors.userName?.message}</ErrorMessage>
                  </span>
                  <span>
                     <h3>
                        фамилия <i>*</i>
                     </h3>
                     <Input
                        {...register('lastName', {
                           required: 'заполните фамилию',
                        })}
                        type="text"
                        placeholder="Напишите вашу фамилию"
                        error={errors.lastName}
                     />
                     <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
                  </span>
               </div>
               <div>
                  <span>
                     <h3>
                        E-mail <i>*</i>
                     </h3>
                     <Input
                        {...register('email', {
                           required: 'заполните почту',
                           pattern: {
                              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                              message: 'Неверный формат почты',
                           },
                        })}
                        type="email"
                        placeholder="Напишите email"
                        error={errors.email}
                     />
                     <ErrorMessage>{errors.email?.message}</ErrorMessage>
                  </span>
                  <span>
                     <h3>
                        Телефон<i>*</i>
                     </h3>
                     <Input
                        {...register('phoneNumber', {})}
                        placeholder="+996  _ _  _ _  _ _"
                        error={errors.phoneNumber}
                     />
                     <ErrorMessage>{errors.phoneNumber?.message}</ErrorMessage>
                  </span>
               </div>
               <div>
                  <Styledspan>
                     <h3>
                        адрес доставки <i>*</i>
                     </h3>
                     <Input
                        {...register('adress', { required: 'Заполните адрес' })}
                        type="text"
                        placeholder="укажите адрес"
                        error={errors.adress}
                     />
                  </Styledspan>
               </div>
               {swaper ? (
                  <p onClick={() => setSwaper(false)}>Сменить пароль</p>
               ) : (
                  <StyledContainer>
                     <span>
                        <h3>
                           Старый пароль<i>*</i>
                        </h3>
                        <Input
                           {...register('password', {
                              required: 'заполните пароль ',
                              minLength: {
                                 value: 8,
                                 message:
                                    'пароль должен быть не менее 8 символов',
                              },
                           })}
                           placeholder="Напишите старый пароль"
                           error={errors.password}
                           type={showPassword ? 'text' : 'password'}
                           InputProps={{
                              endAdornment: (
                                 <InputAdornment position="end">
                                    <IconButton
                                       onClick={() =>
                                          setShowPassword(!showPassword)
                                       }
                                    >
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
                     </span>
                     <span>
                        <h3>
                           Новый пароль<i>*</i>
                        </h3>
                        <Input
                           {...register('newpassword', {
                              required: 'заполните пароль ',
                              minLength: {
                                 value: 8,
                                 message:
                                    'пароль должен быть не менее 8 символов',
                              },
                           })}
                           placeholder="Напишите новый пароль"
                           error={errors.newpassword}
                           type={showNewPassword ? 'text' : 'password'}
                           InputProps={{
                              endAdornment: (
                                 <InputAdornment position="end">
                                    <IconButton
                                       onClick={() =>
                                          setShowNewPassword(!showNewPassword)
                                       }
                                    >
                                       {showNewPassword ? (
                                          <LookPassword />
                                       ) : (
                                          <ClosedPassword />
                                       )}
                                    </IconButton>
                                 </InputAdornment>
                              ),
                           }}
                        />
                        <ErrorMessage>
                           {errors.newpassword?.message}
                        </ErrorMessage>
                     </span>
                     <span style={{ marginBottom: '10px' }}>
                        <h3>
                           Потвердите новый пароль<i>*</i>
                        </h3>
                        <Input
                           {...register('newconfirmPassword', {
                              required: 'Подтвердите новый пароль ',
                              minLength: {
                                 value: 8,
                                 message:
                                    'пароль должен быть не менее 8 символов',
                              },
                           })}
                           error={errors.confirmPassword}
                           placeholder="Подтвердите пароль"
                           type={showConfigrPassword ? 'text' : 'password'}
                           InputProps={{
                              endAdornment: (
                                 <InputAdornment position="end">
                                    <IconButton
                                       onClick={() =>
                                          setShowConfigrPassword(
                                             !showConfigrPassword,
                                          )
                                       }
                                    >
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
                        <ErrorMessage>
                           {errors.confirmPassword?.message}
                        </ErrorMessage>
                     </span>
                  </StyledContainer>
               )}
               <div>
                  <Button
                     style={{ width: '338px', height: '47px' }}
                     onClick={() => setSwaper(true)}
                  >
                     Назад
                  </Button>
                  <Button
                     style={{ width: '338px', height: '47px' }}
                     variant={'contained'}
                     type="submit"
                  >
                     Редактировать
                  </Button>
               </div>
            </Stylediv>
         </Form>
      </Stylemain>
   );
};

const NotifyStyled = styled('div')(() => ({
   width: '623px',
   height: '65px',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   gap: '36px',
   fontSize: '18px',
   fontWeight: '400',
   borderRadius: '4px',
   color: '#FFFFFF',
   padding: '20px 18px 20px 18px',
}));
const Styledspan = styled('span')(() => ({
   '.MuiInputBase-root': {
      width: '690px',
   },
}));

const StyledContainer = styled('div')`
   display: flex;
   flex-direction: column;
`;

const Stylemain = styled('main')`
   width: 100%;
   height: 126vh;
   display: flex;
   flex-direction: column;
   gap: 30px;
   padding-left: 195px;
   padding-top: 60px;
   p {
      color: rgb(203, 17, 171);
      margin-left: 80%;
      cursor: pointer;
   }
   h1 {
      width: 89%;
      height: 55px;
      color: rgb(41, 41, 41);
      font-family: Ubuntu;
      font-size: 30px;
      font-weight: 500;
      line-height: 110%;
      border-bottom: 1px black solid;
   }
`;

const Stylearticle = styled('article')`
   a {
      text-decoration: none;
      color: gray;
   }
`;

const Stylesection = styled('section')`
   display: flex;
   gap: 12px;
   button {
      width: auto;
      height: 34px;
      padding: 8px 20px 9px 20px;
      border-radius: 4px;
      background: rgb(224, 226, 231);
      border: none;
   }
`;

const Stylediv = styled('div')`
   display: flex;
   flex-direction: column;
   gap: 12px;
   h2 {
      color: rgb(41, 41, 41);
      font-size: 24px;
      font-weight: 700;
      line-height: 110%;
      padding-bottom: 18px;
   }
   div {
      display: flex;
      gap: 12px;
   }
   span {
      width: 338px;
      height: 80px;
      display: flex;
      flex-direction: column;
      padding-bottom: 15px;
      gap: 8px;
      h3 {
         color: rgb(56, 66, 85);
      }
      i {
         color: red;
      }
   }
`;

export default Profil;
