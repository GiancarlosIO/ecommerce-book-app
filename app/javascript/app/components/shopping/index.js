import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Jumbotron
} from 'react-bootstrap';

import CartList from './cart-list';

export class Shopping extends Component {
  render() {
    const { carts, subtotal, total } = this.props;

    return Object.keys(carts).length > 0 ?
      (
        <Jumbotron>
          <CartList carts={carts} />
          <div>
            <span>subtotal: {subtotal}</span> <br />
            <span>Total: {total} </span>
          </div>
        </Jumbotron>
      ) :
      (
        <div className="padding-20">
          <h2>You has 0 products, <Link to="/products">go back to products page</Link> and add some products to cart</h2>
          <Link to="/products">Go to Products Page</Link>
        </div>
      )
  }
}


const mapStateToProps = (state) => ({
  carts: state.shop.productsInCart,
  subtotal: state.shop.subtotal,
  total: state.shop.total
});

export default connect(mapStateToProps)(Shopping);