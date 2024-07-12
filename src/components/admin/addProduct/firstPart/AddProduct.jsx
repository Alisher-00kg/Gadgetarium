import { Box, Tab, styled } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import { InstallProduct } from '../secondPart/InstallProduct';
import { AddCategory } from '../firstPart/AddCategory';
import { DesciptionProduct } from '../thirdPart/DesciptionProduct';

export const AddProduct = () => {
   const [tab, setTab] = useState('1');
   const [pageTitle, setPageTitle] = useState('Добавление товара');
   const [spanBackgrounds, setSpanBackgrounds] = useState({
      1: '#CB11AB',
      2: '#91969E',
      3: '#91969E',
   });

   const [installProductData, setInstallProductData] = useState([]);

   const handleInstallProductSubmit = newData => {
      setInstallProductData(newData);
   };
   const handleTabChange = newValue => {
      setTab(newValue);
      handleTextClick(newValue);
      if (newValue === '2') {
         setPageTitle('Установка цены и количества товара');
      } else if (newValue === '3') {
         setPageTitle('Описание и обзор');
      } else {
         setPageTitle('Добавление товара');
      }
   };
   const handleTextClick = tab => {
      const initialBackgrounds = {
         1: '#91969E',
         2: '#91969E',
         3: '#91969E',
      };

      setSpanBackgrounds({
         ...initialBackgrounds,
         [tab]: '#CB11AB',
      });
   };

   return (
      <Wrapper>
         <h1>{pageTitle}</h1>
         <Box>
            <TabContext value={tab}>
               <Box>
                  <StyledTabs aria-label="lab API tabs example" value="1">
                     <StyledTub
                        label={
                           <StyledDiv>
                              <span
                                 style={{
                                    backgroundColor: spanBackgrounds[1],
                                 }}
                              >
                                 1
                              </span>
                              Добавление товара
                              <hr />
                           </StyledDiv>
                        }
                        value="1"
                     />
                     <StyledTub
                        label={
                           <StyledDiv>
                              <span
                                 style={{
                                    backgroundColor: spanBackgrounds[2],
                                 }}
                              >
                                 2
                              </span>
                              Установка цены и количества товара
                              <hr />
                           </StyledDiv>
                        }
                        value="2"
                     />
                     <StyledTub
                        label={
                           <StyledDiv>
                              <span
                                 style={{
                                    backgroundColor: spanBackgrounds[3],
                                 }}
                              >
                                 3
                              </span>
                              Описание и обзор
                           </StyledDiv>
                        }
                        value="3"
                     />
                  </StyledTabs>
               </Box>
               <TabPanel value="1">
                  <TabPanelStyle>
                     <AddCategory setTab={handleTabChange} />
                  </TabPanelStyle>
               </TabPanel>
               <TabPanel value="2">
                  <InstallProduct
                     onInstallProductSubmit={handleInstallProductSubmit}
                     setTab={handleTabChange}
                  />
               </TabPanel>
               <TabPanel value="3">
                  <DesciptionProduct installProductData={installProductData} />
               </TabPanel>
            </TabContext>
         </Box>
      </Wrapper>
   );
};

const Wrapper = styled('div')(() => ({
   padding: '100px 134px',
   h1: {
      fontSize: '30px',
      fontWeight: '500',
      fontFamily: 'Ubuntu',
      color: '#292929',
      borderBottom: '1px solid red',
      paddingBottom: '19.5px',
      borderColor: '#CDCDCD',
   },
}));

const StyledTabs = styled(TabList)(() => ({
   '.MuiTabs-indicator': {
      height: '0',
   },
}));
const StyledTub = styled(Tab)(() => ({
   textTransform: 'inherit',
   fontFamily: 'Inter',
   fontSize: '18px',
   fontWeight: '500',
   color: '#384255',
   maxWidth: '500px',
}));
const StyledDiv = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '16px',

   span: {
      color: '#ffffff',
      width: '56px',
      height: '56px',
      backgroundColor: '#91969E',
      borderRadius: '50px',
      fontFamily: 'Inter',
      fontWeight: '600',
      fontSize: '28px',
      padding: '11px',
   },
   hr: {
      width: '30px',
      height: '0',
      border: '1px solid #384255',
   },
}));
const TabPanelStyle = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '30px',
}));
