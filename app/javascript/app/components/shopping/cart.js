import React from 'react';
import glamorous from 'glamorous';

export const Cart = ({ image, name, quantity, price }) => {
  return (
    <div>
      <div>{name}</div>
      <div>{quantity}</div>
      <div>{price}</div>
    </div>
  )
};

export default Cart;