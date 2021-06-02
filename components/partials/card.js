import React from 'react';

const Card = ({ children, className, noShadow }) => (
  <div
    className={`bg-white ${noShadow ? '' : 'shadow-2xl'} rounded-3xl ${
      className || ''
    }`}
  >
    {children}
  </div>
);

export default Card;
