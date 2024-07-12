import React, { useEffect, useState } from 'react';
import { PhoneCard } from '../../components/UI/cards/CardPhone';
import Card from '../../components/UI/cards/Card';
import { Button, Menu, MenuItem, Slider, styled } from '@mui/material';
import CheckBox from '../../components/UI/CheckBox';
import { Input } from '../../components/UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { smartPhoneThunks } from '../../store/thunks/smartPhoneThunks';
import { viewGadgetThunks } from '../../store/thunks/viewGadgetThunks';
import { BreadCrumbs } from '../../components/UI/BreadCrumbs';
import GreyErrowUpCentral from '../../assets/icons/grey-errow-up-central.svg?react';
import GreyErrowDownCentral from '../../assets/icons/grey-errow-downcentral.svg?react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getCategory } from '../../store/thunks/productThunk';

const brand = [
   {
      id: 1,
      name: 'Apple',
   },
   {
      id: 2,
      name: 'HP iphone 15',
   },
   {
      id: 3,
      name: 'Honor',
   },
   {
      id: 4,
      name: 'Apple MacBook',
   },
   {
      id: 5,
      name: 'Apple MackBook ',
   },
   {
      id: 6,
      name: 'Samsung',
   },
];
const colour = [
   {
      id: 1,
      colour: 'white',
   },
   {
      id: 2,
      colour: 'green',
   },
   {
      id: 3,
      colour: 'silver',
   },
   {
      id: 4,
      colour: 'black',
   },
   {
      id: 5,
      colour: 'blue ',
   },
   {
      id: 6,
      colour: 'gray',
   },
];
const memory = [
   {
      id: 1,
      memory: 'GB_512',
   },
   {
      id: 2,
      memory: 'GB_256',
   },
   {
      id: 3,
      memory: 'GB_64',
   },
   {
      id: 4,
      memory: 'GB_32',
   },
   {
      id: 5,
      memory: 'GB_16',
   },
];
const storage = [
   {
      id: 1,
      storage: '5',
   },
   {
      id: 2,
      storage: '6',
   },
   {
      id: 3,
      storage: '8',
   },
   {
      id: 4,
      storage: '10',
   },
];

