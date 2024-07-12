import { TableCell, styled } from '@mui/material';
import { Input } from '../../../UI/Input';

export const InstallProductItem = ({
   color,
   ram,
   sim,
   size,
   price,
   operatingSystem,
   onPriceChange,
   brand,
   screenType,
   releaseDate,
   connection,
   bodyMaterial,
   memory,
   laptopmemory,
   displayDiagonal,
   tabletOperatingSystem,
   cpu,
   quantity,
   onQuantityChange,
   id,
}) => {
   const handlePriceChange = event => {
      // console.log(onPriceChange(id, event.target.value));
   };
   const handleQuantityChange = event => {
      onQuantityChange(id, event.target.value);
   };

   return (
      <>
         {brand && <TableCell>{brand}</TableCell>}
         {color && <TableCell>{color}</TableCell>}
         {memory && <TableCell>{memory}</TableCell>}
         {ram && <TableCell>{ram}</TableCell>}
         {sim && <TableCell>{sim}</TableCell>}
         {releaseDate && <TableCell>{releaseDate}</TableCell>}
         {screenType && <TableCell>{screenType}</TableCell>}
         {laptopmemory && <TableCell>{laptopmemory}</TableCell>}
         {operatingSystem && <TableCell>{operatingSystem}</TableCell>}
         {size && <TableCell>{size}</TableCell>}
         {bodyMaterial && <TableCell>{bodyMaterial}</TableCell>}
         {displayDiagonal && <TableCell>{displayDiagonal}</TableCell>}
         {tabletOperatingSystem && (
            <TableCell>{tabletOperatingSystem}</TableCell>
         )}
         {cpu && <TableCell>{cpu}</TableCell>}
         {connection && <TableCell>{connection}</TableCell>}
         <InputBox>
            <FirstInputStyle
               type="number"
               value={quantity}
               onChange={handleQuantityChange}
            />
            <SecondInputStyle
               type="number"
               value={price}
               onChange={handlePriceChange}
            />
         </InputBox>
      </>
   );
};

const SecondInputStyle = styled(Input)(() => ({
   '.MuiInputBase-root': {
      height: '100%',
      width: '100%',
      fontFamily: 'Inter',
      fontWeight: '400',
      background: 'rgba(203, 17, 171, 0.1)',
      borderTopLeftRadius: '1px',
      borderBottomLeftRadius: '1px',
      borderBottomRightRadius: '1px',
      borderTopRightRadius: '1px',
   },
}));
const FirstInputStyle = styled(Input)(() => ({
   '.MuiInputBase-root': {
      height: '100%',
      width: '100%',
      fontFamily: 'Inter',
      fontWeight: '400',
      background: 'rgba(203, 17, 171, 0.1)',
      borderTopLeftRadius: '1px',
      borderBottomRightRadius: '1px',
      borderTopRightRadius: '1px',
      borderBottomLeftRadius: '1px',
   },
}));

const InputBox = styled('div')(() => ({
   display: 'flex',
}));
