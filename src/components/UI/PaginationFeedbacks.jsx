import { Pagination, Stack, styled } from '@mui/material';

const PaginationFeedbacks = ({
   reviewsPerPage,
   totalReviews,
   paginate,
   currentPage,
}) => {
   const pageNumbers = Math.ceil(totalReviews / reviewsPerPage);

   const handlePageChange = (event, value) => {
      paginate(value);
   };

   return (
      <ConatainerPagination>
         <Stack spacing={2}>
            <Pagination
               count={pageNumbers}
               page={currentPage}
               onChange={handlePageChange}
               color="primary"
            />
         </Stack>
      </ConatainerPagination>
   );
};
const ConatainerPagination = styled('div')`
   display: flex;
   padding-top: 40px;
   padding-left: 150px;
   justify-content: center;
   align-items: center;
`;

export default PaginationFeedbacks;
