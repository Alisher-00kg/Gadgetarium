import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   deleteAllGadgets,
   deleteProductBasket,
   getProductsBasket,
   patchBasket,
   postBasketFavorite,
   postBasketFavoriteId,
} from '../../../store/thunks/productBasketThunks';
import { Rating, styled } from '@mui/material';
import MinusIcon from '../../../assets/icons/minus.svg?react';
import PlusIcon from '../../../assets/icons/plus.svg?react';
import FavoriteIcon from '../../../assets/icons/heart.svg?react';
import FavoriteRedIcon from '../../../assets/icons/heart-red.svg?react';
import DeleteIcon from '../../../assets/icons/delete.svg?react';
import Delete from '../../../assets/icons/delete-сhoice.svg?react';
import CheckBox from '../../UI/CheckBox';
import { OrderAmount } from './OrderAmount';
import { Shopping } from './Shopping';
export const ProductsBasket = () => {
   const dispatch = useDispatch();
   const { products } = useSelector(state => state.basketProducts);
   const [checked, setChecked] = useState({});
   const [counts, setCounts] = useState({});
   const [selectAllChecked, setSelectAllChecked] = useState(false);
   const [selectedFavoriteId, setSelectedFavoriteId] = useState(null);
   const [selectedFavorite, setSelectedFavorite] = useState(false);

   const handleChange = id => {
      setChecked(prev => ({
         ...prev,
         [id]: !prev[id],
      }));
   };

   //    const increment = id => {
   //       setCounts(prevCounts => ({
   //          ...prevCounts,
   //          [id]: (prevCounts[id] || 1) + 1,
   //       }));
   //    };
   const increment = id => {
      setCounts(prevCounts => {
         const newCount = (prevCounts[id] || 1) + 1;
         dispatch(patchBasket({ subGadgetId: id, quantity: newCount }));
         return {
            ...prevCounts,
            [id]: newCount,
         };
      });
   };

   const decrement = id => {
      setCounts(prevCounts => {
         const newCount = Math.max((prevCounts[id] || 1) - 1, 1);
         dispatch(patchBasket({ subGadgetId: id, quantity: newCount }));
         return {
            ...prevCounts,
            [id]: newCount,
         };
      });
   };
   //    const decrement = id => {
   //       setCounts(prevCounts => ({
   //          ...prevCounts,
   //          [id]: Math.max((prevCounts[id] || 1) - 1, 1),
   //       }));
   //    };

   useEffect(() => {
      dispatch(getProductsBasket());
   }, [dispatch]);

   const handleFavorite = id => {
      setSelectedFavoriteId(id);
      if (id !== selectedFavoriteId) {
         dispatch(postBasketFavoriteId(id));
      }
   };

   useEffect(() => {
      const allChecked = Object.values(checked).every(value => value);
      setSelectAllChecked(allChecked);
   }, [checked]);

   const handleDeleteProduct = id => {
      dispatch(deleteProductBasket(id));
   };

   const handleDeleteAllGadgets = () => {
      const idsToDelete = Object.keys(checked).filter(id => checked[id]);
      if (idsToDelete.length > 0) {
         dispatch(deleteAllGadgets({ ids: idsToDelete }));
      }
   };

   const handleCheckAll = () => {
      const newChecked = {};
      const newSelectAllChecked = !selectAllChecked;

      products.forEach(product => {
         newChecked[product.id] = newSelectAllChecked;
      });

      setChecked(newChecked);
      setSelectAllChecked(newSelectAllChecked);
   };

   if (products.length === 0) {
      return <Shopping />;
   }

   const totalPrice = products.reduce((sum, product) => {
      const count = counts[product.id] || 1;
      return sum + product.price * count;
   }, 0);

   const totalQuantity = products.reduce((sum, product) => {
      const count = counts[product.id] || 1;
      return sum + count;
   }, 0);

   const handleAllFavorite = () => {
      const ids = Object.keys(checked)
         .filter(id => checked[id])
         .map(Number);
      if (ids.length > 0) {
         dispatch(postBasketFavorite(ids));
      }
      setSelectedFavorite(true);
   };

   return (
      <Wrapper>
         <Title>Товары в корзине</Title>
         <Line></Line>
         <TitleBlock>
            <div>
               <CheckBoxStyle
                  checked={products.length > 0 && selectAllChecked}
                  onChange={handleCheckAll}
                  type="checkbox"
               />
               <span>Отметить все</span>
            </div>
            <div>
               <Delete onClick={handleDeleteAllGadgets} />
               <span onClick={handleDeleteAllGadgets}>Удалить</span>
            </div>
            <div>
               {/* <FavoriteIcon /> */}
               {selectedFavorite ? (
                  <FavoriteRedIcon style={{ width: '16px', height: '16px' }} />
               ) : (
                  <FavoriteIcon onClick={handleAllFavorite} />
               )}
               <span onClick={handleAllFavorite}>Переместить в избранное</span>
            </div>
         </TitleBlock>
         <Box>
            <div
               style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
               {products.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '20px' }}>
                     <CheckBoxStyle
                        checked={!!checked[item.id]}
                        onChange={() => handleChange(item.id)}
                        type="checkbox"
                     />
                     <Container>
                        <ImageStyle src={item.image} alt="" />
                        <Block>
                           <div style={{ display: 'flex', gap: '40px' }}>
                              <MiniBlock>
                                 <GadgetNameStyle>
                                    {item.nameOfGadget}
                                 </GadgetNameStyle>
                                 <Rating
                                    readOnly
                                    value={item.rating}
                                    precision={0.5}
                                 />
                                 <GadgetQuantityStyle>
                                    В наличии ({item.quantity})
                                 </GadgetQuantityStyle>
                              </MiniBlock>
                              <BloclQuantity>
                                 <div>
                                    <MinusIcon
                                       onClick={() => decrement(item.id)}
                                    />
                                    <p>{counts[item.id] || 1}</p>
                                    <PlusIcon
                                       onClick={() => increment(item.id)}
                                    />
                                 </div>
                                 <span>
                                    <span>{item.price}</span>
                                 </span>
                              </BloclQuantity>
                           </div>
                           <div style={{ display: 'flex', gap: '240px' }}>
                              <GadgetArticleStyle>
                                 Код товара: {item.article}
                              </GadgetArticleStyle>
                              <BlockIcons>
                                 {selectedFavoriteId === item.id ? (
                                    <FavoriteRedIcon
                                       style={{ width: '16px', height: '16px' }}
                                    />
                                 ) : (
                                    <FavoriteIcon
                                       onClick={() => handleFavorite(item.id)}
                                    />
                                 )}
                                 <span onClick={() => handleFavorite(item.id)}>
                                    В избранное
                                 </span>
                                 <DeleteIcon
                                    onClick={() => handleDeleteProduct(item.id)}
                                 />
                                 <span
                                    onClick={() => handleDeleteProduct(item.id)}
                                 >
                                    Удалить
                                 </span>
                              </BlockIcons>
                           </div>
                        </Block>
                     </Container>
                  </div>
               ))}
            </div>
            <OrderAmount
               totalPrice={totalPrice}
               totalQuantity={totalQuantity}
            />
         </Box>
      </Wrapper>
   );
};

