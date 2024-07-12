import React, { useEffect, useState, useRef } from 'react';
import { BreadCrumbs } from '../../../components/UI/BreadCrumbs';
import { Tab, Tabs, styled } from '@mui/material';
import CheckBox from '../../../components/UI/CheckBox';
import { PhoneCard } from '../../../components/UI/cards/CardPhone';
import { useDispatch, useSelector } from 'react-redux';
import {
   comparisonClearThunks,
   comparisonDeleteThunks,
   comparisonTableThunks,
} from '../../../store/thunks/comparisionThunks';
import { Icons } from '../../../assets';
import { ComparasionTable } from './ComparisionTable';
import { ComparisionEmpty } from './ComparisionEmpty';

const breadcrumbs = [
   {
      label: 'Главная ',
      href: '/',
   },
   {
      label: 'Сравнение',
      href: '/comparision',
   },
];

const Comparision = () => {
   const { subGadgetResponses } = useSelector(state => state.comparisons);
   const { categoryCounts, subGadgetResponses: subGadget } = subGadgetResponses;
   const dispatch = useDispatch();

   const [gadgetType, setGadgetType] = useState('PHONE');
   const [isDifferences, setIsDifferences] = useState(false);
   const [startIndex, setStartIndex] = useState(0);
   const cardsPerPage = 5;
   const sum = ['Phone quantity', 'Watch quantity', 'Laptop quantity'];

   const currentSum = sum.reduce((acc, item) => {
      return acc + (categoryCounts?.[item] != null ? categoryCounts[item] : 0);
   }, 0);

   useEffect(() => {
      dispatch(comparisonTableThunks({ gadgetType, isDifferences }));
   }, [dispatch, gadgetType, isDifferences]);

   const handleClickNext = () => {
      if (startIndex + cardsPerPage < subGadget.length) {
         setStartIndex(startIndex + 1);
      }
   };

   const handleClickPrev = () => {
      if (startIndex > 0) {
         setStartIndex(startIndex - 1);
      }
   };

   const handleCheckboxChange = () => {
      setIsDifferences(!isDifferences);
   };

   const handleClearComparisons = () => {
      dispatch(comparisonClearThunks({ gadgetType, isDifferences }));
   };

   const handleDelete = id => {
      dispatch(comparisonDeleteThunks({ gadgetType, isDifferences, id }));
   };

   const cardContainerRef = useRef(null);
   const tableContainerRef = useRef(null);

   const handleCardScroll = () => {
      if (tableContainerRef.current) {
         tableContainerRef.current.scrollLeft =
            cardContainerRef.current.scrollLeft;
      }
   };

   return (
      <WrapperContainer>
         <div className="first-block">
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <BreadCrumbsTitle>Сравнение товаров</BreadCrumbsTitle>
         </div>
         {currentSum ? (
            <ContainerAllTable>
               <article>
                  <TabsStyle value={gadgetType}>
                     <AllProductIcon
                        label={`Смартфоны(${categoryCounts?.['Phone quantity'] || 0})`}
                        value="PHONE"
                        onClick={() => setGadgetType('PHONE')}
                     />
                     <AllProductIcon
                        label={`Ноутбуки(${categoryCounts?.['Laptop quantity'] || 0})`}
                        value="LAPTOP"
                        onClick={() => setGadgetType('LAPTOP')}
                     />
                     <AllProductIcon
                        label={`Наушники(${categoryCounts?.['Watch quantity'] || 0})`}
                        value={'WATCH'}
                        onClick={() => setGadgetType('WATCH')}
                     />
                  </TabsStyle>
                  <CheckboxClear>
                     <CheckboxStyleContainerm>
                        <ContainerCheckbox>
                           <CheckboxStyle
                              type="checkbox"
                              checked={isDifferences}
                              onChange={handleCheckboxChange}
                           />
                           Показывать только различия
                        </ContainerCheckbox>
                     </CheckboxStyleContainerm>
                     <TitleClear onClick={handleClearComparisons}>
                        <Icons.Delete />
                        Очистить список
                     </TitleClear>
                  </CheckboxClear>
                  <WrapperCardPhone
                     ref={cardContainerRef}
                     onScroll={handleCardScroll}
                  >
                     {subGadget
                        ?.slice(startIndex, startIndex + cardsPerPage)
                        .map(comp => (
                           <PhoneCard
                              key={comp.id}
                              id={comp.id}
                              imageUrl={comp.images}
                              description={comp.nameOfGadget}
                              price={comp.price}
                              handleDelete={handleDelete}
                           />
                        ))}
                     {startIndex > 0 && (
                        <Icons.LeftArrow
                           className="arrow-left"
                           onClick={handleClickPrev}
                        />
                     )}
                     {startIndex + cardsPerPage < subGadget.length && (
                        <Icons.RightArrowInRadio
                           className="arrow-right"
                           onClick={handleClickNext}
                        />
                     )}
                  </WrapperCardPhone>
               </article>
               <ComparasionTable
                  subGadgetResponses={subGadget}
                  cardContainerRef={cardContainerRef}
                  cardsPerPage={cardsPerPage}
                  startIndex={startIndex}
                  tableContainerRef={tableContainerRef}
               />
            </ContainerAllTable>
         ) : (
            <ComparisionEmpty />
         )}
      </WrapperContainer>
   );
};
export default Comparision;