const CatalogFilter = () => {
   const dispatch = useDispatch();
   const { viewgadgets } = useSelector(state => state.viewgadgets);
   const { gadgets } = useSelector(state => state.gadgets);
   const { subCategory } = useSelector(state => state.subCategory);
   const [catalogParams, setCatalogParams] = useSearchParams();
   const { state } = useLocation();

   const [isBrandVisible, setIsBrandVisible] = useState(false);
   const [isPriceVisible, setIsPriceVisible] = useState(false);
   const [isColorVisible, setIsColorVisible] = useState(false);
   const [isStorageVisible, setIsStorageVisible] = useState(false);
   const [isMemoryVisible, setIsMemoryVisible] = useState(false);
   const [isMoreColorVisible, setIsMoreColorVisible] = useState(false);
   const [isMoreStorageVisible, setIsMoreStorageVisible] = useState(false);
   const [anchorEl, setAnchorEl] = useState(null);
   const [selectedBrands, setSelectedBrands] = useState([]);
   const [selectedColors, setSelectedColors] = useState([]);
   const [selectedMemories, setSelectedMemories] = useState([]);
   const [selectedRams, setSelectedRams] = useState([]);
   const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);
   const [open, setOpen] = useState(false);
   const [submenuOpen, setSubmenuOpen] = useState(false);
   const [visibleCount, setVisibleCount] = useState(4);

   const catalogName = catalogParams.get('catalog');

   const displayedProducts = viewgadgets.slice(0, 6);

   const breadcrumbs = [
      { href: '/', label: 'Главная' },
      // { href: '/about', label: 'О нас' },
      { href: '/contact', label: catalogName },
   ];

   useEffect(() => {
      dispatch(viewGadgetThunks());
   }, [dispatch]);

   useEffect(() => {
      dispatch(
         smartPhoneThunks({
            catId: state.catalogId,
            sort: 'LOW_TO_HIGH',
            discount: 'ALL_DISCOUNTS',
            brand: selectedBrands,
            colour: selectedColors,
            costFrom: 1000,
            costUpTo: 100000,
            memory: selectedMemories,
            ram: selectedRams,
            page: 1,
            size: 10,
         }),
      );
   }, [
      dispatch,
      selectedBrands,
      selectedColors,
      selectedMemories,
      selectedRams,
   ]);
   const handleFilterChange = (setter, value) => {
      setter(prev => {
         if (prev.includes(value)) {
            return prev.filter(item => item !== value);
         } else {
            return [...prev, value];
         }
      });
   };
   const handleToggleVisibility = setter => {
      setter(prev => !prev);
   };
   const showMore = () => {
      setVisibleCount(prevCount => prevCount + 4);
   };
   const showLess = () => {
      setVisibleCount(4);
   };
   const allItemsVisible = visibleCount >= gadgets?.responses?.length;
   const totalItems = gadgets?.responses?.length || 0;

   const handleClick = event => {
      setAnchorEl(event.currentTarget);
      setOpen(true);
   };
   const handleClose = () => {
      setAnchorEl(null);
      setOpen(false);
      setSubmenuOpen(false);
   };

   const handleSubmenuClick = event => {
      setSubmenuAnchorEl(event.currentTarget);
      setSubmenuOpen(true);
   };

   const handleSubmenuClose = () => {
      setSubmenuAnchorEl(null);
      setSubmenuOpen(false);
   };

   return (
      <BigContainer>
         <BreadCrumbs breadcrumbs={breadcrumbs} />
         <GadgedTitle>{catalogName}</GadgedTitle>
         <SortContainer>
            <TitleProduct>Найдено товаров({totalItems})</TitleProduct>
            <IconSortCental>
               <p>Сортировать</p>

               <div>
                  {open ? (
                     <GreyErrowUpCentral
                        id="fade-button"
                        onClick={handleClose}
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                     />
                  ) : (
                     <GreyErrowDownCentral
                        id="fade-button"
                        onClick={handleClick}
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                     />
                  )}
               </div>

               <Menu
                  MenuListProps={{
                     'aria-labelledby': 'fade-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                     vertical: 'top',
                     horizontal: 'right',
                  }}
                  transformOrigin={{
                     vertical: 'top',
                     horizontal: 'right',
                  }}
               >
                  <MenuItem>Новинки</MenuItem>
                  <MenuItem
                     id="fade-button"
                     onClick={handleSubmenuClick}
                     aria-controls={submenuOpen ? 'submenu' : undefined}
                     aria-haspopup="true"
                     aria-expanded={submenuOpen ? 'true' : undefined}
                  >
                     По акции
                  </MenuItem>
                  <MenuItem>Рекомендуемые</MenuItem>
                  <MenuItem>По увеличению цены</MenuItem>
                  <MenuItem>По уменьшению цены</MenuItem>
               </Menu>

               <Menu
                  id="submenu"
                  anchorEl={submenuAnchorEl}
                  open={submenuOpen}
                  onClose={handleSubmenuClose}
                  anchorOrigin={{
                     vertical: 'top',
                     horizontal: 'right',
                  }}
                  transformOrigin={{
                     vertical: 'top',
                     horizontal: 'left',
                  }}
               >
                  <MenuItem>Все акции</MenuItem>
                  <MenuItem>До 50%</MenuItem>
                  <MenuItem>Свыше 50%</MenuItem>
               </Menu>
            </IconSortCental>
         </SortContainer>

         <FilterSmartPhone>
            <MenuCatalog>
               <CategoryIconDiv>
                  <ResetFilter
                     onClick={() => {
                        setSelectedBrands([]);
                        setSelectedColors([]);
                        setSelectedMemories([]);
                        setSelectedRams([]);
                     }}
                  >
                     Сбросить все фильтры
                  </ResetFilter>
                  <IconCatDiv
                     onClick={() => handleToggleVisibility(setIsBrandVisible)}
                  >
                     <StyleCategory>Категория </StyleCategory>
                     <div>
                        {isBrandVisible ? <GreyUpStyle /> : <GreyDownStyle />}
                     </div>
                  </IconCatDiv>

                  {isBrandVisible && (
                     <BrandName>
                        {subCategory.map(smartphone => (
                           <div key={smartphone.id}>
                              <CheckboxStyle
                                 type="checkbox"
                                 onChange={() =>
                                    handleFilterChange(
                                       setSelectedBrands,
                                       smartphone.categoryName,
                                    )
                                 }
                                 checked={selectedBrands.includes(
                                    smartphone.categoryName,
                                 )}
                                 label={smartphone.categoryName}
                              />
                           </div>
                        ))}
                     </BrandName>
                  )}

                  <StylePriceInputBox>
                     <IconCatDiv
                        onClick={() =>
                           handleToggleVisibility(setIsPriceVisible)
                        }
                     >
                        <StyleCategory>Стоимость</StyleCategory>
                        <div>
                           {isPriceVisible ? (
                              <GreyUpStyle />
                           ) : (
                              <GreyDownStyle />
                           )}
                        </div>
                     </IconCatDiv>
                     {isPriceVisible && (
                        <InputBoxStyle>
                           <PriceValume>
                              <StyleInput placeholder="от" />
                              <StyleInput placeholder="до" />
                           </PriceValume>
                           <div style={{ paddingLeft: '10px' }}>
                              <Slider sx={{ width: '240px' }} />
                           </div>
                        </InputBoxStyle>
                     )}
                  </StylePriceInputBox>
                  <IconCatDiv
                     onClick={() => handleToggleVisibility(setIsColorVisible)}
                  >
                     <StyleCategory>Цвет </StyleCategory>
                     <div>
                        {isColorVisible ? <GreyUpStyle /> : <GreyDownStyle />}
                     </div>
                  </IconCatDiv>

                  <div>
                     {isColorVisible && (
                        <>
                           {colour.map(color => (
                              <CheckboxStyle
                                 type="checkbox"
                                 key={color.id}
                                 label={color.colour}
                                 onChange={() =>
                                    handleFilterChange(
                                       setSelectedColors,
                                       color.colour,
                                    )
                                 }
                                 checked={selectedColors.includes(color.colour)}
                              />
                           ))}
                           <div>
                              <div>
                                 <BoxIconst>
                                    {isMoreColorVisible ? (
                                       <BlueVisiBLE
                                          onClick={() =>
                                             handleToggleVisibility(
                                                setIsMoreColorVisible,
                                             )
                                          }
                                       />
                                    ) : (
                                       <SeconBlueIcON
                                          onClick={() =>
                                             handleToggleVisibility(
                                                setIsMoreColorVisible,
                                             )
                                          }
                                       />
                                    )}
                                    <p>
                                       {isMoreColorVisible ? 'Скрыть' : 'Еще'}
                                    </p>
                                 </BoxIconst>
                              </div>
                           </div>
                        </>
                     )}
                  </div>

                  <IconCatDiv
                     onClick={() => handleToggleVisibility(setIsStorageVisible)}
                  >
                     <StyleCategory> Объем памяти (GB)</StyleCategory>
                     <div>
                        {isStorageVisible ? <GreyUpStyle /> : <GreyDownStyle />}
                     </div>
                  </IconCatDiv>
                  <div>
                     {isStorageVisible && (
                        <>
                           {memory.map(GB => (
                              <CheckboxStyle
                                 type="checkbox"
                                 key={GB.id}
                                 label={GB.memory}
                                 onChange={() =>
                                    handleFilterChange(
                                       setSelectedMemories,
                                       GB.memory,
                                    )
                                 }
                                 checked={selectedMemories.includes(GB.memory)}
                              />
                           ))}
                           <div>
                              <div>
                                 <BoxIconst>
                                    {isMoreStorageVisible ? (
                                       <BlueVisiBLE
                                          onClick={() =>
                                             handleToggleVisibility(
                                                setIsMoreStorageVisible,
                                             )
                                          }
                                       />
                                    ) : (
                                       <SeconBlueIcON
                                          onClick={() =>
                                             handleToggleVisibility(
                                                setIsMoreStorageVisible,
                                             )
                                          }
                                       />
                                    )}
                                    <p>
                                       {isMoreStorageVisible ? 'Скрыть' : 'Еще'}
                                    </p>
                                 </BoxIconst>
                              </div>
                           </div>
                        </>
                     )}
                  </div>

                  <div>
                     <IconCatDiv
                        onClick={() =>
                           handleToggleVisibility(setIsMemoryVisible)
                        }
                     >
                        <StyleCategory>
                           Объем оперативной памяти (GB)
                        </StyleCategory>
                        <div>
                           {isMemoryVisible ? (
                              <GreyUpStyle />
                           ) : (
                              <GreyDownStyle />
                           )}
                        </div>
                     </IconCatDiv>
                  </div>
                  {isMemoryVisible &&
                     storage.map(mem => (
                        <CheckboxStyle
                           key={mem.id}
                           type="checkbox"
                           label={mem.storage}
                           onChange={() =>
                              handleFilterChange(setSelectedRams, mem.storage)
                           }
                           checked={selectedRams.includes(mem.storage)}
                        />
                     ))}
               </CategoryIconDiv>
            </MenuCatalog>

            <PhoneCardContainer>
               {gadgets?.responses?.map(gadget => (
                  <PhoneCard
                     key={gadget.gadgetId}
                     parcent={gadget.parcent}
                     imageUrl={gadget.image}
                     quantity={gadget.quantity}
                     decscription={gadget.brandNameOfGadget}
                     memory={gadget.memory}
                     color={gadget.colour}
                     price={gadget.price}
                     currentPrice={gadget.currentPrice}
                     rating={gadget.rating}
                     amountRating={gadget.countOfRating}
                     percent={gadget.percent}
                     {...gadget}
                  />
               ))}
            </PhoneCardContainer>
         </FilterSmartPhone>
         <StyleButtun>
            <div>
               {!allItemsVisible && (
                  <Button variant="outlined" onClick={showMore}>
                     Показать больше
                  </Button>
               )}
               {allItemsVisible && visibleCount > 4 && (
                  <Button variant="outlined" onClick={showLess}>
                     Скрыть
                  </Button>
               )}
            </div>
         </StyleButtun>
         <h3>Просмотренные товары</h3>
         <SeeProduct>
            {displayedProducts.map(product => (
               <Card
                  key={product.id}
                  title={product.nameOfGadget}
                  image={product.image}
                  price={product.price}
                  number={product.rating}
               />
            ))}
         </SeeProduct>
      </BigContainer>
   );
};

