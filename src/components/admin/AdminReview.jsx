import React, { useEffect } from 'react';
import { Rating, Tab, Tabs, styled } from '@mui/material';
import Vecto from '../../assets/icons/vecto-group.svg?react';
import Delete from '../../assets/icons/delete-сhoice.svg?react';
import Down from '../../assets/icons/arrow-down.svg?react';
import Top from '../../assets/icons/arrow-top.svg?react';
import { useState } from 'react';

import { Input } from '../UI/Input';

import { useDispatch, useSelector } from 'react-redux';

import { InfoGraphics } from '../UI/InfoGraphics';
import {
   adminFeedbackDeleteThunks,
   adminFeedbackReplayThunks,
   adminFeedbackThunks,
   editFeedback,
} from '../../store/thunks/adminfeedback';

export const Review = () => {
   const [show, setShow] = useState(false);

   const [isFullReviewOpen, setIsFullReviewOpen] = useState(false);
   const [fullReviewOpen, setFullReviewOpen] = useState({});
   const [adminResponse, setAdminResponse] = useState({});
   const { feedback } = useSelector(state => state.feedback);
   const [selectedTab, setSelectedTab] = useState('ALL');

   const handleTabChange = tab => {
      setSelectedTab(tab);
   };

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(adminFeedbackThunks({ feedbackType: selectedTab }));
   }, [dispatch, selectedTab]);

   const handleClick = event => {
      const id = event.target.getAttribute('data-id');
      const reviewId = parseInt(id);

      if (
         feedback.feedbackResponseList?.some(review => review.id === reviewId)
      ) {
         const review = feedback.feedbackResponseList?.find(
            review => review.id === reviewId,
         );

         if (event.target.id.startsWith('down')) {
            setShow(true);
            setFullReviewOpen(prevState => ({
               ...prevState,
               [id]: true,
            }));
         } else if (event.target.id.startsWith('top')) {
            setShow(false);
            setFullReviewOpen(prevState => ({
               ...prevState,
               [id]: false,
            }));
         }
      }
   };

   const handleAdminResponseChange = (event, id) => {
      setAdminResponse(prevState => ({
         ...prevState,
         [id]: event.target.value,
      }));
   };

   const handleAdminResponseSubmit = id => {
      dispatch(
         adminFeedbackReplayThunks({ id, responseAdmin: adminResponse[id] }),
      );
   };
   const handleAdminResponseEdit = id => {
      dispatch(editFeedback({ id, responseAdmin: adminResponse[id] }));
   };

   const handleDelete = id => {
      dispatch(adminFeedbackDeleteThunks({ id }));
   };

   return (
      <Container>
         <div>
            <TabsContainer>
               <Tabs>
                  <AllRewievs
                     label="Все отзывы"
                     sx={{ marginRight: '12px' }}
                     onClick={() => handleTabChange('ALL')}
                     active={selectedTab === 'ALL'}
                  />
                  <Unanswered
                     label="Неотвеченные "
                     sx={{ marginRight: '12px' }}
                     active={selectedTab === 'UNANSWERED'}
                     onClick={() => handleTabChange('UNANSWERED')}
                  />
                  <Answered
                     label="Отвеченные"
                     sx={{ marginRight: '12px' }}
                     active={selectedTab === 'ANSWERED'}
                     onClick={() => handleTabChange('ANSWERED')}
                  />
               </Tabs>
            </TabsContainer>
            <ContainerLine>
               <IdNameRewievs>
                  <p>ID</p>
                  <p>Фото</p>
                  <p>Название товара</p>
                  <p>Комментарий</p>
               </IdNameRewievs>
               <AllRewievsUser>
                  <div>
                     <p>Все оценки ({feedback?.totalRatings})</p>
                  </div>
                  <div>Пользователь</div>
               </AllRewievsUser>
            </ContainerLine>
            {feedback?.feedbackResponseList?.map((review, index) => (
               <div key={review.id}>
                  <Box>
                     <div className="first-box">
                        <span>{review.id}</span>
                        <img
                           src={review.gadgetImage}
                           width="70px"
                           className="galaxy"
                        />
                     </div>
                     <div className="second-box" style={{ width: '200px' }}>
                        <p>{review.nameOfGadget}</p>
                        <p className="box-silver">Арт.{review.article}</p>
                     </div>
                     <div style={{ width: '220px' }}>
                        <div
                           className={`review ${fullReviewOpen[review.id] ? 'expanded' : ''}`}
                        >
                           <div>{review.comment}</div>
                           <div>
                              {new Date(review.dateAndTime).toLocaleString()}
                           </div>
                        </div>
                     </div>
                     <div style={{ paddingRight: '30px' }}>
                        <Rating
                           className="rating"
                           value={review.rating}
                           size="small"
                           readOnly
                        />
                     </div>

                     <div className="userPerson">
                        <Vecto />
                        <div style={{ width: '150px' }}>
                           <p>{review.fullNameUser}</p>
                           <span className="box-silver">
                              {review.emailUser}
                           </span>
                        </div>
                     </div>
                     <div
                        className="twin"
                        onClick={e => handleClick(e, review.id)}
                     >
                        <Delete onClick={() => handleDelete(review.id)} />
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
                              <img src={review.gadgetImage} width="130px" />
                              <img src={review.gadgetImage} width="130px" />
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
                                 value={adminResponse[review.id]}
                                 defaultValue={review.responseAdmin}
                                 onChange={e =>
                                    handleAdminResponseChange(e, review.id)
                                 }
                              />
                           </div>
                           {review.responseAdmin ? (
                              <button
                                 className="button-comment"
                                 onClick={() =>
                                    handleAdminResponseEdit(review.id)
                                 }
                              >
                                 Редактировать
                              </button>
                           ) : (
                              <button
                                 className="button-comment"
                                 onClick={() =>
                                    handleAdminResponseSubmit(review.id)
                                 }
                              >
                                 Ответить
                              </button>
                           )}
                        </ContainerDescription>
                     </Goods>
                  )}
               </div>
            ))}
         </div>
         <InfograficsStyle>
            <InfoGraphics />
         </InfograficsStyle>
      </Container>
   );
};
const Container = styled('div')(() => ({
   display: 'flex',
   gap: '30px',

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
const InfograficsStyle = styled('div')(() => ({
   padding: '48px 0 0 30px',
}));
const ContainerLine = styled('div')(() => ({
   display: 'flex',
   width: '1000px',
   gap: '100px',
   borderBottom: '1px solid rgb(205, 205, 205)',
   paddingBottom: '12px',
}));

const AllRewievsUser = styled('div')(() => ({
   gap: '88px',
   display: 'flex',
}));
const InputStyle = styled(Input)(() => ({
   '.MuiInputBase-root': {
      width: '400px',
      height: '128px',
      paddingBottom: '89px',
      //   margin: '0px',
      //   padding: '0px',
      borderRadius: '4px',
      border: '1px solid #cdcdcd',
   },
}));
const IdNameRewievs = styled('div')(() => ({
   display: 'flex',
   gap: '70px',
}));

const Box = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'row',
   marginTop: '10px',

   '& .first-box': {
      display: 'flex',
      alignItems: 'center',
      gap: '30px',
      '& .galaxy': {
         marginLeft: '0.8rem',
      },
   },
   '& .second-box': {
      marginLeft: '1.9rem',
   },

   '& .userPerson': {
      display: 'flex',
      gap: '20px',
   },
   '& .box-silver': {
      color: '#909CB5',
   },
   '& .twin': {
      marginBottom: '15px',
      marginLeft: '2rem',
      display: 'flex',
      gap: '20px',
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
   //    justifyContent: 'flex-end',
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
   paddingLeft: '300px',
   //    marginTop: '3rem',
   '& .container': {
      display: 'flex',
      flexDirection: 'column',
   },
   '& .button-comment': {
      width: '222px',
      height: '43px',
      top: '499px',
      marginLeft: '178px',
      borderRadius: '4px',
      padding: '12px, 64px, 12px, 64px',
      gap: '10px',
      border: 'none',
      background: '#CB11AB',
      color: 'white',
   },
}));
const TabsContainer = styled('div')(() => ({
   padding: '48px 0 40px 0',
}));

const AllRewievs = styled(Tab)(({ active }) => ({
   border: 'none',
   background: active ? 'rgb(203, 17, 171)' : 'rgb(224, 226, 231)',
   color: active ? 'rgb(255, 255, 255)' : 'rgb(56, 66, 85)',
   cursor: 'pointer',
   borderRadius: '4px',
   width: '135px',
   height: '36px',
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '600',
   lineHeight: '19px',
   textTransform: 'inherit',
   '&.Mui-selected': {
      backgroundColor: ' rgb(56, 66, 85)',
      color: 'white',
   },
}));

const Unanswered = styled(Tab)(({ active }) => ({
   background: active ? 'rgb(203, 17, 171)' : 'rgb(224, 226, 231)',
   color: active ? 'rgb(255, 255, 255)' : 'rgb(56, 66, 85)',
   width: '184px',
   height: '36px',
   borderRadius: '4px',
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '600',
   lineHeight: '19px',
   textTransform: 'inherit',

   '&.Mui-selected': {
      backgroundColor: ' rgb(56, 66, 85)',
      color: 'white',
   },
}));
const Answered = styled(Tab)(({ active }) => ({
   background: active ? 'rgb(203, 17, 171)' : 'rgb(224, 226, 231)',
   color: active ? 'rgb(255, 255, 255)' : 'rgb(56, 66, 85)',
   width: '140px',
   height: '36px',
   borderRadius: '4px',
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '600',
   lineHeight: '19px',
   textTransform: 'inherit',
   '&.Mui-selected': {
      backgroundColor: ' rgb(56, 66, 85)',
      color: 'white',
   },
}));
