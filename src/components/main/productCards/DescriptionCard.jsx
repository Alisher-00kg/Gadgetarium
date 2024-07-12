import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCardDescription } from '../../../store/thunks/cardThunks';
import ReactPlayer from 'react-player';
import { styled } from '@mui/material';
import { IconButton } from '../../UI/IconButton';
import PlaySvg from '../../../assets/icons/play.svg?react';

export const DescriptionCard = ({ id }) => {
   const dispatch = useDispatch();
   const { description } = useSelector(state => state.description);

   const [playing, setPlaying] = useState(false);

   useEffect(() => {
      dispatch(getCardDescription({ id }));
   }, []);

   return (
      <DescriptionBlock>
         <Block>
            <Description>{description.description}</Description>
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
const Description = styled('p')(() => ({
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
