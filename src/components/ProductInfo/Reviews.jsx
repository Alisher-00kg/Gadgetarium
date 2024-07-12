import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminReviews from '../admin/AdminReviews';
import { styled } from '@mui/material';
import { useParams } from 'react-router';
import { getCardReviews, getStatistics } from '../../store/thunks/cardThunks';
import { RatingAdmin } from '../UI/RatingAdmin';

export const Reviews = () => {
   const dispatch = useDispatch();
   const { statistics, isLoading } = useSelector(state => state.statistics);
   const { productId } = useParams();

   const { review } = useSelector(state => state.review);

   useEffect(() => {
      dispatch(getCardReviews(productId));
   }, []);
   useEffect(() => {
      dispatch(getStatistics(productId));
   }, []);

   if (isLoading) return;

   const ratingsArray = Object.entries(statistics.ratingCounts || {}).map(
      ([key, value]) => ({
         id: key,
         amountStar: parseInt(key, 10),
         total: value,
      }),
   );

   return (
      <Wrapper>
         <AdminReviews reviews={review} />
         <RatingAdmin
            quantity={statistics.quantityFeedbacks}
            grade={
               isNaN(statistics.overallRating) ? 0 : statistics.overallRating
            }
            star={statistics.overallRating}
            ratings={ratingsArray}
         />
      </Wrapper>
   );
};
const Wrapper = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   paddingTop: '40px',
}));
