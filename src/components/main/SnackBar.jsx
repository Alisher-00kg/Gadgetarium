import { styled } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (message, messageBtn, link) => {
   const navigate = url => {
      window.location.href = url;
   };
   toast(
      <Block>
         {message}
         <StyledButton onClick={() => navigate(link)}>
            {messageBtn}
         </StyledButton>
      </Block>,
      {
         autoClose: true,
      },
   );
};

export const SnackBar = () => {
   return (
      <>
         <StyledToastContainer
            position="top-right"
            autoClose={6000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            closeButton
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
         />
      </>
   );
};

const StyledToastContainer = styled(ToastContainer)({
   width: '658px',
   height: '65px',
   fontFamily: 'Inter',

   '.Toastify__toast': {
      padding: '20px 18px',
   },
   '.Toastify__toast-theme--light': {
      backgroundColor: '#202027',
   },
   '.Toastify__toast-body': {
      color: '#ffffff',
      fontSize: '18px',
      padding: '0',
   },

   '.Toastify__close-button >svg': {
      width: '24px',
      height: '24px',
      color: ' #fff',
   },
   '.Toastify__close-button': {
      alignSelf: 'end',
   },
});
const StyledButton = styled('button')({
   border: 'none',
   background: 'none',
   color: '#3CDE14',
   fontFamily: 'Inter',
   fontSize: '18px',
   fontWeight: '700',
   cursor: 'pointer',
});
const Block = styled('div')({
   display: 'flex',
   gap: '36px',
   fontFamily: 'Inter',
   fontWeight: '300',
});
