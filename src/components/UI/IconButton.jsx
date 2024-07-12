import * as React from 'react';
import { IconButton as MuiIconButton, styled } from '@mui/material';

export const IconButton = ({ children, onClick, ...props }) => {
   return (
      <StyledIconButton onClick={onClick} {...props}>
         {children}
      </StyledIconButton>
   );
};

const StyledIconButton = styled(MuiIconButton)(() => ({
   height: '45px',
   display: 'flex',
   alignItems: 'center',
   gap: '6px',
   borderRadius: '4px',
}));
