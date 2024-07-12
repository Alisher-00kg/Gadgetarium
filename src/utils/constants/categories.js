import React from 'react';
import { Icons } from '../../assets';

const { Apple, Samsung, Huawei, Honor, Xiaomi } = Icons;
export const accessories = [
   {
      label: 'Смартфоны',
      value: 'Смартфоны',
   },
   {
      label: 'Ноутбуки и планшеты',
      value: 'Ноутбуки и планшеты',
   },
   {
      label: 'Защита экрана',
      value: 'Защита экрана',
   },
   {
      label: 'Смарт-часы и браслеты',
      value: 'Смарт-часы и браслеты',
   },
   {
      label: 'Аксессуары',
      value: 'Аксессуары',
   },
];
export const subproducts = [
   {
      label: 'Ремешки для часов',
      value: 'Ремешки для часов',
   },
   {
      label: ' Зарядные устройства ',
      value: ' Зарядные устройства ',
   },
   {
      label: 'Защита экрана ',
      value: 'Защита экрана',
   },
   {
      label: 'Чехлы и корпусы ',
      value: 'Чехлы и корпусы',
   },
   {
      label: 'Подставки',
      value: 'Подставки',
   },
   {
      label: 'Кабели и адаптеры',
      value: 'Кабели и адаптеры',
   },
   {
      label: 'Внешние аккумуляторы',
      value: 'Внешние аккумуляторы',
   },
];
export const brands = [
   {
      svg: React.createElement(Samsung, null),
      title: 'Apple',
      value: 'Apple',
   },
   {
      title: 'Apple',
      svg: React.createElement(Apple, null),
      value: 'Apple',
   },
   {
      svg: React.createElement(Huawei, null),
      title: 'Huawei',
      value: 'Huawei',
   },
   {
      svg: React.createElement(Honor, null),
      title: 'Honor',
      value: 'Honor',
   },
   {
      svg: React.createElement(Xiaomi, null),
      title: 'Xiaomi',
      value: 'Xiaomi',
   },
];
