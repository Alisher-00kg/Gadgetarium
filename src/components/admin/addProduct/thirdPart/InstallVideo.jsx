import { InputAdornment, styled } from '@mui/material';
import { Input } from '../../../UI/Input';
import InstallIcon from '../../../../assets/icons/installIcon.svg?react';
import { notify } from '../../../main/SnackBar';

export const InstallVideo = ({ onVideoLinkChange, videoLink }) => {
   // const handleVideoLinkChange = event => {
   //    onVideoLinkChange(event.target.value);
   // };
   const handleVideoLinkChange = event => {
      const value = event.target.value;
      if (value && !isValidUrl(value)) {
         notify('Пожалуйста, введите корректную ссылку на видео.');
      }
      onVideoLinkChange(value);
   };
   const isValidUrl = urlString => {
      try {
         new URL(urlString);
         return true;
      } catch (e) {
         return false;
      }
   };
   return (
      <Wrapper>
         <LabelStyle htmlFor="Загрузите видеообзор">
            Загрузите видеообзор <em style={{ color: 'red' }}>*</em>
            <div>
               <InputStyle
                  id="Загрузите видеообзор"
                  placeholder="Вставьте ссылку на видеообзор"
                  name="video"
                  type="url"
                  value={videoLink}
                  onChange={handleVideoLinkChange}
                  accept=".vedeo"
                  InputProps={{
                     startAdornment: (
                        <InputAdornment position="start">
                           <InstallIcon style={{ cursor: 'pointer' }} />
                        </InputAdornment>
                     ),
                  }}
               />
            </div>
         </LabelStyle>
      </Wrapper>
   );
};

const Wrapper = styled('div')(() => ({
   display: 'flex',
   gap: '20px',
}));
const LabelStyle = styled('label')(() => ({
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '400',
   color: '#384255',
}));
const InputStyle = styled(Input)(() => ({
   '.MuiInputBase-root': {
      width: '396px',
      fontFamily: 'Inter',
      fontWeight: '300',
      color: '#91969E',
      background: '#ffffff',
      marginTop: '7px',
   },
}));
