import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material';
import RadioButton from '../../../../components/UI/RadioButton';
import {
   formsVariant,
   genderVariant,
   interfacesesVariant,
   waterproofVariant,
} from '../../../../utils/constants/variants';

export const VariantProducts = ({
   onChange,
   resetVariants,
   productVariants,
}) => {
   const [variants, setVariants] = useState({
      interfaces: '',
      gender: '',
      waterproof: '',
      caseShape: '',
   });

   useEffect(() => {
      setVariants(productVariants);
   }, [productVariants]);

   const handleProductChange = (variantName, value) => {
      const newVariants = { ...productVariants, [variantName]: value };
      setVariants(newVariants);
      onChange(variantName, value);
   };

   const resetProductVariants = () => {
      setVariants({
         interfaces: '',
         gender: '',
         waterproof: '',
         caseShape: '',
      });
   };

   useEffect(() => {
      resetProductVariants();
   }, [resetVariants]);

   return (
      <Wrapper>
         <Block>
            <StyledLabel htmlFor="">Пол</StyledLabel>
            <RadionButtonContainer>
               <RadioButtonStyle
                  options={genderVariant}
                  value={productVariants.gender}
                  onChange={event =>
                     handleProductChange('gender', event.target.value)
                  }
               />
            </RadionButtonContainer>
         </Block>

         <Block>
            <StyledLabel htmlFor="">Водонепроницаемые</StyledLabel>
            <RadionButtonContainer>
               <RadioButtonStyle
                  options={waterproofVariant}
                  value={productVariants.waterproof}
                  onChange={event =>
                     handleProductChange('waterproof', event.target.value)
                  }
               />
            </RadionButtonContainer>
         </Block>
         <Block>
            <StyledLabel htmlFor="">Беспроводные интерфейсы</StyledLabel>
            <RadionButtonContainer>
               <RadioButtonStyle
                  options={interfacesesVariant}
                  value={productVariants.interfaces}
                  onChange={event =>
                     handleProductChange('interfaces', event.target.value)
                  }
               />
            </RadionButtonContainer>
         </Block>

         <Block>
            <StyledLabel htmlFor=""> Форма корпуса</StyledLabel>
            <RadionButtonContainer>
               <RadioButtonStyle
                  options={formsVariant}
                  value={productVariants.caseShape}
                  onChange={event =>
                     handleProductChange('caseShape', event.target.value)
                  }
               />
            </RadionButtonContainer>
         </Block>
      </Wrapper>
   );
};
const Wrapper = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '16px',
}));
const RadionButtonContainer = styled('div')(() => ({
   '& .MuiFormGroup-root': {
      display: 'flex',
      flexDirection: 'row',
      gap: '30px',
   },
}));
const RadioButtonStyle = styled(RadioButton)(() => ({
   '& .MuiTypography-root': {
      color: '#292929',
      fontFamily: 'Inter',
      fontWeight: '400',
      margin: '0',
   },
}));
const Block = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '8px',
}));
const StyledLabel = styled('label')(() => ({
   fontSize: '14px',
   color: '#384255',
   fontFamily: 'Inter',
   fontWeight: '400',
}));
