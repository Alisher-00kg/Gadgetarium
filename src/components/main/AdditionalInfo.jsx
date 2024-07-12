import { styled } from '@mui/material';
import { additional } from '../../utils/constants/additionalInfo';

export const AdditionalInfo = () => {
   return (
      <Wrapper>
         {additional.map(item => (
            <CardContainer key={item.id} special={item.id === 4}>
               <div>{item.svg}</div>
               <p>{item.description}</p>
            </CardContainer>
         ))}
      </Wrapper>
   );
};
const Wrapper = styled('div')(() => ({
   display: 'flex',
   gap: '40px',
   justifyContent: 'center',
}));
const CardContainer = styled('div')(({ special }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '20px',
   alignItems: 'center',
   width: '222px',
   height: '192px',
   backgroundColor: '#ffffff ',
   borderRadius: '4px',
   padding: '30px 40px',

   p: {
      color: '#2929292',
      fontFamily: 'Inter',
      fontSize: '16px,',
      fontWeight: '400',
      textAlign: 'center',
      width: special ? '130px' : '190px',
      height: '42px',
   },
}));
