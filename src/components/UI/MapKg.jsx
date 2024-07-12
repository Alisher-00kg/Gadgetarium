import React from 'react';
import Map from '../../assets/kg.svg?react';
import { styled } from '@mui/material';

export const MapKg = ({ style, ...restProps }) => {
   return (
      <StyledBox style={style} {...restProps}>
         <Map />
      </StyledBox>
   );
};

const StyledBox = styled('div')(() => ({
   width: '600px',
   display: 'inline-block',
}));
