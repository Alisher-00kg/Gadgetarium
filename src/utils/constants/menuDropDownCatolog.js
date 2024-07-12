import { Icons } from '../../assets';

const { PhoneIcon, DesktopIcon, WhatchIcon, HeadphonesIcon } = Icons;

export const MenuDropDown = [
   {
      icon: PhoneIcon,
      label: 'Смартфоны',
      index: 1,
      items: [
         'Iphone Pro Max 15',
         'Samsung Galaxy Tab A9',
         'Xiaomi Pro 30',
         'Infinix',
         'Realmi',
      ],
   },
   {
      icon: DesktopIcon,
      label: 'Ноутбуки и планшеты',
      index: 2,
      items: [
         'Apple Macbook Pro',
         'Xiaomi RedmiBook Pro 15',
         'Lenovo',
         'Maibenben M513',
         'Digma Pro Fortis M',
         'Honor',
      ],
   },
   {
      icon: WhatchIcon,
      index: 3,
      label: 'Смарт-часы и браслеты',
      items: [
         'Фитнес часы',
         'Смарт часы Honor',
         'Смарт часы Iphone',
         'Смарт часы Samsung',
         'Умные часы',
      ],
   },
   {
      icon: HeadphonesIcon,
      index: 4,
      label: 'Аксессуары',
      items: [
         'Ремешки для часов',
         'Зарядные устройства',
         'Защита экрана',
         'Чехлы и корпусы',
         'Подставки',
         'Кабели и адаптеры',
         'Внешние аккумуляторы',
         'Наушники',
         'Карта памяти и накопители',
      ],
   },
];
