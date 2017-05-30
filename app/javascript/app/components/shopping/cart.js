import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Glyphicon } from 'react-bootstrap';
import InputCount from '../products/input-count';

const CartContainer = glamorous.div({
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-between',
  backgroundColor: '#fff',
  padding: '10px',
  border: '1px solid rgba(0,0,0,0.15)',
  borderRadius: '5px',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    borderColor: 'rgba(26, 188, 156,1.0)'
  }
});

const CartInfo = glamorous.div({
  textAlign: 'center',
  minWidth: '180px',
  minHeight: '50px',
  padding: '0 10px',
  fontWeight: 'bold',
  display: 'flex',
  flexFlow: 'column wrap',
  justifyContent: 'center',
  alignItems: 'center'
});

const CartActions = glamorous.div({
  marginTop: '20px',
  height: '35',
  width: '50px',
  padding: '0 5px'
});

const CartTitle = glamorous.span({
  textAlign: 'center',
  fontSize: '12px',
  color: 'rgba(149, 165, 166,1.0)',
  display: 'block',
  height: '20px'
});

const CartText = glamorous.div({
  minHeight: '30px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

export const Cart = ({ id, name, quantity, price, handleChange, deleteCart }) => (
  <CartContainer>
    <CartActions>
      <Button
        bsStyle="danger"
        onClick={() => { deleteCart(id); }}
      >
        <Glyphicon glyph="trash" />
      </Button>
    </CartActions>
    <CartInfo className="text-bold text-blue-flat width-300">
      <CartTitle>Name</CartTitle>
      <CartText>
        <Link to={`products/${id}`}>
          {name}
        </Link>
      </CartText>
    </CartInfo>
    <CartInfo>
      <CartTitle>Price</CartTitle>
      <CartText>
        ${price}
      </CartText>
    </CartInfo>
    <CartInfo>
      <CartTitle>Quantity</CartTitle>
      <CartText>
        <InputCount
          value={Number(quantity)}
          handleChange={
            (count) => { handleChange(id, count); }
          }
        />
      </CartText>
    </CartInfo>
    <CartInfo>
      <CartTitle>Cost</CartTitle>
      <CartText>
        ${(price * quantity).toFixed(2)}
      </CartText>
    </CartInfo>
  </CartContainer>
);

Cart.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  deleteCart: PropTypes.func.isRequired
};

export default Cart;
