import { Header } from '../../layout/Header';

import HistoryBasket from './HistoryBasket';
import { useDispatch, useSelector } from 'react-redux';
import { Link, IconButton as MuiIconButton } from '@mui/material';
import { Slider } from '../../components/main/Slider';
import { Icons } from '../../assets';
import { useEffect, useState } from 'react';
import { Rating, styled } from '@mui/material';
import { AdditionalInfo } from '../../components/main/AdditionalInfo';
import { IconButton } from '../../components/UI/IconButton';
import { Button } from '../../components/UI/Button';
import { NewGadgetPage } from './NewGadgetPage';
import Tooltip from '@mui/material/Tooltip';
import { gadgetDiscountsThunks } from '../../store/thunks/mainPageThunks';
import {
   gadgetBasketThunk,
   gadgetComparisonThunk,
   gadgetFavoriteThunk,
} from '../../store/thunks/mainPageCardPhoneThunks';
import { notify } from '../../components/main/SnackBar';
import { useNavigate } from 'react-router';

export const MainPage = () => {
   return (
      <div>
         <Header />
         <HistoryBasket />
      </div>
   );
};
