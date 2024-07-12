import { styled } from '@mui/material';
import Select from '../../../UI/Select';

export const CategorySelect = ({ onChange, onSelectChange, ...rest }) => {
   const handleSelectChange = event => {
      onSelectChange(event);
      onChange(event);
   };

   return <SelectStyle onChange={handleSelectChange} {...rest} />;
};
const SelectStyle = styled(Select)(() => ({
   width: '396px',
   height: '55px',
   fontFamily: 'Inter',
   fontWeight: '300',
}));
