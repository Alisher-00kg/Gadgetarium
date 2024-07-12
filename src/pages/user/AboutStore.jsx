import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ArrowIcon from '../../assets/icons/left-arrow.svg?react';
import { styled } from '@mui/material';

import 'swiper/css';
import { BreadCrumbs } from '../../components/UI/BreadCrumbs';
import { MapKg } from '../../components/UI/MapKg';

const BREADCRUMBS = [
   {
      href: '/',
      label: 'Главная',
   },
   {
      href: '/about-store',
      label: 'О магазине',
   },
];

export const AboutStore = () => {
   const sliderRef = useRef(null);

   const images = [
      'https://newcyprusguide.com/wp-content/uploads/2018/06/north-cyprus-guide-pearl-techno-19.jpg',
      'https://newcyprusguide.com/wp-content/uploads/2018/06/north-cyprus-guide-pearl-techno-09-300x300.jpg',
      'https://newcyprusguide.com/wp-content/uploads/2018/06/north-cyprus-guide-pearl-techno-13-1200x800.jpg',
      'https://cdn.archilovers.com/projects/b_730_6f33be71-d30d-4a04-815d-826ab58fb746.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRThBOCg3BqsvWDBKzdlJ31LRyvMY_MCQzqyCE28AK4RHPagsNRQKZ-4Nwx6lbEGlB97p8&usqp=CAU',
   ];

   const nextSlide = () => {
      if (!sliderRef.current) return;
      sliderRef.current.swiper.slideNext();
   };

   const prevSlide = () => {
      if (!sliderRef.current) return;
      sliderRef.current.swiper.slidePrev();
   };

   return (
      <Container>
         <div
            style={{
               padding: '0 100px',
            }}
         >
            <BreadCrumbs breadcrumbs={BREADCRUMBS} />

            <Title>О магазине</Title>
         </div>

         <SliderContainer>
            <StyledSwiper
               spaceBetween={10}
               ref={sliderRef}
               slidesPerView={3}
               loop
            >
               {images.map(image => (
                  <div
                     key={image}
                     style={{
                        background: '#222',
                     }}
                  >
                     <StyledSwiperSlide>
                        <img
                           src={image}
                           alt="slide photo"
                           width={500}
                           height={400}
                        />
                     </StyledSwiperSlide>
                  </div>
               ))}
            </StyledSwiper>
            <PrevIcon className="prev-arrow" onClick={prevSlide}>
               <ArrowIcon />
            </PrevIcon>
            <NextIcon className="next-arrow" onClick={nextSlide}>
               <ArrowIcon />
            </NextIcon>
         </SliderContainer>

         <SecondContainer>
            <SecondTitle>Магазин Gadgetarium</SecondTitle>
            <UlList>
               <li>
                  слаженная команда людей, любящих спорт и здоровый образ жизни
                  знающих свое дело и ориентирующихся во всех нюансах фитнес
                  оборудования;
               </li>
               <li>
                  широкая номенклатура качественной продукции ведущих мировых
                  брендов с огромным выбором товаров в наличии;
               </li>
               <li>
                  склад запчастей для обеспечения качественного сервиса и
                  бесперебойной работы оборудования;
               </li>
               <li>
                  полный послепродажный сервис с информационной и технической
                  поддержкой;
               </li>
               <li>строгое соблюдение всех обязательств перед партнерами;</li>
               <li>
                  отличные цены и эксклюзивные условия для постоянных партнеров.
               </li>
            </UlList>
         </SecondContainer>

         <SecondContainer>
            <SecondTitle>В чем причина нашего успеха?</SecondTitle>
            <p>
               Non ultricies sollicitudin nisi quisque. Morbi integer quis
               tincidunt vitae penatibus. Feugiat quis tincidunt volutpat
               scelerisque elit fermentum nullam rhoncus adipiscing. Sem tortor
               molestie odio.
            </p>
            <p>
               Adipiscing etiam vitae in semper sed eget nec aliquet aliquam.
               Morbi integer quis tincidunt vitae penatibus. Feugiat quis
               tincidunt volutpat scelerisque elit fermentum nullam rhoncus
               adipiscing. Sem tortor molestie odio.Adipiscing etiam vitae in
               semper sed eget nec aliquet aliquam. Morbi integer quis tincidunt
               vitae penatibus. Feugiat quis tincidunt volutpat scelerisque elit
               fermentum nullam rhoncus adipiscing. Sem tortor molestie odio.
            </p>
         </SecondContainer>

         <ThirdContainer>
            <div>
               <SecondTitle>Мы сегодня – это:</SecondTitle>

               <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet
                  amet est orci volutpat placerat maecenas egestas augue ac.
                  Tortor, sed magnis interdum massa. Id phasellus lectus dui
                  nisl. Adipiscing etiam vitae in semper sed eget nec aliquet
                  aliquam.{' '}
               </p>

               <p>
                  Non ultricies sollicitudin nisi quisque. Morbi integer quis
                  tincidunt vitae penatibus. Feugiat quis tincidunt volutpat
                  scelerisque elit fermentum nullam rhoncus adipiscing. Sem
                  tortor molestie odio. Morbi integer quis tincidunt vitae
                  penatibus. Feugiat quis tincidunt volutpat scelerisque elit
                  fermentum nullam rhoncus adipiscing. Sem tortor molestie odio.
               </p>
            </div>
            <div>
               <MapKg />
            </div>
         </ThirdContainer>
      </Container>
   );
};

const Container = styled('div')(() => ({
   position: 'relative',
}));

const Title = styled('p')(() => ({
   fontSize: '30px',
   fontWeight: 700,
   padding: '30px 0 60px',
}));

const SliderContainer = styled('div')(() => ({
   position: 'relative',
}));

const SecondContainer = styled('div')(() => ({
   width: '50%',
   padding: '60px 0 0 100px',
}));

const ThirdContainer = styled('div')(() => ({
   padding: '60px 100px 0',
   marginBottom: '120px',
   display: 'flex',
}));

const SecondTitle = styled('p')(() => ({
   fontSize: '20px',
   fontWeight: 600,
   marginBottom: '24px',
}));

const UlList = styled('ul')(() => ({
   '& li': {
      listStyle: 'initial',
   },
}));

const PrevIcon = styled('div')(() => ({
   position: 'absolute',
   zIndex: 100,
   top: '40%',
   left: '25%',
   cursor: 'pointer',
}));

const NextIcon = styled('div')(() => ({
   position: 'absolute',
   zIndex: 100,
   rotate: '180deg',
   right: '25%',
   top: '40%',
   cursor: 'pointer',
}));

const StyledSwiper = styled(Swiper)(() => ({
   height: '100%',
   zIndex: 10,
}));

const StyledSwiperSlide = styled(SwiperSlide)(() => ({
   width: '900px',
   opacity: 0.5,

   '&.swiper-slide-next': {
      opacity: 1,
   },
}));
