import {
   Button,
   ListItemText,
   MenuItem,
   MenuList,
   styled,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { MenuDropDown } from '../../utils/constants/menuDropDownCatolog';
import { Icons } from '../../assets';
import { useNavigate } from 'react-router';
import { getCategory, getSubCategory } from '../../store/thunks/productThunk';
import { useDispatch, useSelector } from 'react-redux';

const { GreyErrowright, Menu } = Icons;

export const MenuAccessories = ({ items, label, icon }) => {
   const dispatch = useDispatch();
   const { category, subCategory } = useSelector(state => state.category);
   const navigate = useNavigate();

   const [openDropdowns, setOpenDropdowns] = useState(new Array(4).fill(null));
   const [openDropDownCatalog, setOpenDropDownCatalog] = useState(false);
   const [selectedMenuIndex, setSelectedMenuIndex] = useState(1);
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const [catalog, setCatalog] = useState('');
   const [catalogId, setCatalogId] = useState('');

   const handleOpenDropDownGlobal = () => {
      setOpenDropDownCatalog(!openDropDownCatalog);

      if (openDropDownCatalog) {
         setIsMenuOpen(false);
      }
   };

   const getSubCategoryHandler = catalogId => {
      dispatch(getSubCategory(catalogId));
      setIsMenuOpen(true);
   };

   const handleClick = (event, index, item) => {
      const newDropdowns = [...openDropdowns];
      newDropdowns[index] = event.currentTarget;
      setOpenDropdowns(newDropdowns);
      setSelectedMenuIndex(index);
      setCatalog(item.categoryName);
      setCatalogId(item.id);

      getSubCategoryHandler(item.id);
   };

   const handleNavigate = item => {
      navigate(`catalog?catalog=${catalog}&sub-catalog=${item.categoryName}`, {
         state: {
            catalogId,
         },
      });

      setIsMenuOpen(false);
      setOpenDropDownCatalog(false);
   };

   useEffect(() => {
      dispatch(getCategory());
   }, [dispatch]);

   return (
      <div style={{ position: 'relative' }}>
         <CatalogBtn onClick={handleOpenDropDownGlobal}>
            <Menu />
            Кaталог
         </CatalogBtn>
         {openDropDownCatalog && (
            <div
               style={{ position: 'absolute', zIndex: '10', padding: '15px' }}
            >
               {category && category.length > 0
                  ? category?.map((item, index) => (
                       <CatalogContainer key={index}>
                          <ButtonStyle
                             aria-controls={
                                openDropdowns[index]
                                   ? `fade-menu-${index}`
                                   : undefined
                             }
                             aria-haspopup="true"
                             aria-expanded={
                                openDropdowns[index] ? 'true' : undefined
                             }
                             onClick={event => handleClick(event, index, item)}
                          >
                             <StyledListItemText>
                                <div>{item.categoryName}</div>
                                <GreyErrowright />
                             </StyledListItemText>
                          </ButtonStyle>
                       </CatalogContainer>
                    ))
                  : null}
            </div>
         )}
         {isMenuOpen && (
            <MenuListContainer>
               <MenuListStyle>
                  {subCategory.map((item, innerIndex) => (
                     <StyledMenuItem
                        key={innerIndex}
                        onClick={() => handleNavigate(item)}
                     >
                        {item.categoryName}
                     </StyledMenuItem>
                  ))}
               </MenuListStyle>
            </MenuListContainer>
         )}
      </div>
   );
};

const CatalogBtn = styled(Button)(() => ({
   gap: '20px',
   width: '100%',
   justifyContent: 'space-between',
   backgroundColor: 'rgb(203, 17, 171)',
   color: 'white',
   border: '1px solid rgb(203, 17, 171)',

   '&:hover': {
      border: '1px solid rgb(203, 17, 171)',
   },
}));

const ButtonStyle = styled(Button)(() => ({
   color: 'black',
   border: '0px ',
   gap: '20px',
   width: '100%',
   justifyContent: 'space-between',
   '&:hover': {
      backgroundColor: 'rgb(203, 17, 171)',
      color: 'white',
      border: '0px solid white',
   },
}));
const MenuListStyle = styled(MenuList)(() => ({
   width: '293',
   height: '392',
   color: 'black',
   bottom: '210px',
   top: '0',
}));

const StyledMenuItem = styled(MenuItem)(() => ({
   // '&:hover': {
   //    backgroundColor: 'rgb(203, 17, 171)',
   //    color: 'white',
   //    border: '0px solid white',
   // },
}));

const CatalogContainer = styled('div')(() => ({
   backgroundColor: '#fff',
   display: 'flex',
   justifyContent: 'space-between',
   width: '300px',
   alignItems: 'center',
}));

const StyledListItemText = styled(ListItemText)(() => ({
   '& .MuiTypography-root': {
      fontSize: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
   },
}));

const MenuListContainer = styled('div')(() => ({
   background: '#fff',
   position: 'absolute',
   zIndex: '10',
   padding: '20px',
   left: '310px',
   top: '54px',
}));