export default CatalogFilter;

const BigContainer = styled('div')(() => ({
   background: 'rgb(244, 244, 244)',
   paddingLeft: '35px',
   overflow: 'hidden',
}));

const GadgedTitle = styled('div')(() => ({
   color: 'rgb(41, 41, 41)',
   fontFamily: 'Ubuntu',
   fontSize: '30px',
   fontWeight: '500',
   borderBottom: '1px solid rgb(205, 205, 205)',
   width: '97.6%',
   paddingBottom: '19px',
   paddingTop: '30px',
}));
const ResetFilter = styled('h4')(() => ({
   color: 'rgb(44, 104, 245)',
   fontFamily: 'Inter',
   fontSize: '16px',
   fontWeight: '500',
   borderBottom: '1px solid rgb(205, 205, 205)',
   paddingBottom: '20px',
   cursor: 'pointer',
   padding: '30px',
}));
const PhoneCardContainer = styled('div')({
   display: 'grid',
   gridTemplateColumns: 'repeat(4, 1fr)',
   gap: '5px',
   height: '100%',
});
const CategoryIconDiv = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
}));
const StyleCategory = styled('h3')(() => ({
   color: 'rgb(56, 66, 85)',
   fontFamily: 'Inter',
   fontSize: '13.5px',
   fontWeight: '600',
   lineHeight: '19px',
}));
const IconCatDiv = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   cursor: 'pointer',
   padding: '30px',

   '&:hover': {
      background: '#d0d0d0',
   },
}));
const StylePriceInputBox = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
}));
const BrandName = styled('div')(() => ({
   padding: '0 30px 30px 30px',
   color: 'rgb(41, 41, 41)',
   fontFamily: 'Inter',
   fontSize: '16px',
   fontWeight: '400',
}));
const InputBoxStyle = styled('div')(() => ({
   display: 'flex',
   gap: '20px',
   flexDirection: 'column',
}));

