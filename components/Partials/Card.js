import React from 'react';

const Card = ({ children, className }) => (
  <div className={`bg-white shadow-2xl rounded-3xl ${className || ''}`}>
    {children}
  </div>
);

export default Card;
