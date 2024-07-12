import { FormControlLabel, Radio, RadioGroup, styled } from '@mui/material';

const RadioButton = ({
   value,
   onChange,
   label,
   checked,
   options,
   ...props
}) => {
   return (
      <RadioGroup value={value} onChange={onChange} {...props}>
         {options.map(({ value, label }) => (
            <FormControlLabel
               key={value}
               value={value}
               control={<StyledRadio />}
               label={label}
               labelPlacement="end"
            />
         ))}
      </RadioGroup>
   );
};

const StyledRadio = styled(Radio)`
   &:hover {
      color: rgb(203, 17, 171);
   }
   &.Mui-checked {
      color: rgb(203, 17, 171);
   }
`;
export default RadioButton;
