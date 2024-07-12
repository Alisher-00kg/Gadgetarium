import { Box, Menu, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import Palette from '../../../../../assets/icons/palette.svg?react';
import { colors } from '../../../../../utils/constants/colors';

export const AddColor = ({ onChange, reset }) => {
   const [anchorEl, setAnchorEl] = useState(null);
   const [selectedPalette, setSelectedPalette] = useState(null);

   const handleClick = event => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const handlePaletteSelect = palette => {
      setSelectedPalette(palette);
      onChange && onChange(palette);
      handleClose();
   };
   useEffect(() => {
      if (reset) {
         setSelectedPalette(null);
      }
   }, [reset]);

   return (
      <>
         <Wrapper>
            <div onClick={handleClick}>
               {selectedPalette && <span>{selectedPalette}</span>}
               <Palette />
            </div>
         </Wrapper>
         <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
         >
            <Container>
               {colors.map(item => (
                  <div
                     key={item.codeColor}
                     onClick={() => handlePaletteSelect(item)}
                  >
                     <Block style={{ background: item }}></Block>
                  </div>
               ))}
            </Container>
         </Menu>
      </>
   );
};

const Container = styled('div')(() => ({
   width: '396px',
   height: '277px',
   background: '#ffffff',
   display: 'flex',
   flexWrap: 'wrap',
   justifyContent: 'center',
   gap: '3px',
}));
const Block = styled('div')(() => ({
   width: '28px',
   height: '28px',
   cursor: 'pointer',
}));
const Wrapper = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'end',
   alignItems: 'center',
   width: '396px',
   fontFamily: 'Inter',
   fontWeight: '300',
   borderRadius: '6px',
   border: '1px solid #CDCDCD',
   padding: '10px',
   '& svg': {
      marginRight: '8px',
      cursor: 'pointer',
   },

   span: {
      fontFamily: 'Inter',
      fontWeight: '300',
      color: '#91969e',
      paddingLeft: '12px',
      display: 'flex',
      alignItems: 'center',
   },
   div: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '280px',
   },
}));
