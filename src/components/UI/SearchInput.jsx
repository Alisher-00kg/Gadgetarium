import { TextField, styled } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { IconButton } from '@mui/material';
import Search from '../../assets/icons/search.svg?react';

export const SearchInput = ({
   placeholder,
   onChange,
   onClick,
   type = 'search',
   value,
   color,
   ...props
}) => {
   return (
      <SearchInputStyled
         placeholder={placeholder}
         onChange={onChange}
         value={value}
         fullWidth
         onClick={onClick}
         type={type}
         color={color}
         {...props}
         InputProps={{
            endAdornment: (
               <InputAdornment position="end">
                  <IconButton>
                     <Search />
                  </IconButton>
               </InputAdornment>
            ),
         }}
      />
   );
};

const SearchInputStyled = styled(TextField)(({ height }) => ({
   '.MuiInputBase-root': {
      border: '1px solid #FFFFFF',
      width: '100%',
      height: height || '42px',
      borderRadius: '6px',
      backgroundColor: 'transparent',

      '&:active': {
         borderColor: '#CB11AB',
         '&:active': {
            path: {
               fill: '#CB11AB',
            },
         },
      },
      '.css-1j5luls-MuiInputBase-input-MuiOutlinedInput-input ': {
         color: '#FAFAFA',
      },
      path: {
         fill: '#292929',
      },
      '::placeholder': {
         color: '#292929',
      },
      '&:hover': {
         '.css-1j5luls-MuiInputBase-input-MuiOutlinedInput-input ': {
            color: '#292929',
         },

         backgroundColor: '#FAFAFA',

         '& :hover': {
            path: {
               fill: '#CB11AB',
            },
         },
      },
   },

   '& fieldset': {
      border: 'none',
   },
   '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus':
      {
         WebkitTransition:
            'color 9999s ease-out,background-color 9999s ease-out ',
         WebkitTransitionDelay: '9999s',
      },
}));
