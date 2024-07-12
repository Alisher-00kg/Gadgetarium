import { useState } from 'react';
import { SlidePhoneImage } from './SliderPhoneImage';

export const SliderPhoneImageItem = ({ images }) => {
   const [selectedImage, setSelectedImage] = useState(null);

   const handleClick = image => {
      setSelectedImage(image);
   };

   return (
      <div>
         <div>
            <h1>{selectedImage}</h1>
            <SlidePhoneImage images={images} onClick={handleClick} />
         </div>
      </div>
   );
};
