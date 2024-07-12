import React, { useState } from 'react';
import { BaseModal } from './BaseModal';
import { Button } from '@mui/material';

const DeleteModal = ({ open, onClose, onDelete }) => {
   return (
      <BaseModal open={open} onClose={onClose}>
         <h1>Вы точно хотите удалить?</h1>
         <Button onClick={onDelete}>Да</Button>
         <Button onClose={onClose}>Нет</Button>
      </BaseModal>
   );
};

export default DeleteModal;
