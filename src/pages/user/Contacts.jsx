import { useState } from 'react';
import { BreadCrumbs } from '../../components/UI/BreadCrumbs';
import { styled } from '@mui/material';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';

const array = [
   {
      label: 'Главная',
      href: '/',
   },
   {
      label: 'Контакты',
      href: '/contacts',
   },
];

const Contacts = () => {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [surname, setSurname] = useState('');
   const [phone, setPhone] = useState('');
   const [message, setMessage] = useState('');

   const handleClick = () => {
      setName('');
      setEmail('');
      setSurname('');
      setPhone('');
      setMessage('');
   };
   return (
      <ContainerDiv>
         <StyledTitleAndBr>
            <BreadCrumbs breadcrumbs={array} />
            <p>Контакты</p>
         </StyledTitleAndBr>
         <Container>
            <StyledLeftContainer>
               <Title>Магазин Gadgetarium</Title>
               <Box>
                  <span>АДРЕС:</span>
                  <p>г. Бишкек, ул. Гражданская 119</p>
               </Box>
               <Box>
                  <span>Телефон:</span>
                  <p>г+996(400) 00-00-00</p>
               </Box>
               <Box>
                  <span>Почта:</span>
                  <p>Gadgetarium.kg</p>
               </Box>
               <Box>
                  <span>Режим работы:</span>
                  <p>10:00 - 21:00</p>
               </Box>
            </StyledLeftContainer>
            <StyledForm>
               <p>Напишите нам</p>
               <div>
                  <div>
                     <StyledInputs>
                        <div>
                           <label>
                              Имя
                              <em>*</em>
                              <br />
                              <Input
                                 type="text"
                                 value={name}
                                 onChange={e => setName(e.target.value)}
                                 placeholder="Напишите ваше имя"
                              />
                           </label>
                        </div>
                        <label>
                           Фамилия<em>*</em>
                           <br />
                           <Input
                              type="text"
                              value={surname}
                              onChange={e => setSurname(e.target.value)}
                              placeholder="Напишите вашу фамилию"
                           />
                        </label>
                        <div></div>
                     </StyledInputs>
                     <StyledInputs>
                        <div>
                           <label>
                              E-mail<em>*</em>
                              <br />
                              <Input
                                 type="text"
                                 value={email}
                                 onChange={e => setEmail(e.target.value)}
                                 placeholder="Напишите ваш email"
                              />
                           </label>
                        </div>
                        <div>
                           <label>
                              Телефон<em>*</em>
                              <br />
                              <Input
                                 type="text"
                                 value={phone}
                                 onChange={e => setPhone(e.target.value)}
                                 placeholder="+996 (_ _ _) _ _  _ _  _ _"
                              />
                           </label>
                        </div>
                     </StyledInputs>
                  </div>
               </div>
               <div>
                  Сообщение
                  <StyledInput
                     type="text"
                     value={message}
                     onChange={e => setMessage(e.target.value)}
                     placeholder="Напишите сообщение"
                  />
               </div>
               <Button variant={'contained'} onClick={handleClick}>
                  Отправить
               </Button>
            </StyledForm>
         </Container>
         <MapContainer>
            <iframe
               title="Google Maps"
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d35977.85348543587!2d37.34932056397784!3d55.695666370742174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54e4146b4e5b3%3A0x2f6e0d8c3d76fee3!2z0J_QtdC60LDRgNC90Y8g0LLRi9C_0LXRh9C60LAgJiDQotCw0L3QtNGL0YA!5e0!3m2!1sru!2sru!4v1692383363665!5m2!1sru!2sru"
               width="95%"
               height="400"
               style={{ border: 0 }}
               allowFullScreen
               loading="lazy"
               referrerPolicy="no-referrer-when-downgrade"
            >
               hello
            </iframe>
         </MapContainer>
      </ContainerDiv>
   );
};

export default Contacts;
const ContainerDiv = styled('div')(() => ({
   padding: '90px',
}));
const StyledTitleAndBr = styled('div')(() => ({
   display: 'flex',
   gap: '30px',
   flexDirection: 'column',
   '& p': {
      fontSize: '30px',
      borderBottom: '1px solid grey',
      fontFamily: 'Ubuntu',
      fontWeight: '500 ',
      paddingBottom: '30px',
   },
}));
const StyledLeftContainer = styled('div')(() => ({
   display: 'flex',
   gap: '19px',
   flexDirection: 'column',
}));

const StyledForm = styled('form')(() => ({
   width: '688px',
   display: 'flex',
   flexDirection: 'column',
   gap: '30px',
   '& p': {
      fontFamily: 'Inter',
      fontSize: '24px',
      fontWeight: '700',
   },
   '& em': {
      color: 'red',
   },
}));
const Container = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   padding: '40px 0px 0px 0px',
}));
const StyledInputs = styled('div')(() => ({
   display: 'flex',
   gap: '12px',

   '& div': {
      display: 'flex',
      gap: '42px',
      width: '338px',
      height: '80px',
   },
}));

const StyledInput = styled(Input)(() => ({
   '.MuiInputBase-root': {
      width: '685px',
      height: '200px',
      paddingBottom: '130px',
   },
}));

const Box = styled('div')(() => ({
   span: {
      fontFamily: 'Inter',
      fontSize: '18px',
      fontWeight: '700',
   },
   p: {
      fontFamily: 'Inter',
      fontSize: '18px',
      fontWeight: '400',
   },
}));

const Title = styled('p')(() => ({
   fontFamily: 'Inter',
   fontWeight: '500',
   fontSize: '24px',
}));
const MapContainer = styled('div')(() => ({
   padding: '90px 0px 0px 40px',
}));
