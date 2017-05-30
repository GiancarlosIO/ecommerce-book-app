import React from 'react';
import PropTypes from 'prop-types';
import {

} from 'react-bootstrap';

import Cart from './cart';

export const CartList = ({ carts, handleChange, deleteCart }) => {
  const renderCarts = () =>
    Object.keys(carts).map((i) => {
      const cart = carts[`${i}`];
      return (
        <Cart
          key={cart.id}
          {...cart}
          handleChange={handleChange}
          deleteCart={deleteCart}
        />
      );
    });

  return (
    <div className="padding-20">
      {
        renderCarts()
      }
    </div>
  );
};

CartList.propTypes = {
  carts: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number,
    quantity: PropTypes.number,
    image: PropTypes.string
  })).isRequired,
  handleChange: PropTypes.func.isRequired,
  deleteCart: PropTypes.func.isRequired
};

export default CartList;
