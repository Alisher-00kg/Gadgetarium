import { useState } from 'react';
import { BaseModal } from '../../../UI/BaseModal';
import { Input } from '../../../UI/Input';
import { Button } from '../../../UI/Button';
import { styled } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import DownloadImage from '../../../../assets/images/addimage.svg?react';
import { useDispatch } from 'react-redux';
import { postFile } from '../../../../store/thunks/brandThunk';

export const AddBrandModal = ({ onClose }) => {
   const [showText, setShowText] = useState(true);
   const [file, setFile] = useState(null);
   const [brandName, setBrandName] = useState('');
   const dispatch = useDispatch();

   const onDrop = acceptedFiles => {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setShowText(false);
   };

   const { getRootProps, getInputProps } = useDropzone({
      accept: 'image/*',
      onDrop,
   });

   const handleSubmitModal = () => {
      if (file && brandName) {
         const formData = new FormData();
         formData.append('file', file);

         dispatch(postFile({ formData, brandName }));
         onClose();
      } else {
         console.error('Файл или название бренда не выбраны');
      }
   };

   return (
      <BaseModal open={true} onClose={onClose}>
         <Box>
            <Wrapper>
               <p>Добавление бренда</p>
               <ContainerPhotos {...getRootProps()}>
                  <input {...getInputProps()} />

                  {showText ? (
                     <div>
                        <DownloadImage />
                        <p>Нажмите для добавления фотографии </p>
                     </div>
                  ) : (
                     <div>
                        <ImageStyle
                           src={URL.createObjectURL(file)}
                           alt={file.name}
                        />
                     </div>
                  )}
               </ContainerPhotos>
            </Wrapper>

            <Container>
               <BlockInput>
                  <label htmlFor="">Название бренда</label>
                  <InputStyle
                     placeholder="Введите название бренда"
                     value={brandName}
                     onChange={e => setBrandName(e.target.value)}
                  />
               </BlockInput>

               <ButtonStyle>
                  <FitstButton onClick={onClose}>Отменить</FitstButton>
                  <SecondButton variant="contained" onClick={handleSubmitModal}>
                     Отправить
                  </SecondButton>
               </ButtonStyle>
            </Container>
         </Box>
      </BaseModal>
   );
};

const Box = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '32px',
   padding: '20px 0',
}));
const BlockInput = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '6px',
   label: {
      fontFamily: 'Inter',
      fontWeight: '400',
      fontSize: '14px',
      color: '#384255',
   },
}));
const InputStyle = styled(Input)(() => ({
   width: '480px',
   height: '35px',
   '.MuiInputBase-input': {
      fontFamily: 'Inter',
      fontWeight: '300',
   },
}));
const ButtonStyle = styled('div')(() => ({
   display: 'flex',
   gap: '20px',
}));
const FitstButton = styled(Button)(() => ({
   width: '230px',
   fontFamily: 'Inter',
   fontWeight: '500',
   fontSize: '14px',
}));
const SecondButton = styled(Button)(() => ({
   width: '230px',
   fontFamily: 'Inter',
   fontWeight: '500',
   fontSize: '14px',
   color: '#ffffff',
   borderRadius: '4px',
}));
const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '32px',
}));
const ImageStyle = styled('img')(() => ({
   width: '217px',
   height: '217px',
}));
const ContainerPhotos = styled('div')(() => ({
   width: '217px',
   height: '217px',
   background: ' rgba(144, 156, 181, 0.2)',
   borderRadius: '4px',
   fontFamily: 'Inter',
   fontWeight: '400',
   fontSize: '12px',
   color: '#91969E',
   textAlign: 'center',

   div: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px',
   },
   svg: {
      marginTop: '70px',
   },
}));
const Wrapper = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '36px',
   alignItems: 'center',
}));
