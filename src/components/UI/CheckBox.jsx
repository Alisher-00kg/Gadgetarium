import styled from '@emotion/styled';
import { Checkbox } from '@mui/material';

export default function CheckBox({ isChecked, onChange, type, ...props }) {
   return (
      <div>
         <ChecboxStyle
            type={type}
            checked={isChecked}
            onChange={onChange}
            {...props}
            color="success"
         />
      </div>
   );
}
const ChecboxStyle = styled(Checkbox)(({ color }) => ({
   color: 'gray',

   '&:hover': {
      color: color === 'success' ? 'none' : 'rgb(203, 17, 171)',
   },

   '&.Mui-checked': {
      color: color === 'success' ? 'rgb(47, 197, 9)' : ' rgb(203, 17, 171)',
   },
}));