const WrapperContainer = styled('div')(() => ({
   background: 'rgb(244, 244, 244)',
   '.first-block': {
      paddingLeft: '195px',
   },
}));

const ContainerAllTable = styled('div')(() => ({
   background: 'rgb(255, 255, 255)',
   article: {
      paddingLeft: '195px',
      position: 'relative',
   },
}));

const WrapperCardPhone = styled('div')(() => ({
   display: 'flex',
   gap: '12px',
   padding: ' 0 0 40px 80px',
   overflowX: 'scroll',
   '.arrow-right': {
      position: 'absolute',
      right: '10px',
      top: '51%',
      zIndex: '99',
      cursor: 'pointer',
   },
   '.arrow-left': {
      position: 'absolute',
      left: '13%',
      top: '51%',
      zIndex: '99',
      cursor: 'pointer',
   },
}));
const AllProductIcon = styled(Tab)(() => ({
   border: 'none',
   background: 'rgb(224, 226, 231)',
   color: 'rgb(56, 66, 85)',
   cursor: 'pointer',
   borderRadius: '4px',
   width: '133px',
   height: '36px',
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '600',
   lineHeight: '19px',
   textTransform: 'inherit',
   marginRight: '12px',
   '&.Mui-selected': {
      backgroundColor: ' rgb(56, 66, 85)',
      color: 'white',
   },
}));

const TabsStyle = styled(Tabs)(() => ({
   paddingTop: '40px',
   '.MuiTabs-indicator': {
      height: '0',
   },

   '.css-4edy47-MuiButtonBase-root-MuiTab-root.Mui-selected': {
      color: '#fffafe',
   },

   '.css-p9j71y-MuiButtonBase-root-MuiTab-root.Mui-selected': {
      color: '#fffdff',
   },
   '.css-1b4z0m1-MuiButtonBase-root-MuiTab-root.Mui-selected': {
      color: '#fffcff',
   },
   '.css-k5rlls-MuiButtonBase-root-MuiTab-root.Mui-selected': {
      color: '#fffcff',
   },
}));

const CheckboxStyleContainerm = styled('div')(() => ({
   display: 'flex',
}));

const ContainerCheckbox = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
}));

const CheckboxClear = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '35px',
   color: 'rgb(56, 66, 85)',
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '400',
   paddingBottom: '34px',
}));

const TitleClear = styled('div')(() => ({
   display: 'flex',
   gap: '6px',
   alignItems: 'center',
   cursor: 'pointer',
}));

const CheckboxStyle = styled(CheckBox)(() => ({
   '&.Mui-checked': {
      color: ' rgb(203, 17, 171)',
   },
}));

const BreadCrumbsTitle = styled('h3')(() => ({
   padding: '30px 0 20px 0',
   color: 'rgb(41, 41, 41)',
   fontFamily: 'Ubuntu',
   fontSize: '30px',
   fontWeight: '500',
}));
