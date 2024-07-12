import { styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import DownloadImage from '../../../../assets/images/addimage.svg?react';
import { Button } from '../../../UI/Button';
import { icons } from '../../../../utils/constants/icons';

export const AddPhotos = ({
   onPhotosChange,
   handleProductsSubmit,
   resetPhotos,
   initialPhotos,
}) => {
   const [files, setFiles] = useState(initialPhotos || []);
   const [error, setError] = useState('');

   useEffect(() => {
      if (resetPhotos) {
         setFiles([]);
      }
   }, [resetPhotos]);

   useEffect(() => {
      setFiles(initialPhotos || []);
   }, [initialPhotos]);

   const { getRootProps, getInputProps } = useDropzone({
      accept: 'image/*',
      onDrop: acceptedFiles => {
         const newFiles = [];
         let errorFound = false;

         acceptedFiles.forEach(file => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
               newFiles.push(file);

               if (!errorFound) {
                  setFiles(prevFiles => [...prevFiles, ...newFiles]);
                  onPhotosChange([...files, ...newFiles]);
               }
            };
         });
      },
   });

   useEffect(() => {
      return () => files.forEach(file => URL.revokeObjectURL(file.preview));
   }, [files]);

   return (
      <Wrapper>
         <div>
            <Description>Добавьте фото</Description>
            <Container {...getRootProps()}>
               <input {...getInputProps()} />
               <Block>
                  <DownloadImage />
                  <div>
                     <Title>Нажмите или перетащите сюда файл </Title>
                     <Lists>
                        <li>Минимальное разрешение - 450x600</li>
                        <li>максимальное количество - 10 фото</li>
                     </Lists>
                  </div>
               </Block>
            </Container>
            {error && <p style={{ color: 'red' }}>{error}</p>}
         </div>
         <StyledButton variant="contained" onClick={handleProductsSubmit}>
            Далее
         </StyledButton>
         <ImageBlock>
            {icons.map((icon, index) => (
               <div key={icon.id}>
                  {files[index] ? (
                     <ImageStyle
                        src={URL.createObjectURL(files[index])}
                        alt={files[index].name}
                     />
                  ) : (
                     <BoxBlock>
                        <div>{icon.svg}</div>
                     </BoxBlock>
                  )}
               </div>
            ))}
         </ImageBlock>
      </Wrapper>
   );
};
const BoxBlock = styled('div')(() => ({
   width: '200px',
   height: '200px',
   border: '1px dashed #cdcdcd',
   borderRadius: '6px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
}));

const Wrapper = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '28px',
}));
const Description = styled('p')(() => ({
   fontSize: '14px',
   fontFamily: 'Inter',
   fontWeight: '400',
   paddingBottom: '6px',
}));
const Container = styled('div')(() => ({
   fontWeight: '400',
   fontFamily: 'Inter',
   width: '396px',
   height: '168px',
   border: '1px dashed #292929',
   borderRadius: '4px',
   backgroundColor: '#D2D4D8',
   padding: '30px 75px 25px 75px',
}));
const Title = styled('p')(() => ({
   fontSize: '12px',
}));
const Lists = styled('ul')(() => ({
   paddingLeft: '22px',
   li: {
      fontSize: '12px',
      listStyle: 'initial',
   },
}));
const Block = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: '24px',
   div: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
   },
}));

const StyledButton = styled(Button)(() => ({
   color: '#ffffff',
   fontFamily: 'Inter',
   fontWeight: '600',
   width: '99px',
   height: '43px',
   position: 'relative',
   top: 0,
   left: '296px',
}));

const ImageStyle = styled('img')(() => ({
   width: '200px',
   height: '200px',
   borderRadius: '6px',
}));
const ImageBlock = styled('div')(() => ({
   display: 'flex',
   flexWrap: 'wrap',
   gap: '30px',
   padding: '25px 40px',
   width: '100%',
   border: '1px solid #CDCDCD',
   borderRadius: '6px',
}));
