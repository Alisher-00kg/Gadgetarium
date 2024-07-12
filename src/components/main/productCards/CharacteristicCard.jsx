import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCardCharacteristics } from '../../../store/thunks/cardThunks';

export const CharacteristicCard = ({ id }) => {
   const dispatch = useDispatch();
   const { loading, error } = useSelector(state => state.characteristics);

   useEffect(() => {
      dispatch(getCardCharacteristics({ id }));
   }, []);

   if (loading) {
      return <p>Loading...</p>;
   }

   if (error) {
      return <p>Error: {error}</p>;
   }
   return <div>нет данных</div>;
};
