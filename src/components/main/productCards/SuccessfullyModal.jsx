import { useState } from 'react';
import { BaseModal } from '../../UI/BaseModal';
import SuccessfullyIcon from '../../../assets/icons/successfullyIcon.svg?react';
import { styled } from '@mui/material';

export const SuccessfullyModal = () => {
   const [isOpen, setIsOpen] = useState(true);
   const handleCloseModal = () => {
      setIsOpen(!isOpen);
   };
   return (
      <BaseModal open={isOpen} onClose={handleCloseModal}>
         <Box>
            <SuccessfullyIcon />
            <p>Ваш отзыв был успешно отправлен!</p>
         </Box>
      </BaseModal>
   );
};

const Box = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: '25px',
   p: {
      fontFamily: 'Inter',
      fontSize: '18px',
      fontWeight: '400',
   },
}));
