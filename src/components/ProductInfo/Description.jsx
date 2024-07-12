import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { styled } from '@mui/material';
import PlaySvg from '../../assets/icons/play.svg?react';
import { useParams } from 'react-router';
import { getCardDescription } from '../../store/thunks/cardThunks';
import { IconButton } from '../UI/IconButton';

export const Description = () => {
   const dispatch = useDispatch();
   const { description } = useSelector(state => state.description);
   const { productId } = useParams();

   const [playing, setPlaying] = useState(false);

   useEffect(() => {
      dispatch(getCardDescription({ id: productId }));
   }, []);

   return (
      <DescriptionBlock>
         <Block>
            <StyledDescription>{description.description}</StyledDescription>
            <IconButtonStyle onClick={() => setPlaying(true)}>
               <PlaySvg />
               Видео о товаре
            </IconButtonStyle>
         </Block>
         <ReactPlayer
            url={description.videoUrl}
            playing={playing}
            controls={true}
            width="800px"
         />
      </DescriptionBlock>
   );
};
const StyledDescription = styled('p')(() => ({
   width: '300px',
   fontFamily: 'Inter',
   fontSize: '18px',
   fontWeight: '400',
   color: '#ffffff',
   margin: '0 0 26px 0',
}));
const DescriptionBlock = styled('div')(() => ({
   display: 'flex',
}));

const Block = styled('div')(() => ({
   padding: '30px 30px',
   width: '500px',
   height: '360px',
   background: '#1A1A25',
}));
const IconButtonStyle = styled(IconButton)(() => ({
   color: 'red',
   fontFamily: 'Inter',
   fontWeight: '400',
   fontSize: '14px',
}));
