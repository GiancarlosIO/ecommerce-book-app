import React, { Component } from 'react';
import glamorous from 'glamorous';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Modal
} from 'react-bootstrap';

import {
  setCartQuantity,
  deleteCart,
  calculateTotal
} from '../../actions/shop-actions';

import {
  deleteCreditCard,
  updateCard,
  setCardMessage,
  getCreditCards
} from '../../actions/auth-actions';

import CartList from './cart-list';
import Cards from '../profile/cards';

const ShoppingContainer = glamorous.div({
  background: 'rgba(236, 240, 241,1.0)',
  padding: '10px 20px'
})

const TotalContainer = glamorous.div({
  margin: '0 20px',
  padding: '10px 40px',
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'center',
  alignItems: 'flex-end',
  backgroundColor: '#fff'
});

const ShoppingActions = glamorous.div({
  padding: '20px',
  textAlign: 'right'
});

export class Shopping extends Component {

  state = {
    showModal: false,
    loadingCards: false,
  }

  hideModal = () => this.setState({ showModal: false });
  showModal = () => this.setState({ showModal: true });

  handleChange = (id, quantity) => {
    this.props.dispatch(setCartQuantity(id, quantity));
    this.props.dispatch(calculateTotal());
  }

  deleteCart = (id) => {
    this.props.dispatch(deleteCart(id));
    this.props.dispatch(calculateTotal());
  }

  setCardDefault = (id) => this.props.dispatch(updateCard(id));
  deleteCard = (id) => this.props.dispatch(deleteCreditCard(id));
  clearMessage = () => this.props.dispatch(setCardMessage(null));

  componentDidMount() {
    this.setState({loadingCards: true}, () => {
      this.props.dispatch(getCreditCards())
        .then( () => this.setState({ loadingCards: false }) );
    })
  }

  render() {
    const { carts, subtotal, total, creditCards, message } = this.props;
    const { showModal, loadingCards } = this.state;

    return Object.keys(carts).length > 0 ?
      (
        <ShoppingContainer>
          <div className="padding-20">
            <h2 className="text-bold">
              Products in Cart:
            </h2>
          </div>
          <CartList carts={carts} handleChange={this.handleChange} deleteCart={this.deleteCart} />
          <TotalContainer>
            <div className="width-min-200">
              <span className="display-inBlock width-min-100">
                Subtotal:
              </span>
              <span className="text-blue-flat text-right text-title margin-left-15 display-inBlock width-min-100">
                ${Number(subtotal).toFixed(2)}
              </span>
            </div>
            <div>
              <span className="display-inBlock width-min-100">
                IGV:
              </span>
              <span className="text-green-flat text-right text-title margin-left-15 display-inBlock width-min-100">
                ${(subtotal*0.18).toFixed(2)}
              </span>
            </div>
            <div>
              <span className="display-inBlock width-min-100 text-title text-bold">
                Total:
              </span>
              <span className="text-right text-bold text-title text-red-flat margin-left-15 display-inBlock width-min-100">
                ${Number(total).toFixed(2)}
              </span>
            </div>
          </TotalContainer>
          <ShoppingActions>
            <Button bsStyle="success" onClick={this.showModal}>
              Check-out
            </Button>
          </ShoppingActions>
          <Modal show={showModal} onHide={this.hideModal} size="large">
            <Modal.Header closeButton>
              <Modal.Title>Select a credit-card for payment:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Cards
                loading={loadingCards}
                message={message}
                creditCards={creditCards}
                deleteCard={this.deleteCard}
                setCardDefault={this.setCardDefault}
                clearMessage={this.clearMessage}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="success">
                Pay ${ Number(total).toFixed(2) }
              </Button>
            </Modal.Footer>
          </Modal>
        </ShoppingContainer>
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
  creditCards: state.auth.creditCards,
  creditCardDefault: state.auth.creditCardDefault,
  message: state.auth.cardMessage,
  carts: state.shop.productsInCart,
  subtotal: state.shop.subtotal,
  total: state.shop.total
});

export default connect(mapStateToProps)(Shopping);