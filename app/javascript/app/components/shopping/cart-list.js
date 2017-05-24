import React, { Component } from 'react';
import { connect } from 'react-redux';
import glamorous from 'glamorous';
import {

} from 'react-bootstrap';

import Cart from './cart';

export const CartList = ({carts, handleChange, deleteCart}) => {

  const renderCarts = () => {
    return Object.keys(carts).map( i => {
      const cart = carts[`${i}`];
      return (
        <Cart
          key={cart.id} {...cart}
          handleChange={handleChange}
          deleteCart={deleteCart}
        />
      );
    });
  }

  return (
    <div className="padding-20">
      {
        renderCarts()
      }
    </div>
  )
}

export default CartList;