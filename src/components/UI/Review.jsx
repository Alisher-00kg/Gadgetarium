import React from 'react';
import { Rating, styled } from '@mui/material';
import Vecto from '../../assets/icons/vecto-group.svg?react';
import Delete from '../../assets/icons/delete-сhoice.svg?react';
import Down from '../../assets/icons/arrow-down.svg?react';
import Top from '../../assets/icons/arrow-top.svg?react';
import { useState } from 'react';
import Comment from './Comment';
import { Input } from './Input';

const reviewsData = [
   {
      id: 1,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2b_NgH7yW-AtPQXxLgweUKC4zeien2WjZVA&usqp=CAU',
      goods: 'Asus',
      model: 'Model',
      number: ' Art. 1212121212',
      comment:
         'Erlan krasavchik! Erlan krasavchik! Erlan krasavchik! Erlan krasavchik! Erlan krasavchik! Erlan krasavchik! Erlan krasavchik! Erlan krasavchik! Erlan krasavchik! Erlan krasavchik! Erlan krasavchik! ',
      date: new Date(),
      user: 'Adyl Bakytov',
      email: 'Adyl@mail.com',
      expanded: false,
   },
   {
      id: 2,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2b_NgH7yW-AtPQXxLgweUKC4zeien2WjZVA&usqp=CAU',
      goods: 'Asus',
      model: 'Model',
      number: ' Art. 1212121212',
      comment:
         'Erlan krasavchik! Erlan krasavchik! Erlan krasavchik! Erlan krasavchik! Erlan krasavchik! Erlan krasavchik! Erlan krasavchik! Erlan krasavchik! Erlan krasavchik! Erlan krasavchik! Erlan krasavchik! ',
      date: new Date(),
      user: 'Adyl Bakytov',
      email: 'Adyl@mail.com',
      expanded: false,
   },
];

