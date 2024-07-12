import { Rating, styled } from '@mui/material';
import { Button } from './Button';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FeedbackModal } from '../main/productCards/FeedbackModal';
import SigIn from '../../pages/guest/SigIn';
import SignUp from '../../pages/guest/SignUp';

export const RatingAdmin = ({ grade, quantity, star, ratings }) => {
   const [showModal, setShowModal] = useState(false);
   const [isOpen, setIsOpen] = useState('');
   const { role } = useSelector(state => state.auth);
   const handleOpenModal = (param = '') => {
      setIsOpen(param);
      setShowModal(true);
   };
   const handleCloseModal = () => {
      setIsOpen('');
      setShowModal(false);
   };

   return (
      <StyledRatingContainer>
         <div style={{ display: 'flex', gap: '40px' }}>
            <StyledRatingBlock>
               <div>
                  <h2>{grade}</h2>
                  <Rating
                     readOnly
                     defaultValue={star}
                     size="small"
                     emptyIcon={
                        <StarIconWithBorder viewBox="0 0 24 24">
                           <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </StarIconWithBorder>
                     }
                  />
               </div>
               <p>{quantity} отзывов</p>
            </StyledRatingBlock>
            {showModal &&
               (role === 'GUEST' ? (
                  <FeedbackModal onClose={handleCloseModal} />
               ) : (
                  <>
                     <SigIn
                        open={isOpen === 'signIn'}
                        onClose={handleCloseModal}
                        onSiginSignUp={handleOpenModal}
                     />
                     <SignUp
                        open={isOpen === 'signUp'}
                        onClose={handleCloseModal}
                        onSiginSignUp={handleOpenModal}
                     />
                  </>
               ))}
            <div>
               {ratings.map((item, i) => (
                  <StyledRatingList key={item.id}>
                     <CenteredRating
                        value={i + 1}
                        readOnly
                        size="small"
                        name="customized-icons"
                        emptyIcon={
                           <StarIconWithBorder viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                           </StarIconWithBorder>
                        }
                     />
                     <li>{item.total} отзывов</li>
                  </StyledRatingList>
               ))}
            </div>
         </div>
         {role === 'USER' && (
            <ButtonStyle
               variant="contained"
               onClick={() => handleOpenModal('signIn')}
            >
               Оставить отзыв
            </ButtonStyle>
         )}
      </StyledRatingContainer>
   );
};
const CenteredRating = styled(Rating)({
   display: 'flex',
   alignItems: 'center',
});
const StarIconWithBorder = styled('svg')({
   width: '18px',
   height: '15px',
   fill: 'none',
   stroke: '#F99808',
   strokeWidth: '2px',
});
const StyledRatingContainer = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '49px',
   width: '509px',
   height: '223px',
   borderRadius: '6px',
   background: '#f4f4f4',
   padding: '30px 40px',
}));

const StyledRatingBlock = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '6px',

   ' & div': {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
   },
   ' & h2': {
      fontSize: '30px',
      fontWeight: '700',
      color: '#292929',
      fontFamily: 'Inter',
   },
   '& p ': {
      fontSize: '14px',
      fontWeight: '400',
      color: '#91969e',
      fontFamily: 'Inter',
   },
}));

const StyledRatingList = styled('ul')(() => ({
   display: 'flex',
   gap: '12px',
   alignItems: 'center',

   '& li ': {
      fontSize: '14px',
      fontWeight: '400',
      color: '#292929',
      fontFamily: 'Inter',
   },
}));

const ButtonStyle = styled(Button)(() => ({
   width: '329px',
   height: '47px',
   textTransform: 'inherit',
   fontFamily: 'Inter',
   fontWeight: '600',
}));
