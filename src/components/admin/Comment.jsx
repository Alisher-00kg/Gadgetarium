import React from 'react';
import { format } from 'date-fns';

const formatDate = date => {
   const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
   };
   return date.toLocaleDateString(undefined, options);
};

const Comment = ({ comment }) => {
   const date = new Date();
   return (
      <div>
         <p>{comment}</p>
         <p>{format(new Date(date), 'dd.MM.yyyy')}</p>
      </div>
   );
};
export default Comment;
