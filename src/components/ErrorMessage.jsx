import React from 'react';
import { styled } from '@mui/material';

const ErrorMessage = ({ children }) => {
   return <StayledMessage>{children}</StayledMessage>;
};
const StayledMessage = styled('span')`
   font-size: 14px;
   color: red;
`;

export default ErrorMessage;
