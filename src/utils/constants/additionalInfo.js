import { Icons } from '../../assets';
import React from 'react';

const { Distributor, DeliveryServis, AddCardForPayment, HandShake, Settings } =
   Icons;
export const additional = [
   {
      id: 1,
      svg: React.createElement(Distributor, null),
      description: 'Официальный дистрибьютер',
   },
   {
      id: 2,
      svg: React.createElement(Settings, null),
      description: 'Гарантийное обслуживание',
   },
   {
      id: 3,
      svg: React.createElement(AddCardForPayment, null),
      description: 'Оплата любым удобным способом',
   },
   {
      id: 4,
      svg: React.createElement(HandShake, null),
      description: 'Оптовые продажи',
   },
   {
      id: 5,
      svg: React.createElement(DeliveryServis, null),
      description: 'Доставка в любой регион Кыргызстана',
   },
];
