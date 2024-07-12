import { styled } from '@mui/material';
import { ImageSlider } from '../../../assets/images';
import { Button } from '../../../components/UI/Button';
import { useNavigate } from 'react-router';

export const ComparisionEmpty = () => {
   const navigate = useNavigate();
   return (
      <>
         <StyledBorder> </StyledBorder>
         <ContainerRoot>
            <StyledImage src={ImageSlider.ComparisionImage} alt="" />
            <ContainerInfo>
               <div>
                  <h3>Сравнивать пока нечего</h3>
                  <p>
                     Добавляйте сюда товары, чтобы сравнить их характеристики.
                     Так выбрать станет проще!
                  </p>
               </div>
               <StyledButton variant="contained" onClick={() => navigate('/')}>
                  К покупкам
               </StyledButton>
            </ContainerInfo>
         </ContainerRoot>
      </>
   );
};

const StyledBorder = styled('div')(() => ({
   borderTop: '1px solid #CDCDCD',
   width: '73%',
   margin: '0 auto',
}));

const ContainerRoot = styled('section')(() => ({
   width: '555px',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: '30px',
   margin: '0 auto',
   marginTop: '120px',
   paddingBottom: '120px',
}));

const StyledImage = styled('img')(() => ({
   width: '300px',
   height: '300px',
}));

const ContainerInfo = styled('section')(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: '24px',

   div: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',

      h3: {
         fontSize: '24px',
         fontWeight: '500',
         color: 'rgb(41, 41, 41)',
      },

      p: {
         width: '555px',
         textAlign: 'center',
         color: 'rgb(41, 41, 41)',
         fontSize: '18px',
         fontWeight: '400',
      },
   },
}));

const StyledButton = styled(Button)(() => ({
   padding: '10px 24px',
}));
