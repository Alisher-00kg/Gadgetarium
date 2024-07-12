import { Box, styled } from '@mui/material';
import { Typography } from '@mui/material';
import { Rating } from '@mui/material';

function Card({ title, price, number, image }) {
   return (
      <ContainerStyled>
         <img src={image} />
         <BlockStyled>
            <div className="container">
               <h4>{title}</h4>
               <div>
                  <Box
                     sx={{
                        '& > legend': { mt: 5 },
                     }}
                  >
                     <div>
                        <Typography name="legend">Рейтинг</Typography>
                     </div>
                     <Rating readOnly value={number} size="small" />
                  </Box>
                  <div className="wrapper">
                     <span>{number}</span>
                  </div>
               </div>
            </div>
            <h3>{price} сом</h3>
         </BlockStyled>
      </ContainerStyled>
   );
}

export default Card;
const ContainerStyled = styled('div')(() => ({
   width: '210px',
   height: '354px',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   backgroundColor: '#ffffff',
   color: 'black',
   borderRadius: '4px',
   '& img': {
      width: '210px',
      height: '210px',
   },
   '& h3': {
      paddingRight: '70px',
   },
}));

const BlockStyled = styled('div')(() => ({
   width: '210px',
   height: '144px',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   flexDirection: 'column',

   '.container': {
      width: '170px',
      height: '79px',
      '& div': {
         width: '149px',
         height: '15px',
         display: 'flex',
         alignItems: 'center',
         '& div': {
            width: '66px',
            height: '12px',
            color: '#909CB5',
            gap: '2px',
         },
      },
      '.wrapper': {
         color: '#909CB5',
         paddingLeft: '85px',
      },
   },
   h4: {
      width: '170px',
      height: '40px',
      fontFamily: 'Inter',
      fontSize: '14px',
      fontWeight: '500',
   },
}));
