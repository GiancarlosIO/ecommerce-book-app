import React, { Component } from 'react';
import { connect } from 'react-redux';
import glamorous from 'glamorous';
import {

} from 'react-bootstrap';

import Cart from './cart';

export const CartList = ({carts}) => {

  const renderCarts = () => {
    return Object.keys(carts).map( i => {
      const cart = carts[`${i}`];
      return (
        <Cart key={cart.id} {...cart} />
      );
    });
  }

  return (
    <div>
      {
        renderCarts()
      }
    </div>
  )
}

export default CartList;