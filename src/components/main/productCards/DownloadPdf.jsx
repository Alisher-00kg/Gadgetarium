import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import PdfIcon from '../../../assets/images/pdf-icon.svg?react';
import { colors, styled } from '@mui/material';

export const DownloadPdf = () => {
   const onDrop = useCallback(acceptedFiles => {
      // Do something with the files
   }, []);
   const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: ['.pdf', 'application/pdf'],
   });
   return (
      <div>
         <BlockPdf {...getRootProps()}>
            <input {...getInputProps()} />
            <PdfIcon />
            <p>Скачать документ.pdf</p>
         </BlockPdf>
      </div>
   );
};
const BlockPdf = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '15px',
   p: {
      fontFamily: 'Inter',
      fontWeight: '400',
      color: '#384255',
   },
}));
