import { styled } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Icons } from '../assets';

export const MyDropZone = () => {
   const [imageUrl, setImageUrl] = useState('');

   const onDrop = useCallback(acceptedFiles => {
      const file = acceptedFiles[0];
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
   }, []);

   const { getRootProps, getInputProps } = useDropzone({ onDrop });

   return (
      <Styleddiv>
         {imageUrl ? (
            <div style={{ width: '150px' }}>
               <img
                  src={imageUrl}
                  alt="Uploaded"
                  style={{ marginTop: '20px', maxWidth: '100%' }}
               />
            </div>
         ) : (
            <div
               style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}
            >
               <Stylediv {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Icons.ImageDowland />
               </Stylediv>
               <h6>Нажмите для добавления Фотографии</h6>
            </div>
         )}
      </Styleddiv>
   );
};
const Styleddiv = styled('div')`
   img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-left: 28px;
   }
   h6 {
      width: 150px;
      height: 32px;
      color: rgb(145, 150, 158);
      font-family: Inter;
      font-size: 12px;
      font-weight: 500;
      line-height: 130%;
      text-align: center;
   }
`;
const Stylediv = styled('div')`
   margin-left: 28px;
   width: 90px;
   height: 90px;
   border-radius: 50%;
   background: rgba(213, 213, 213, 0.5);
   cursor: pointer;
   svg {
      position: relative;
      top: 30px;
      left: 30px;
   }
`;
