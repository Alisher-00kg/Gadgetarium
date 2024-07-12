import { styled } from '@mui/material';
import React from 'react';

export const Rating = ({ id, total, amountStar }) => {
   return (
      <StyledRatingList key={id}>
         <CenteredRating
            value={amountStar}
            readOnly
            size="small"
            name="customized-icons"
            emptyIcon={
               <StarIconWithBorder viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
               </StarIconWithBorder>
            }
         />
         <li>{total} отзывов</li>
      </StyledRatingList>
   );
};

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
