import React, { useState } from 'react';
import { SecondProgressBar } from './SecondProgressBar';
import { PaymentMethod } from './PaymentMethod';
import { OrderReview } from '../orderReview/OrderReview';

export const Payment = () => {
   const [showThirdPart, setShowThirdPart] = useState(true);
   const handleSubmitThirdPart = () => {
      setShowThirdPart(!showThirdPart);
   };

   return (
      <>
         {showThirdPart ? (
            <>
               <SecondProgressBar />
               <PaymentMethod onSubmit={handleSubmitThirdPart} />
            </>
         ) : (
            <OrderReview />
         )}
      </>
   );
};
