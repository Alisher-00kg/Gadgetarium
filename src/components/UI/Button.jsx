import React from 'react';
import { Button as MuiButton, css, styled } from '@mui/material';

export const Button = ({
   children,
   style,
   onClick,
   variant,
   disabled,
   ...props
}) => {
   return (
      <StyleMuiButton
         onClick={onClick}
         style={style}
         variant={variant}
         disabled={disabled}
         {...props}
      >
         {children}
      </StyleMuiButton>
   );
};
const StyleMuiButton = styled(MuiButton)(({ variant, children }) => ({
   padding: '5px 15px 5px 15px',
   borderRadius: '5px',
   cursor: 'pointer',
   backgroundColor: variant === 'contained' ? 'rgb(203, 17, 171)' : 'none',
   color: variant === 'contained' ? 'white' : 'rgb(203, 17, 171)',
   border:
      variant === 'contained'
         ? ' rgb(203, 17, 171)'
         : '1px solid rgb(203, 17, 171)',
   '&:hover': {
      backgroundColor: variant === 'contained' ? 'rgb(203, 17, 171)' : 'none',
      color: variant === 'contained' ? 'white' : 'rgb(203, 17, 171)',
      border:
         variant === 'contained'
            ? ' rgb(ы203, 17, 171)'
            : '1px solid rgb(203, 17, 171)',
   },
   '&:active': {
      backgroundColor: variant === 'contained' ? 'rgb(235, 32, 201)' : 'none',
      color: variant === 'contained' ? 'white' : 'rgb(246, 63, 215)',
      border:
         variant === 'contained'
            ? ' solid 1px rgb(203, 17, 171)'
            : '1px solid rgb(203, 17, 171)',
   },
}));
