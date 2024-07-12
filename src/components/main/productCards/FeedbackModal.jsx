import React, { useState } from 'react';
import { BaseModal } from '../../UI/BaseModal';
import { Rating, styled } from '@mui/material';
import { Input } from '../../UI/Input';
import { useDropzone } from 'react-dropzone';
import DownloadImage from '../../../assets/icons/dowland-image.svg?react';
import { Button } from '../../UI/Button';
import { SuccessfullyModal } from './SuccessfullyModal';
import { postFeedback } from '../../../store/thunks/cardThunks';
import { useDispatch } from 'react-redux';

export const FeedbackModal = ({ gadgetId }) => {
   const [isOpen, setIsOpen] = useState(true);
   const [showText, setShowText] = useState(true);
   const [file, setFile] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState('');
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
   const hanldeCloseModal = () => {
      setIsOpen(!isOpen);
   };

   const handleSubmitFeedback = () => {
      const feedbackData = {
         grade: rating,
         comment: comment,
         images: [URL.createObjectURL(file)],
      };

      dispatch(postFeedback({ feedbackData }));
      setShowModal(!showModal);
   };
   return (
      <div>
         {showModal ? (
            <SuccessfullyModal />
         ) : (
            <BaseModal open={isOpen} onClose={hanldeCloseModal}>
               <Wrapper>
                  <Title>Оставьте свой отзыв</Title>
                  <BlockRating>
                     <p>Оценка</p>
                     <Rating
                        value={rating}
                        onChange={(event, newValue) => setRating(newValue)}
                     />
                  </BlockRating>
                  <Box>
                     <LabelStyle>
                        Ваш комментарий
                        <InputStyle
                           placeholder="Напишите комментарий"
                           value={comment}
                           onChange={e => setComment(e.target.value)}
                        />
                     </LabelStyle>
                     <StyleDropZone {...getRootProps()}>
                        <input {...getInputProps()} />
                        {showText ? (
                           <>
                              <DownloadImage />
                              <p>
                                 <a href="#">Нажмите на ссылку,</a>
                                 чтобы выбрать фотографии или просто перетащите
                                 их сюда
                              </p>
                           </>
                        ) : (
                           <>
                              {file && (
                                 <ImageStyle
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                 />
                              )}
                           </>
                        )}
                     </StyleDropZone>
                     <ButtonStyle
                        variant="contained"
                        onClick={handleSubmitFeedback}
                     >
                        Отправить отзыв
                     </ButtonStyle>
                  </Box>
               </Wrapper>
            </BaseModal>
         )}
      </div>
   );
};

const Title = styled('h3')(() => ({
   fontFamily: 'Ubuntu',
   fontSize: '30px',
   fontWeight: '500',
}));
const BlockRating = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   p: {
      fontFamily: 'Inter',
      fontWeight: '400',
   },
}));
const Wrapper = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '40px',
}));
const LabelStyle = styled('label')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '8px',
   fontFamily: 'Inter',
   fontWeight: '400',
   color: '#384255',
}));
const InputStyle = styled(Input)(() => ({
   '.MuiInputBase-root': {
      height: '150px',
      width: '100%',
      background: '#ffffff',
      fontFamily: 'Inter',
      fontWeight: '400',
      paddingBottom: '100px',
   },
}));

const Box = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '12px',
}));
const StyleDropZone = styled('div')(() => ({
   display: 'flex',
   gap: '15px',
   alignItems: 'center',
   height: '118px',
   border: '1px solid #cdcdcd',
   padding: ' 0px 30px 0px 30px',
   borderRadius: '4px',
   a: {
      textDecoration: 'none',
      fontFamily: 'Inter',
      fontWeight: '400',
      color: '#2C68F5',
   },
   p: {
      fontFamily: 'Inter',
      fontWeight: '400',
      color: '#969696',
      width: '400px',
   },
}));
const ImageStyle = styled('img')(() => ({
   width: '100px',
   height: '100px',
}));
const ButtonStyle = styled(Button)(() => ({
   fontFamily: 'Inter',
   fontWeight: '400',
   textTransform: 'inherit',
}));
