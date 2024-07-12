import React from 'react';
import { MenuDropDown } from './MenuDropDown';

const MenuAccessoriesItem = () => {
   return (
      <div>
         {MenuDropDown.map((item, index) => (
            <MenuAccessoriesItem key={index} item={item} />
         ))}
      </div>
   );
};

export default MenuAccessoriesItem;
