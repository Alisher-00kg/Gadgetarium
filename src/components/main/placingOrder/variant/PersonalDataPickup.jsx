import { styled } from '@mui/material';
import { Input } from '../../../UI/Input';
import { Button } from '../../../UI/Button';
import { Form } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../../../ErrorMessage';
import { savePersonalData } from '../../../../store/slices/personalDataSlice';
import { useDispatch } from 'react-redux';

export const PersonalDataPickup = ({ paymentChange }) => {
   const dispatch = useDispatch();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      defaultValues: {
         firstName: '',
         lastName: '',
         email: '',
         phoneNumber: '',
      },
      mode: 'onBlur',
   });

   const onSubmit = userData => {
      dispatch(savePersonalData(userData));

      paymentChange();
   };

   return (
      <div>
         <Title>Личные данные</Title>
         <FormStyle onSubmit={handleSubmit(onSubmit)}>
            <div>
               <FormBlock>
                  <LabelStyle>
                     Имя <em>*</em>
                  </LabelStyle>
                  <InputStyle
                     {...register('firstName', {
                        required: 'заполните имя',
                     })}
                     type="text"
                     placeholder="Напишите ваше имя"
                     error={errors.firstName}
                  />
                  <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
               </FormBlock>
               <FormBlock>
                  <LabelStyle>
                     Фамилия <em>*</em>
                  </LabelStyle>
                  <InputStyle
                     {...register('lastName', {
                        required: 'заполните фамилию',
                     })}
                     type="text"
                     placeholder="Напишите вашу фамилию"
                     error={errors.lastName}
                  />
                  <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
               </FormBlock>
            </div>
            <div>
               <FormBlock>
                  <LabelStyle>
                     E-mail <em>*</em>
                  </LabelStyle>
                  <InputStyle
                     {...register('email', {
                        required: 'заполните почту',
                        pattern: {
                           value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                           message: 'Некорректный email',
                        },
                     })}
                     type="email"
                     placeholder="Напишите ваш email"
                     error={errors.email}
                  />
                  <ErrorMessage>{errors.email?.message}</ErrorMessage>
               </FormBlock>
               <FormBlock>
                  <LabelStyle>
                     Телефон <em>*</em>
                  </LabelStyle>
                  <InputStyle
                     {...register('phoneNumber', {
                        required: 'заполните номер телефона',
                     })}
                     type="number"
                     placeholder="+996 (___) ___ __ __"
                     error={errors.phoneNumber}
                  />
                  <ErrorMessage>{errors.phoneNumber?.message}</ErrorMessage>
               </FormBlock>
            </div>
            <ButtonStyle type="submit" variant="contained">
               Продолжить
            </ButtonStyle>
         </FormStyle>
      </div>
   );
};
const Title = styled('h1')(() => ({
   fontFamily: 'Inter',
   fontWeight: '700',
   fontSize: '24px',
   paddingTop: '40px',
   paddingBottom: '30px',
}));
const FormBlock = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '12px',
}));
const LabelStyle = styled('label')(() => ({
   fontFamily: 'Inter',
   fontWeight: '400',
   em: {
      color: 'red',
   },
}));
const InputStyle = styled(Input)(() => ({
   '.MuiInputBase-root': {
      fontFamily: 'Inter',
      fontWeight: '400',
      width: '338px',
      height: '48px',
      background: '#ffffff',
   },
}));
const FormStyle = styled(Form)(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '12px',
   div: {
      display: 'flex',
      gap: '15px',
   },
}));
const ButtonStyle = styled(Button)(() => ({
   width: '688px',
   height: '44px',
   fontFamily: 'Inter',
   fontWeight: '600',
   textTransform: 'inherit',
   marginTop: '20px',
}));
