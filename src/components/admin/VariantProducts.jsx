import React, { useState } from 'react';
// import RadioButton from '../UI/RadioButton';

import { styled } from '@mui/material';
import {
   formsVariant,
   genderVariant,
   interfacesesVariant,
   waterproofVariant,
} from '../../utils/constants/variant';
import RadioButton from '../UI/RadioButton';

export const VariantProducts = () => {
   const [interfaces, setInterfaces] = useState();
   const [gender, setGender] = useState();
   const [waterproof, setWaterproof] = useState();
   const [caseShape, setCaseShape] = useState();

   const handleGenderChange = event => {
      setGender(event.target.value);
   };
   const handleWaterproofChange = event => {
      setWaterproof(event.target.value);
   };
   const handleInterfacesChange = event => {
      setInterfaces(event.target.value);
   };
   const handleCaseshapeChange = event => {
      setCaseShape(event.target.value);
   };
   return (
      <Wrapper>
         <Block>
            <StyledLabel htmlFor="">Пол</StyledLabel>
            <RadionButtonContainer>
               <RadioButtonStyle
                  options={genderVariant}
                  value={gender}
                  onChange={handleGenderChange}
               />
            </RadionButtonContainer>
         </Block>

         <Block>
            <StyledLabel htmlFor="">Водонепроницаемые</StyledLabel>
            <RadionButtonContainer>
               <RadioButtonStyle
                  options={waterproofVariant}
                  value={waterproof}
                  onChange={handleWaterproofChange}
               />
            </RadionButtonContainer>
         </Block>
         <Block>
            <StyledLabel htmlFor="">Беспроводные интерфейсы</StyledLabel>
            <RadionButtonContainer>
               <RadioButtonStyle
                  options={interfacesesVariant}
                  value={interfaces}
                  onChange={handleInterfacesChange}
               />
            </RadionButtonContainer>
         </Block>

         <Block>
            <StyledLabel htmlFor=""> Форма корпуса</StyledLabel>
            <RadionButtonContainer>
               <RadioButtonStyle
                  options={formsVariant}
                  value={caseShape}
                  onChange={handleCaseshapeChange}
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
