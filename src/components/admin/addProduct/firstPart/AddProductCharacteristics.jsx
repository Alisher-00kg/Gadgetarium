import { useEffect, useState } from 'react';
import Select from '../../../UI/Select';

import {
   BodyMaterial,
   CPU,
   DisplayDiagonal,
   OperatingSystem,
   RAM,
   SIM,
   ScreenType,
   WatchSize,
   connection,
   volumeMemory,
} from '../../../../utils/constants/variants';
import { styled } from '@mui/material';
import { AddPalette } from './AddPalette';
import { useSelector } from 'react-redux';

export const AddProductCharacteristics = ({
   onChange,
   productCharacteristics,
   initialCharacteristics,
   setProductCharacteristics,
}) => {
   const selectedCategory = useSelector(
      state => state.productCategory.selectedCategory,
   );

   useEffect(() => {
      setProductCharacteristics(initialCharacteristics || {});
   }, [initialCharacteristics]);

   useEffect(() => {
      onChange('productCharacteristics', productCharacteristics);
   }, [productCharacteristics]);

   const handleCharacteristicChange = (property, value) => {
      let newValue;
      if (property === 'color') {
         newValue = value;
      } else {
         newValue =
            property === 'size'
               ? WatchSize.find(option => option.id === value)?.title || ''
               : property === 'memory'
                 ? volumeMemory.find(option => option.id === value)?.title || ''
                 : property === 'laptopmemory'
                   ? volumeMemory.find(option => option.id === value)?.title ||
                     ''
                   : property === 'displayDiagonal'
                     ? DisplayDiagonal.find(option => option.id === value)
                          ?.title || ''
                     : property === 'ram'
                       ? RAM.find(option => option.id === value)?.title || ''
                       : property === 'sim'
                         ? SIM.find(option => option.id === value)?.title || ''
                         : property === 'operatingSystem'
                           ? OperatingSystem.find(option => option.id === value)
                                ?.title || ''
                           : property === 'screenType'
                             ? ScreenType.find(option => option.id === value)
                                  ?.title || ''
                             : property === 'bodyMaterial'
                               ? BodyMaterial.find(
                                    option => option.id === value,
                                 )?.title || ''
                               : property === 'connection'
                                 ? connection.find(
                                      option => option.id === value,
                                   )?.title || ''
                                 : property === 'tabletOperatingSystem'
                                   ? OperatingSystem.find(
                                        option => option.id === value,
                                     )?.title || ''
                                   : property === 'cpu'
                                     ? CPU.find(option => option.id === value)
                                          ?.title || ''
                                     : '';
      }

      setProductCharacteristics(prevState => ({
         ...prevState,
         [property]: value || value,
      }));
   };
   const characteristics =
      selectedCategory === 1 ? (
         <>
            <div>
               <label>Основной цвет</label>
               <AddPalette
                  onChange={color => handleCharacteristicChange('color', color)}
                  value={productCharacteristics.color}
                  reset={!productCharacteristics.color}
               />
            </div>
            <SelectStyle
               onChange={event =>
                  handleCharacteristicChange('memory', event.target.value)
               }
               options={volumeMemory}
               value={productCharacteristics.memory}
               label={<label>Объем памяти</label>}
            />
            <SelectStyle
               onChange={event =>
                  handleCharacteristicChange('ram', event.target.value)
               }
               options={RAM}
               value={productCharacteristics.ram}
               label={<label>Оперативная память</label>}
            />
            <SelectStyle
               onChange={event =>
                  handleCharacteristicChange('sim', event.target.value)
               }
               options={SIM}
               value={productCharacteristics.sim}
               label={<label>Кол-во SIM-карт</label>}
            />
         </>
      ) : selectedCategory === 2 ? (
         <>
            <PaletteBox>
               <Label>Основной цвет</Label>
               <AddPalette />
            </PaletteBox>
            <SelectStyle
               onChange={event =>
                  handleCharacteristicChange('screenType', event.target.value)
               }
               options={ScreenType}
               value={productCharacteristics.screenType}
               label={<label>Тип экрана</label>}
            />
            <SelectStyle
               onChange={event =>
                  handleCharacteristicChange('laptopmemory', event.target.value)
               }
               options={volumeMemory}
               value={productCharacteristics.laptopmemory}
               label={<label>Объем оперативной памяти</label>}
            />
            <SelectStyle
               onChange={event =>
                  handleCharacteristicChange(
                     'operatingSystem',
                     event.target.value,
                  )
               }
               options={OperatingSystem}
               value={productCharacteristics.operatingSystem}
               label={<label>Операционная система</label>}
            />
         </>
      ) : selectedCategory === 3 ? (
         <>
            <SelectStyle
               onChange={event =>
                  handleCharacteristicChange('size', event.target.value)
               }
               options={WatchSize}
               value={productCharacteristics.size}
               label={<label>Размер смарт часов (мм)</label>}
            />

            <PaletteBox>
               <Label>Основной цвет</Label>
               <AddPalette />
            </PaletteBox>
            <SelectStyle
               onChange={event =>
                  handleCharacteristicChange('bodyMaterial', event.target.value)
               }
               options={BodyMaterial}
               value={productCharacteristics.bodyMaterial}
               label={<Label>Материал корпуса</Label>}
            />
            <SelectStyle
               onChange={event =>
                  handleCharacteristicChange(
                     'displayDiagonal',
                     event.target.value,
                  )
               }
               options={DisplayDiagonal}
               value={productCharacteristics.displayDiagonal}
               label={<Label>Диагональ дисплея (дюйм)</Label>}
            />
         </>
      ) : selectedCategory === 4 ? (
         <>
            <SelectStyle
               onChange={event =>
                  handleCharacteristicChange(
                     'tabletOperatingSystem',
                     event.target.value,
                  )
               }
               options={OperatingSystem}
               value={productCharacteristics.operatingSystem}
               label={<label>Материал</label>}
            />
            <SelectStyle
               onChange={event =>
                  handleCharacteristicChange('cpu', event.target.value)
               }
               options={CPU}
               value={productCharacteristics.cpu}
               label={<label>Функциональность</label>}
            />
            <SelectStyle
               onChange={event =>
                  handleCharacteristicChange('connection', event.target.value)
               }
               options={connection}
               value={productCharacteristics.connection}
               label={<label>Стиль</label>}
            />
         </>
      ) : null;

   return <Container>{characteristics}</Container>;
};

const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '16px',
}));
const Label = styled('p')(() => ({
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '400',
}));
const SelectStyle = styled(Select)(() => ({
   width: '396px',
   height: '55px',
   fontFamily: 'Inter',
   fontWeight: '300',
}));
const PaletteBox = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '6px',
}));
