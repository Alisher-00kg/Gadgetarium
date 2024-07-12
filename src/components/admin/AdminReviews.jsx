import { Avatar, Rating, Stack, TextField, styled } from '@mui/material';
import { Button } from '../UI/Button';
import { useState } from 'react';
import { BaseModal } from '../UI/BaseModal';
import PaginationFeedbacks from '../UI/PaginationFeedbacks';
import { useDispatch, useSelector } from 'react-redux';
import { editFeedback, postReview } from '../../store/thunks/cardThunks';
import { useParams } from 'react-router';

const AdminReviews = ({ reviews }) => {
   const dispatch = useDispatch();
   const role = useSelector(state => state.auth.role);
   const { productId } = useParams();

   const [selectedReviewText, setSelectedReviewText] = useState('');
   const [currentPage, setCurrentPage] = useState(1);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [modalTitle, setModalTitle] = useState('');
   const [buttonText, setButtonText] = useState('');
   const [userId, setUserId] = useState(null);
   const [oldData, setOldData] = useState({});

   const reviewsPerPage = 3;

   const indexOfLastReview = currentPage * reviewsPerPage;
   const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
   const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

   const paginate = pageNumber => {
      setCurrentPage(pageNumber);
   };

   const openModal = (title, button, review) => {
      setIsModalOpen(true);
      setModalTitle(title);
      setButtonText(button);
      setSelectedReviewText(review.responseAdmin);
      setUserId(review.id);
      setOldData(review);
   };

   const closeModal = () => {
      setIsModalOpen(false);
   };

   const submitHandler = () => {
      if (oldData.responseAdmin) {
         dispatch(
            editFeedback({
               id: oldData.id,
               responseAdmin: selectedReviewText,
               productId,
            }),
         );
      } else {
         dispatch(
            postReview({
               gadgetId: userId,
               adminText: selectedReviewText,
               productId,
            }),
         );
      }

      setIsModalOpen(false);
   };

   console.log(reviews);

   return (
      <WrapperStyle>
         <h1>Отзывы</h1>
         {currentReviews.map((review, index) => (
            <StyleContainer key={review.id}>
               <Avatar>
                  <img src={review.image} alt="щ" />
               </Avatar>

               <BigBoxStyle>
                  <h2>{review.fullName}</h2>
                  <p>{review.dateTime}</p>
                  <StyleStarsBox>
                     <h2>Оценка</h2>
                     <StyledRating
                        readOnly
                        value={review.rating}
                        precision={0.5}
                     />
                  </StyleStarsBox>
                  <h3>{review.description}</h3>
                  {review.responseAdmin ? (
                     <StyleAnswer>
                        {review.responseAdmin}
                        <p>{review.text}</p>
                     </StyleAnswer>
                  ) : null}

                  {role === 'ADMIN' ? (
                     <BtnStyleAdmin>
                        {review.responseAdmin ? (
                           <div>
                              <MuiButtonStyle
                                 onClick={() =>
                                    openModal(
                                       'Редактировать комментарий',
                                       'Сохранить',
                                       review,
                                    )
                                 }
                              >
                                 Редактировать
                              </MuiButtonStyle>
                           </div>
                        ) : (
                           <div>
                              <MuiButtonStyle
                                 onClick={() =>
                                    openModal(
                                       'Ответ на комментарий',
                                       'Добавить',
                                       review,
                                    )
                                 }
                              >
                                 Ответить
                              </MuiButtonStyle>
                           </div>
                        )}
                     </BtnStyleAdmin>
                  ) : null}
                  <Line />
               </BigBoxStyle>
            </StyleContainer>
         ))}
         <Stack spacing={2}>
            {role === 'USER' ? null : (
               <PaginationFeedbacks
                  reviewsPerPage={reviewsPerPage}
                  totalReviews={reviews.length}
                  paginate={paginate}
               />
            )}
         </Stack>
         <ModalStyle open={isModalOpen} onClose={closeModal}>
            <ContainerComent>
               <TitleStyle>
                  <h2>{modalTitle}</h2>
               </TitleStyle>
               <InputfModal
                  id="outlined-multiline-static"
                  type="text"
                  multiline
                  rows={4}
                  defaultValue={selectedReviewText}
                  onChange={e => setSelectedReviewText(e.target.value)}
               />
            </ContainerComent>

            <BtnModalContainer>
               <ModalButtun onClick={closeModal}>Отменить</ModalButtun>
               <ModalButtun variant="contained" onClick={submitHandler}>
                  {buttonText}
               </ModalButtun>
            </BtnModalContainer>
         </ModalStyle>
      </WrapperStyle>
   );
};
const WrapperStyle = styled('div')`
   width: 887px;
   height: 892px;
   display: flex;
   flex-direction: column;
   h1 {
      color: rgb(26, 26, 37);
      font-family: 'Ubuntu';
      font-size: 30px;
      font-weight: 500;
      line-height: 110%;
   }
`;
const StyledRating = styled(Rating)`
   && .MuiSvgIcon-root {
      font-size: 1.04167vw;
   }

   & .MuiRating-iconEmpty {
      color: #faaf00;
   }
`;

