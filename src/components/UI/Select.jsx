import React, { forwardRef, useState } from 'react';
import { FormControl, Select as MuiSelect, MenuItem } from '@mui/material';
import styled from '@emotion/styled';
import { Icons } from '../../assets';

const MenuProps = {
   PaperProps: {
      style: {
         marginLeft: -16,
         maxHeight: 200,
      },
   },
};

const Select = forwardRef(
   ({ label, value, onChange, options, selectedOption, ...restProps }, ref) => {
      const [selectedItem, setSelectedItem] = useState(null);

      const handleItemClick = item => {
         setSelectedItem(item);
      };

      return (
         <FormControl fullWidth ref={ref}>
            <label>{label}</label>
            <StyleSelect
               IconComponent={Icons.GreyErrowDownCentral}
               value={value}
               onChange={onChange}
               MenuProps={MenuProps}
               {...restProps}
            >
               {options.length === 0 ? (
                  <StyleMenuItem disabled>
                     Здесь пока что ничего нету
                  </StyleMenuItem>
               ) : (
                  options.map(option => (
                     <StyleMenuItem
                        selectedOption={selectedOption}
                        key={option.id}
                        value={option.id || option.subCategoryId}
                        onClick={() => handleItemClick(option)}
                        style={{
                           backgroundColor:
                              selectedItem === option ? '#CB11AB' : 'white',
                        }}
                     >
                        {option.categoryName || option.brandName}
                     </StyleMenuItem>
                  ))
               )}
            </StyleSelect>
         </FormControl>
      );
   },
);

const StyleSelect = styled(MuiSelect)(() => ({
   width: '100%',
   height: '39px',
   border: '1px solid rgb(205, 205, 205)',
   borderRadius: '6px',
   marginTop: '5px',
   color: 'rgb(145, 150, 158)',
   fontWeight: '300',

   '& fieldset': {
      border: 'none',
   },
   svg: {
      width: '20px',
      height: '20px',
   },
}));

const StyleMenuItem = styled(MenuItem)(() => ({
   width: '99%',
   height: '40px',
   borderRadius: '10px',
   marginLeft: '5px',
}));

export default Select;
