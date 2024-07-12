import { Box, Menu, MenuItem, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import SelectIcon from '../../../../assets/icons/down.svg?react';
import { Button } from '../../../UI/Button';
import PlusIcon from '../../../../assets/icons/plus .svg?react';
import DownloadImage from '../../../../assets/images/addimage.svg?react';
import { AddBrandModal } from './AddBrandModal';
import { brands } from '../../../../utils/constants/category';
import { useDispatch, useSelector } from 'react-redux';
import { getBrand } from '../../../../store/thunks/productThunk';

export const AddBrandSelect = ({ value, onChange }) => {
   const [anchorEl, setAnchorEl] = useState(null);
   const [openModal, setOpenModal] = useState(false);
   const dispatch = useDispatch();
   const { brand } = useSelector(state => state.brand);

   useEffect(() => {}, [dispatch]);
   const handleClick = event => {
      setAnchorEl(event.currentTarget);
      dispatch(getBrand());
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const handleBrandSelect = brand => {
      onChange(brand.brandName);
      handleClose();
   };

   const handleOpenModal = () => {
      setOpenModal(true);
      setAnchorEl(null);
   };

   const handleCloseModal = () => {
      setOpenModal(false);
   };

   return (
      <Box>
         <Container onClick={handleClick}>
            <BoxSelect>
               <div style={{ display: 'flex', alignItems: 'center' }}>
                  {value ? (
                     <img
                        src={
                           brand.find(item => item.brandName === value)?.image
                        }
                        style={{
                           width: '16px',
                           height: '16px',
                        }}
                     />
                  ) : (
                     <DownloadImage />
                  )}
                  <span>{value || 'Выберите бренд'}</span>
               </div>
               <SelectIcon style={{ marginLeft: 'auto' }} />
            </BoxSelect>
         </Container>
         <MenuStyle
            anchorEl={anchorEl}
            id="account-menu"
            open={Boolean(anchorEl)}
            onClose={handleClose}
         >
            {brand.map((item, index) => (
               <MenuItem key={index} onClick={() => handleBrandSelect(item)}>
                  <ImageStyle src={item.image} />
                  <p>{item.brandName}</p>
               </MenuItem>
            ))}
            <ButtonStyle onClick={handleOpenModal}>
               <PlusIcon />
               Создать новый бренд
            </ButtonStyle>
         </MenuStyle>
         {openModal && <AddBrandModal onClose={handleCloseModal} />}
      </Box>
   );
};

const Container = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   width: '396px',
   height: '55px',
   fontFamily: 'Inter',
   fontWeight: '300',
   borderRadius: '6px',
   border: '1px solid #CDCDCD',

   span: {
      fontFamily: 'Inter',
      fontWeight: '300',
      color: '#91969e',
      paddingLeft: '12px',
   },
}));

const MenuStyle = styled(Menu)(() => ({
   '.MuiPaper-root': {
      width: '396px',
      height: '396px',
   },
}));

const BoxSelect = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   width: '100%',
   padding: '8px',
   '& svg': {
      cursor: 'pointer',
   },
}));

const ButtonStyle = styled(Button)(() => ({
   border: 'none',
   textTransform: 'inherit',
   fontWeight: '400',
   fontFamily: 'Inter',
   display: 'flex',
   gap: '8px',
}));

const ImageStyle = styled('img')(() => ({
   width: '16px',
   height: '16px',
}));
