import React, { useState } from 'react';
import { BaseModal } from '../BaseModal';
import { Button } from '../Button';
import { styled } from '@mui/system';
import { Icons } from '../../../assets';
import DropZone from './DropZone';
import { useDispatch, useSelector } from 'react-redux';
import { postBanner } from '../../../store/thunks/bannersthunks';

const ModalBanner = ({ open, onClose }) => {
   const dispatch = useDispatch();
   const { imageLink, isLoading } = useSelector(state => state.banner);

   const [images, setImages] = useState([]);

   const currentImages = images.map(image => {
      return image.preview;
   });

   const handleClose = () => {
      onClose();
   };
   const deleteFile = index => {
      setImages(images.filter((_, i) => i !== index));
   };

   const handleChange = file => {
      setImages(file);
   };

   const handleSubmit = () => {
      dispatch(postBanner({ images: imageLink }));
      onClose();
   };
   return (
      <div>
         <BaseModal open={open} onClose={onClose}>
            <ModalStyledcontained>
               <h2>Загрузить баннер</h2>
               <StyleDropZonediv images={images}>
                  {imageLink.length !== 6 && (
                     <div className="cont">
                        <DropZone setImages={setImages} images={images} />
                     </div>
                  )}
                  {images.map((image, i) => (
                     <ImagesCont index={i} key={i} images={images}>
                        <img src={image.preview} alt={image.name} />
                        <Icons.DeleteChoice onClick={() => deleteFile(i)} />
                     </ImagesCont>
                  ))}
               </StyleDropZonediv>
               <div className="buttondiv">
                  <div>
                     {' '}
                     <Button style={{ width: '200px' }} onClick={handleClose}>
                        отменить
                     </Button>
                     <Button
                        style={{ width: '200px' }}
                        variant={'contained'}
                        onClick={handleSubmit}
                        disabled={isLoading}
                     >
                        загрузить
                     </Button>
                  </div>
               </div>
            </ModalStyledcontained>
         </BaseModal>
      </div>
   );
};

const ModalStyledcontained = styled('div')`
   padding: 20px;
   display: flex;
   flex-direction: column;
   width: 544px;
   text-align: center;
   gap: 20px;

   .buttondiv {
      display: flex;
      gap: 20px;
      margin: 0 auto;
      flex-direction: column;
      justify-content: end;
   }

   .buttondiv div {
      display: flex;
      gap: 20px;
   }

   h2 {
      padding-bottom: 36px;
      font-size: 24px;
      font-weight: 500;
      line-height: 32px;
   }
`;

const StyleDropZonediv = styled('div')`
   border: none;
   max-height: 352px;
   width: fit-content;
   margin: 0 auto;
   display: ${props => (props.images.length === 4 ? 'flex' : 'grid')};
   flex-wrap: wrap;
   grid-template-columns: ${props =>
      props.images.length === 1
         ? 'repeat(2, 1fr)'
         : props.images.length >= 2 && 'repeat(3, 1fr)'};
   grid-column-gap: 0px;
   grid-row-gap: 0px;
   padding: 30px;
   border-radius: 4px;
   background: rgba(144, 156, 181, 0.2);
   gap: 20px;

   .cont {
      grid-area: ${props => (props.images.length === 3 ? '1 / 1 / 2 / 4' : '')};
      margin: auto 0;
      display: flex;
      height: 140px;
      align-items: center;
      justify-content: center;
      width: ${props =>
         props.images.length === 0
            ? '210px'
            : props.images.length === 4 && '130px'};
   }
`;

const ImagesCont = styled('div')`
   text-align: center;
   width: fit-content;
   position: relative;

   img {
      height: 140px;
      width: ${props =>
         props.images.length === 1
            ? '210px'
            : props.images.length > 3 && props.images.length < 5
              ? props.index === 2 || props.index === 3
                 ? '210px'
                 : '130px'
              : props.images.length === 1
                ? '210px'
                : '130px'};
      border-radius: 8px;
      object-fit: fill;
      object-fit: cover;
   }

   svg {
      position: absolute;
      top: 0;
      right: 0;
      background-color: #a2a1a1;
      cursor: pointer;
      padding: 4px;
   }
`;

export default ModalBanner;