const MenuCatalog = styled('div')(() => ({
   borderRadius: '4px 0px 0px 4px',
   background: ' rgb(255, 255, 255)',
   minWidth: '300px',
   height: '100%',
}));
const FilterSmartPhone = styled('div')(() => ({
   display: 'flex',
   gap: '20px',
}));

const SeeProduct = styled('div')(() => ({
   display: 'flex',
}));
const StyleButtun = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   padding: '10px 10px',
}));
const BoxIconst = styled('div')(() => ({
   display: 'flex',
   color: 'blue',
}));
const StyleInput = styled(Input)(() => ({
   '.MuiInputBase-root': {
      width: '122px',
      height: '37px',
   },
}));
const PriceValume = styled('div')(() => ({
   display: 'flex',
   gap: '20px',
}));
const GreyUpStyle = styled(GreyErrowUpCentral)(() => ({
   path: {
      fill: 'rgb(203, 17, 171);',
      stroke: 'rgb(203, 17, 171);',
   },
}));
const GreyDownStyle = styled(GreyErrowDownCentral)(() => ({
   path: {
      fill: 'rgb(203, 17, 171);',
      stroke: 'rgb(203, 17, 171);',
   },
}));

const BlueVisiBLE = styled(GreyErrowUpCentral)(() => ({
   path: {
      fill: 'blue',
      stroke: 'blue',
   },
}));
const SeconBlueIcON = styled(GreyErrowDownCentral)(() => ({
   path: {
      fill: 'blue',
      stroke: 'blue',
   },
}));

const SortContainer = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   padding: '20px 10px',
}));
const IconSortCental = styled('div')(() => ({
   display: 'flex',
   paddingRight: '30px',
}));

const TitleProduct = styled('div')(() => ({
   color: 'rgb(145, 150, 158)',
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '400',
}));

const CheckboxStyle = styled(CheckBox)(() => ({
   '&.Mui-checked': {
      color: ' rgb(203, 17, 171)',
   },
}));
