import React from 'react';
import glamorous from 'glamorous';

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

export const Cart = ({ id, image, name, quantity, price, handleChange, deleteCart }) => {
  return (
    <CartContainer>
      <CartActions>
        <Button
          bsStyle="danger"
          onClick={ () => {deleteCart(id)} }
        >
          <Glyphicon glyph="trash" />
        </Button>
      </CartActions>
      <CartInfo className="text-bold text-blue-flat width-300">
        <CartTitle>name</CartTitle>
        <CartText>
          <Link to={`products/${id}`}>
            {name}
          </Link>
        </CartText>
      </CartInfo>
      <CartInfo>
        <CartTitle>price</CartTitle>
        <CartText>
          ${price}
        </CartText>
      </CartInfo>
      <CartInfo>
        <CartTitle>quantity</CartTitle>
        <CartText>
          <InputCount
            value={Number(quantity)}
            handleChange={
              (count) => { handleChange(id, count) }
            }
          />
        </CartText>
      </CartInfo>
      <CartInfo>
        <CartTitle>Cost</CartTitle>
        <CartText>
          ${(price*quantity).toFixed(2)}
        </CartText>
      </CartInfo>
    </CartContainer>
  )
};

export default Cart;