const StyleContainer = styled('div')`
   display: flex;
   padding: 60px 0px 0px 0px;
   width: 877px;
   height: 357px;
`;
const BigBoxStyle = styled('div')`
   display: flex;
   padding: 0px 12px;
   flex-direction: column;

   p {
      color: rgba(0, 0, 0, 0.5);
      font-family: Inter;
      font-size: 14px;
      font-weight: 400;
      line-height: 140%;
   }
   h2 {
      color: rgb(26, 26, 37);
      font-family: Inter;
      font-size: 16px;
      font-weight: 700;
      line-height: 150%;
   }
   h3 {
      color: rgb(56, 66, 85);
      font-family: Inter;
      font-size: 16px;
      font-weight: 400;
      line-height: 150%;
      padding-bottom: 18px;
   }
`;

const MuiButtonStyle = styled(Button)`
   border: none;
   &:hover {
      border: none;
   }
`;

const StyleAnswer = styled('div')`
   display: flex;
   flex-direction: column;
   flex-direction: column;
   justify-content: flex-start;
   align-items: flex-start;
   gap: 4px;
   padding: 20px 20px;
   width: 887px;
   height: 100px;
   border-radius: 6px;

   /* линии E8E8E8 */
   background: rgb(232, 232, 232);
   h6 {
      color: rgb(0, 0, 0);
      font-family: Inter;
      font-size: 16px;
      font-weight: 700;
      line-height: 150%;
   }
`;
const BtnStyleAdmin = styled('div')`
   display: flex;
   justify-content: end;
   align-items: end;
   padding: 18px 0px 8px 0px;
`;
const Line = styled('hr')`
   /* линии E8E8E8 */
   border: 1px solid rgb(232, 232, 232);
   width: 880px;
`;

const StyleStarsBox = styled('div')`
   display: flex;
   justify-content: flex-start;
   align-items: center;

   gap: 3px;
   padding: 12px 0px;
`;

const ModalStyle = styled(BaseModal)`
   display: flex;
   flex-direction: column;
   justify-content: center;

   width: 544px;
   height: 349px;
   border-radius: 4px;

   background: rgb(255, 255, 255);
`;

const ContainerComent = styled('div')`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
`;
const TitleStyle = styled('div')`
   padding: 36px 103px;
   h2 {
      color: rgb(41, 41, 41);
      font-family: Inter;
      font-size: 23px;
      font-weight: 500;
      line-height: 32px;
   }
`;

const InputfModal = styled(TextField)`
   width: 480px;
`;

const BtnModalContainer = styled('div')`
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 32px 32px 40px 32px;
   gap: 20px;
`;
const ModalButtun = styled(Button)`
   width: 230px;
   height: 41px;
`;

export default AdminReviews;
