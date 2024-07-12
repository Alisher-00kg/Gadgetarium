import { Rating, styled } from '@mui/material';
import { IconButton } from '../IconButton';
import { Icons } from '../../../assets';
import { comparisonDeleteThunks } from '../../../store/thunks/comparisionThunks';
import { useDispatch } from 'react-redux';
import { gadgetBasketThunk } from '../../../store/thunks/mainPageCardPhoneThunks';
import { notify } from '../../main/SnackBar';

export const PhoneCard = ({
   id,
   imageUrl,
   description,
   price,
   handleDelete,
}) => {
   const dispatch = useDispatch();

   const handleBasketClick = () => {
      dispatch(gadgetBasketThunk({ subGadgetId: id }));
      notify('Товар успешно добавлен в корзину!');
   };
   return (
      <Styledcontainerphone>
         <section>
            <div>
               <Icons.DeleteRounded
                  className="krest"
                  onClick={() => handleDelete(id)}
               />
            </div>
            <div className="image-block">
               {imageUrl?.map((image, index) => (
                  <img key={index} src={image} alt={description} />
               ))}
            </div>
         </section>
         <section>
            <div>
               <h3>{description}</h3>
               <div className="price">
                  <b>{price} p</b>
               </div>
            </div>
            <StyledIconButton onClick={handleBasketClick}>
               <Icons.Cart />в корзину
            </StyledIconButton>
         </section>
      </Styledcontainerphone>
   );
};

const Styledcontainerphone = styled('div')(() => ({
   position: 'relative',
   width: '219px',
   height: '367px',
   border: '1px solid rgb(235, 227, 227)',
   borderRadius: '4px',
   background: 'rgb(255, 255, 255)',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-between',
   paddingBottom: '20px',
   cursor: 'pointer',
   transition: 'box-shadow 0.3s, z-index 2s',
   '&:hover': {
      boxShadow:
         'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
      zIndex: 5,
   },
   '& div': {
      textAlign: 'left',
   },
   '.image-block': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      img: {
         objectFit: 'contain',
         width: '154.34px',
         height: '170px',
         marginTop: '33px',
         alignItems: 'center',
      },
   },
   '& h3': {
      width: '190px',
      color: 'rgb(41, 41, 41)',
      fontSize: '14px',
      textAlign: 'left',
      fontWeight: 500,
      lineHeight: '140%',
      paddingTop: '18px',
      paddingBottom: '8px',
      paddingLeft: '20px',
   },
   '& b': {
      textAlign: 'left',
      color: 'rgb(41, 41, 41)',
      fontSize: '18px',
      fontWeight: 700,
      lineHeight: '140%',
      paddingLeft: '20px',
   },
   '& price': {
      textAlign: 'left',
   },
   '& .krest': {
      position: 'absolute',
      top: '13px',
      right: '15px',
      cursor: 'pointer',
   },
}));

const BoxRating = styled('div')(() => ({
   display: 'flex',
}));

const FiveRating = styled(Rating)(() => ({
   width: '12px',
   height: '12px',
}));
const RatingTitle = styled('div')(() => ({
   color: 'rgb(144, 156, 181)',
   fontFamily: 'Inter',
   fontSize: '12px',
   display: 'flex',
}));
const ParcentIcons = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   padding: '10px 10px',
}));
const RedParcent = styled('p')(() => ({
   width: '36px',
   height: '36px',
   color: 'rgb(255, 255, 255)',
   fontFamily: 'Inter',
   fontSize: '12px',
   background: 'rgb(245, 59, 73)',
   borderRadius: '50%',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
}));
const PriceContainer = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   color: 'rgb(41, 41, 41)',
   fontFamily: 'Inter',
   fontSize: '18px',
   fontWeight: '700',
   paddingTop: '10px',
}));
const CurrentPrice = styled('p')(() => ({
   textDecorationLine: 'line-through',
   color: 'rgb(144, 156, 181)',
   fontFamily: 'Inter',
   fontSize: '16px',
   fontWeight: '400',
}));
const BoxStyleBasket = styled('div')(() => ({
   display: 'flex',
}));
const IconsStyle = styled('div')(() => ({
   display: 'flex',
   gap: '15px',
}));
const StyledIconButton = styled(IconButton)(() => ({
   width: '120px',
   height: '35px',
   borderRadius: '4px',
   backgroundColor: ' rgb(203, 17, 171)',

   marginTop: '12px',
   margin: '0 20px',
   fontSize: '14px',
   fontWeight: '500',
   textTransform: 'uppercase',
   cursor: 'pointer',
   color: 'rgb(255, 255, 255)',
   fontFamily: 'Inter',

   '&:hover': {
      backgroundColor: ' rgb(203, 17, 171)',
   },
}));

const ContainerImg = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}));

const ImagesStyle = styled('img')(() => ({
   width: '230px',
   height: '230px',
}));
const TitleAmount = styled('p')(() => ({
   color: 'rgb(47, 197, 9)',
   fontSize: '12px',
}));
const BrandNameColor = styled('h3')(() => ({
   color: ' rgb(41, 41, 41)',
   fontSize: '12px',
   fontWeight: 'bold',
   lineHeight: '19px',
}));
const AllContainer = styled('div')(() => ({
   padding: '46px 46px 20px',
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
}));
// const RedFavorite = styled(FavoriteRedIcons)()
