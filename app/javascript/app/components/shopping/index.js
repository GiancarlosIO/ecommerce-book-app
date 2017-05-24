import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Jumbotron
} from 'react-bootstrap';

import {
  setCartQuantity,
  deleteCart,
  calculateTotal
} from '../../actions/shop-actions';

import CartList from './cart-list';

export class Shopping extends Component {

  handleChange = (id, quantity) => {
    console.log('id cart', id);
    console.log('quantity cart', quantity);
    this.props.dispatch(setCartQuantity(id, quantity));
    this.props.dispatch(calculateTotal());
  }

  deleteCart = (id) => {
    this.props.dispatch(deleteCart(id));
  }

  render() {
    const { carts, subtotal, total } = this.props;

    return Object.keys(carts).length > 0 ?
      (
        <Jumbotron>
          <CartList carts={carts} handleChange={this.handleChange} deleteCart={this.deleteCart} />
          <div className="padding-20 text-right">
            <div>
              Subtotal:
              <span className="text-title margin-left-15">
                ${subtotal}
              </span>
            </div>
            <div>
              IGV:
              <span className="text-title margin-left-15">
                ${(subtotal*0.18).toFixed(2)}
              </span>
            </div>
            <div>
              Total:
              <span className="text-24 text-red-flat margin-left-15">
                ${total}
              </span>
            </div>
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