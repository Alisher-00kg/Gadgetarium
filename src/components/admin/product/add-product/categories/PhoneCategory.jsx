import Select from '../../../../UI/Select.jsx';
import {
   RAM,
   SIM,
   volumeMemory,
} from '../../../../../utils/constants/variants.js';
import { SelectPhoto } from './SelectPhoto.jsx';
import { styled } from '@mui/material';
import React from 'react';
import { AddColor } from './AddColor.jsx';

const PhoneCategory = ({ formData, setFormData }) => {
   const handleSelectChange = e => {
      setFormData(prevState => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
   };

   const colorSelect = color => {
      setFormData(prevState => ({
         ...prevState,
         mainColour: color,
      }));
   };

   return (
      <div>
         <CategoryContainer>
            <div>
               <label htmlFor="color">Основной цвет</label>
               <AddColor onChange={colorSelect} />
            </div>
            <div>
               <label htmlFor="memory">Объем памяти</label>
               <Select
                  options={volumeMemory}
                  name={'memory'}
                  onChange={handleSelectChange}
                  value={formData.memory}
               />
            </div>
            <div>
               <label htmlFor="ram">Оперативная память</label>
               <Select
                  options={RAM}
                  name={'ram'}
                  onChange={handleSelectChange}
                  value={formData.ram}
               />
            </div>
            <div>
               <label htmlFor="sim">Кол-во SIM-карт</label>
               <Select
                  options={SIM}
                  name={'countSim'}
                  onChange={handleSelectChange}
                  value={formData.countSim}
               />
            </div>
         </CategoryContainer>
         <SelectPhoto />
      </div>
   );
};

export default PhoneCategory;

const CategoryContainer = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '20px',
   width: '400px',
   margin: '0 0 20px 0',
}));
