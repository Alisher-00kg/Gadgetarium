import { styled } from '@mui/material';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import DowlandImage from '../../../assets/images/addimage.svg?react';
import { useDispatch } from 'react-redux';
import { postFile } from '../../../store/thunks/bannersthunks';

const DropZone = ({ setImages, images }) => {
   const dispatch = useDispatch();

   const onDrop = useCallback(
      acceptedFiles => {
         const newImages = acceptedFiles.map(file => {
            return Object.assign(file, {
               preview: URL.createObjectURL(file),
            });
         });
         setImages(prevState => [...prevState, ...newImages]);

         const file = acceptedFiles[0];
         const formData = new FormData();
         formData.append('file', file);

         dispatch(postFile(formData));
      },
      [setImages],
   );

   const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: 'image/*',
      multiple: true,
   });

   return (
      <StyleDiv {...getRootProps()} images={images}>
         <input {...getInputProps()} />
         <DowlandImage />
         <p>
            {images.length === 0
               ? 'Нажмите для добавления фотографии'
               : 'добавить фото'}
         </p>
      </StyleDiv>
   );
};
const StyleDiv = styled('div')`
   cursor: pointer;
   p {
      font-size: 14px;
   }
   svg {
      width: ${props => (props.images.length === 0 ? '20px' : '40px')};
      height: ${props => (props.images.length === 0 ? '20px' : '40px')};
      text-align: center;
   }
`;
export default DropZone;
