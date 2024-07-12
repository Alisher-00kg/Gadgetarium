import { styled } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBanners } from '../../store/thunks/bannersthunks';
export const Slider = () => {
   const dispatch = useDispatch();
   const { images } = useSelector(state => state.banner);

   useEffect(() => {
      dispatch(getBanners());
   }, []);

   return (
      <SwiperContainer>
         <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{
               el: '.swiper-pagination',
               clickable: true,
               type: 'bullets',
            }}
            autoplay={{
               delay: 2500,
               disableOnInteraction: true,
            }}
            loop={true}
         >
            {images.map(slide =>
               slide.images.length > 0 ? (
                  <SwiperSlider key={slide.id}>
                     <StyledImage src={slide?.images[0]} alt="" />
                  </SwiperSlider>
               ) : null,
            )}
         </Swiper>
         <PaginationContainer className="swiper-pagination"></PaginationContainer>
      </SwiperContainer>
   );
};
const PaginationContainer = styled('div')({
   '.swiper-pagination-bullet-active': {
      width: '14px',
      height: '14px',
   },
   '.swiper-pagination-bullet': {
      backgroundColor: '#CB11AB',
   },
});

const SwiperContainer = styled('div')({
   '.swiper-pagination': {
      position: 'relative',
      top: '36px',
   },
});
const SwiperSlider = styled(SwiperSlide)({});

const StyledImage = styled('img')(() => ({
   width: '100%',
   objectFit: 'cover',
   height: '500px',
}));