const Container = styled('div')(() => ({
   width: '769px',
   height: '170px',
   borderRadius: '4px',
   background: '#ffffff',
   padding: '20px 0px 0px 20px',
   display: 'flex',
   gap: '40px',
}));
const ImageStyle = styled('img')(() => ({
   width: '106px',
   height: '121px',
}));
const GadgetNameStyle = styled('p')(() => ({
   fontFamily: 'Inter',
   fontWeight: '400',
   fontSize: '18px',
   width: '250px',
}));
const GadgetQuantityStyle = styled('p')(() => ({
   fontFamily: 'Inter',
   fontWeight: '500',
   fontSize: '12px',
   color: '#3cde14',
}));
const GadgetArticleStyle = styled('p')(() => ({
   fontFamily: 'Inter',
   fontWeight: '400',
   fontSize: '14px',
}));
const Block = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
   paddingTop: '5px',
}));
const BloclQuantity = styled('div')(() => ({
   display: 'flex',
   gap: '30px',
   alignItems: 'center',
   div: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
   },
   span: {
      fontFamily: 'Inter',
      fontWeight: '700',
      fontSize: '18px',
   },
   svg: {
      cursor: 'pointer',
   },
}));

const BlockIcons = styled('div')(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '5px',
   svg: {
      cursor: 'pointer',
   },
   span: {
      cursor: 'pointer',
   },
}));
const Wrapper = styled('div')(() => ({
   background: '#e8e8e8',
   padding: '90px',
   display: 'flex',
   flexDirection: 'column',
   gap: '20px',
}));
const MiniBlock = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
}));
const Title = styled('h1')(() => ({
   fontFamily: 'Ubuntu',
   fontSize: '30px',
   fontWeight: '500',
}));
const Line = styled('div')(() => ({
   width: '100%',
   borderBottom: '1px solid #cdcdcd',
}));
const TitleBlock = styled('div')(() => ({
   display: 'flex',
   gap: '40px',

   div: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      svg: {
         cursor: 'pointer',
      },
      span: {
         cursor: 'pointer',
      },
   },
}));
const CheckBoxStyle = styled(CheckBox)(() => ({
   '&.Mui-checked': {
      color: ' rgb(203, 17, 171)',
   },
}));

const Box = styled('div')(() => ({
   display: 'flex',
   gap: '50px',
}));
