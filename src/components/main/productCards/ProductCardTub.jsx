import { Box, Tab, Tabs, styled } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { DownloadPdf } from './DownloadPdf';
import { DescriptionCard } from './DescriptionCard';
import { CharacteristicCard } from './CharacteristicCard';
import { ReviewsCard } from './ReviewsCard';
import { useState } from 'react';
import { DeliveryCard } from './DeliveryCard';
export const ProductCardTub = ({ id }) => {
   const [value, setValue] = useState('1');
   const handleChange = (event, newValue) => {
      setValue(newValue);
   };
   return (
      <div style={{ background: '#ffffff', padding: '90px' }}>
         <Box>
            <TabContext value={value}>
               <BoxStyle sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList
                     onChange={handleChange}
                     aria-label="lab API tabs example"
                  >
                     <TabStyle value="1" label="Описание" />
                     <TabStyle value="2" label="Характеристики" />
                     <TabStyle value="3" label="Отзывы" />
                     <TabStyle value="4" label="Доставка и оплата" />
                  </TabList>
                  <DownloadPdf />
               </BoxStyle>
               <TabPanel value="1">
                  <DescriptionCard id={id} />
               </TabPanel>
               <TabPanel value="2">
                  <CharacteristicCard id={id} />
               </TabPanel>
               <TabPanel value="3">
                  <ReviewsCard id={id} />
               </TabPanel>
               <TabPanel value="4">
                  <DeliveryCard />
               </TabPanel>
            </TabContext>
         </Box>
      </div>
   );
};
const BoxStyle = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
}));
const TabStyle = styled(Tab)(() => ({
   textTransform: 'inherit',
   fontFamily: 'Inter',
   fontSize: '18px',
   fontWeight: '500',
   color: '#292929',
}));