export const Review = () => {
   const [show, setShow] = useState(false);
   const [comment, setComment] = useState();
   const [isFullReviewOpen, setIsFullReviewOpen] = useState(false);
   const [fullReviewOpen, setFullReviewOpen] = useState({});

   const handleClick = event => {
      const id = event.target.getAttribute('data-id');
      const reviewId = parseInt(id);
      if (!fullReviewOpen[id]) {
         setFullReviewOpen(prevState => ({
            ...prevState,
            [id]: true,
         }));
      }

      if (reviewsData.some(review => review.id === reviewId)) {
         const review = reviewsData.find(review => review.id === reviewId);

         if (event.target.id.startsWith('down')) {
            setShow(true);
            setIsFullReviewOpen(true);
         } else if (event.target.id.startsWith('top')) {
            setShow(false);
         }
      }
   };

   const handleChange = (e, index) => {
      const newReviewsData = [...reviewsData];
      newReviewsData[index].value = e.target.value;
      reviewsData(newReviewsData);
   };

   return (
      <Container>
         <WrapperStyle>
            <li className="id">id </li>
            <li className="photo"> Фото</li>
            <li className="goods">Название товара</li>
            <li className="comment">Комментарий</li>
            <li className="rating">Все оценки(1775)</li>
            <li className="user">Пользователь</li>
         </WrapperStyle>
         <hr />
         {reviewsData.map((review, index) => (
            <div key={review.id}>
               <Box>
                  <div className="first-box">
                     <span>{review.id}</span>
                     <img src={review.image} width="70px" className="galaxy" />
                  </div>
                  <div className="second-box">
                     <p>{review.goods}</p>
                     <p className="box-silver">{review.model}</p>
                     <span className="box-silver">{review.number}</span>
                  </div>
                  <div className="third-box">
                     <div
                        className={`review ${fullReviewOpen[review.id] ? 'expanded' : ''}`}
                     >
                        <p>{review.comment}</p>
                        <Comment />
                     </div>
                  </div>
                  <Rating
                     className="rating"
                     value={review.rating}
                     size="small"
                  />
                  <div className="userPerson">
                     <Vecto />
                     <div>
                        <p>{review.user}</p>
                        <span className="box-silver">{review.email}</span>
                     </div>
                  </div>
                  <div
                     className="twin"
                     onClick={e => handleClick(e, review.id)}
                  >
                     <Delete />
                     {show && fullReviewOpen[review.id] ? (
                        <Top id={`top-${review.id}`} data-id={review.id} />
                     ) : (
                        <Down id={`down-${review.id}`} data-id={review.id} />
                     )}
                  </div>
               </Box>
               {show && fullReviewOpen[review.id] && (
                  <Goods>
                     <PhotoContainer>
                        <div className="picture">
                           <img src={review.image} width="130px" />
                           <img src={review.image} width="130px" />
                        </div>
                     </PhotoContainer>
                     <ContainerDescription>
                        <div className="container">
                           <label htmlFor="comment">
                              Ответить на комментарий
                           </label>
                           <InputStyle
                              className="text-area"
                              id="comment"
                              placeholder="Напишите комментарий"
                              key={index}
                              value={review.value}
                              onChange={e => handleChange(e, index)}
                              // onChange={e => setComment(e.target.value)}
                           />
                        </div>
                        <button className="button-comment">Ответить</button>
                     </ContainerDescription>
                  </Goods>
               )}
            </div>
         ))}
      </Container>
   );
};
const Container = styled('div')(() => ({
   width: '90%',
   height: '80vh',
   marginTop: '8px',
   marginLeft: '85px',
   fontWeight: '600',
   fontSize: '14px',
   lineHeight: '20px',
   color: '#384255',
   svg: {
      cursor: 'pointer',
   },
}));
const InputStyle = styled(Input)(() => ({
   '.MuiInputBase-root': {
      width: '494px',
      height: '128px',
      margin: '0px',
      padding: '0px',
      borderRadius: '4px',
      border: '1px solid #cdcdcd',
   },
}));
const WrapperStyle = styled('ul')(() => ({
   display: 'flex',
   flexDirection: 'row',
   alignItems: 'center',
   '& .photo': {
      marginLeft: '1.9rem',
   },
   '& .goods': {
      marginLeft: '2.5rem',
   },
   '& .comment': {
      marginLeft: '7rem',
   },
   '& .rating': {
      marginLeft: '26rem',
   },
   '& .user': {
      marginLeft: '10rem',
   },
}));

const Box = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'row',
   marginTop: '10px',

   '& .first-box': {
      display: 'flex',
      alignItems: 'center',
      '& .galaxy': {
         marginLeft: '0.8rem',
      },
   },
   '& .second-box': {
      marginLeft: '1.9rem',
   },
   '& .third-box': {
      marginLeft: '7.7rem',
   },
   '& .rating': {
      marginLeft: '4rem',
   },
   '& .userPerson': {
      marginLeft: '12rem',
      display: 'flex',
      gap: '8px',
   },
   '& .box-silver': {
      color: '#909CB5',
   },
   '& .twin': {
      marginBottom: '15px',
      marginLeft: '2rem',
      display: 'flex',
      gap: '10px',
   },
   '& .review': {
      width: '449px',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: '2',
      overflow: 'hidden',
   },
   '& .expanded': {
      color: '#2E2C34',
      fontWeight: '300',
      WebkitLineClamp: 'unset',
   },
}));
const Goods = styled('div')(() => ({
   width: '100%',
   display: 'flex',
   justifyContent: 'flex-end',
   alignItems: 'center',
   gap: '40px',
}));

const PhotoContainer = styled('div')(() => ({
   '& .picture': {
      display: 'flex',
      flexDirection: 'row',
      gap: '10px',
   },
}));

const ContainerDescription = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '0.38rem',
   fontSize: '1rem',
   marginTop: '3rem',
   '& .container': {
      display: 'flex',
      flexDirection: 'column',
   },
   '& .button-comment': {
      width: '222px',
      height: '43px',
      top: '499px',
      marginLeft: '270px',
      borderRadius: '4px',
      padding: '12px, 64px, 12px, 64px',
      gap: '10px',
      border: 'none',
      background: '#CB11AB',
      color: 'white',
   },
}));
