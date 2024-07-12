import { TextField, styled } from '@mui/material';
import { forwardRef } from 'react';

export const Input = forwardRef(
   (
      {
         placeholder,
         variant,
         error,
         value,
         type,
         onClick,
         onChange,
         ...restProps
      },
      ref,
   ) => {
      return (
         <StyledInput
            ref={ref}
            placeholder={placeholder}
            variant={variant}
            error={error}
            value={value}
            type={type}
            onChange={onChange}
            {...restProps}
         />
      );
   },
);
const StyledInput = styled(TextField)(({ error }) => ({
   height: '40px',

   '.MuiInputBase-root': {
      border: `1px solid ${error ? '#F10000' : ' rgba(144, 156, 181, 0.3)'}`,
      background: '#f6f6f6',
      width: '100%',
      height: '40px',
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
