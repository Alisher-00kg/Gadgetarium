import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { styled } from '@mui/material/styles';
import { Icons } from '../../assets';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/swiper-bundle.css';

export const SlidePhoneImage = ({ images = [] }) => {
   const [thumbsSwiper, setThumbsSwiper] = useState({});

   return (
      <div style={{ position: 'relative' }}>
         <Swiper
            style={{ width: '400px' }}
            spaceBetween={10}
            navigation={true}
            // thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
         >
            {images.map((image, index) => (
               <SwiperSlide key={index}>
                  <MainImage src={image} alt={`Slide ${index}`} />
               </SwiperSlide>
            ))}
         </Swiper>

         <StyledSwiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
         >
            {images.map((image, index) => (
               <SwiperSlide key={index}>
                  <Thumbnail src={image} alt={`Thumbnail ${index}`} />
               </SwiperSlide>
            ))}
         </StyledSwiper>
      </div>
   );
};

const MainImage = styled('img')({
   width: '304px',
   height: '364px',
   marginLeft: '50px',
});

const Thumbnail = styled('img')(({ theme, selected }) => ({
   width: '70px',
   height: '70px',
   margin: '5px',
   cursor: 'pointer',
   border: selected
      ? `2px solid ${theme.palette.primary.main}`
      : '2px solid transparent',
}));

const StyledSwiper = styled(Swiper)({
   width: '300px',
   height: '20%',
   boxSizing: 'border-box',
   padding: '10px 0',
});
