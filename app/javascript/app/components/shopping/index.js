import React, { Component } from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Modal
} from 'react-bootstrap';

import Loader from '../ui/loader';

import {
  setCartQuantity,
  deleteCart,
  calculateTotal
} from '../../actions/shop-actions';

import {
  deleteCreditCard,
  updateCard,
  setCardMessage,
  getCreditCards,
  createCreditCard,
  setLoadingUserActions
} from '../../actions/auth-actions';

import {
  createCharge,
  setLoadingCharge
} from '../../actions/charge-actions';

import CartList from './cart-list';
import Cards from '../profile/cards';
import AddCard from '../profile/add-card';

const ShoppingContainer = glamorous.div({
  background: 'rgba(236, 240, 241,1.0)',
  padding: '10px 20px'
});

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
    loadingCards: false
  }

  componentDidMount() {
    this.props.dispatch(getCreditCards())
      .then(() => this.setState({ loadingCards: false }));
  }

  setCardDefault = (id) => {
    this.props.dispatch(setLoadingUserActions(true));
    this.props.dispatch(updateCard(id));
  };
  handleChange = (id, quantity) => {
    this.props.dispatch(setCartQuantity(id, quantity));
    this.props.dispatch(calculateTotal());
  }

  deleteCart = (id) => {
    this.props.dispatch(deleteCart(id));
    this.props.dispatch(calculateTotal());
  }

  addCreditCard = (token) => {
    console.log('adding card', token);
    return this.props.dispatch(createCreditCard(token))
      .then(() => {
        this.AddCard.closeModal();
      });
  }

  hideModal = () => this.setState({ showModal: false });
  showModal = () => this.setState({ showModal: true });
  deleteCard = (id) => {
    console.log('deleting from shopping');
    this.props.dispatch(setLoadingUserActions(true));
    this.props.dispatch(deleteCreditCard(id));
  };
  clearMessage = () => this.props.dispatch(setCardMessage(null));

  createShop = () => {
    const { subtotal, total, carts, creditCardDefault } = this.props;
    const cart = {
      card_id: creditCardDefault.identifier,
      total,
      subtotal,
      products: Object.keys(carts).map(i => carts[`${i}`])
    };
    console.log('creating cart', cart);
    this.props.dispatch(setLoadingCharge(true));
    this.setState({ showModal: false }, () => {
      this.props.dispatch(createCharge(cart));
    });
  }

  chargeSuccess = () => window.location.replace('/products');

  render() {
    console.log('rendering shopping props', this.props);
    const {
      carts,
      subtotal,
      total,
      creditCards,
      message,
      loadingCharge,
      loadingUserActions,
      chargeSuccess
    } = this.props;
    const { showModal, loadingCards } = this.state;

    return Object.keys(carts).length > 0 ?
      (
        <ShoppingContainer>
          <div className="padding-20">
            <h2 className="text-bold">
              Products in Cart:
            </h2>
          </div>
          <CartList
            carts={carts}
            handleChange={this.handleChange}
            deleteCart={this.deleteCart}
          />
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
                ${(subtotal * 0.18).toFixed(2)}
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
          <Modal show={showModal && !loadingCharge} onHide={this.hideModal} size="large">
            <Modal.Header closeButton>
              <Modal.Title>Select a credit-card for payment:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddCard
                ref={(c) => { this.AddCard = c; }}
                addCreditCard={this.addCreditCard}
                message={message}
                clearMessage={this.clearMessage}
              />
              <h2>asdasdasd</h2>
              <Cards
                loadingUserActions={loadingUserActions}
                loading={loadingCards}
                message={message}
                creditCards={creditCards}
                deleteCard={this.deleteCard}
                setCardDefault={this.setCardDefault}
                clearMessage={this.clearMessage}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                bsStyle="success"
                onClick={this.createShop}
                disabled={loadingCharge}
              >
                {
                  loadingCharge ?
                  (<span>Loading...</span>) :
                  `Pay $ ${Number(total).toFixed(2)}`
                }
              </Button>
            </Modal.Footer>
          </Modal>
          <Loader show={loadingCharge} type="rect" />
          <Modal show={chargeSuccess} >
            <Modal.Header>
              <Modal.Title>Your purchase was made successfully</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>You have purchase the following products:</p>
              <ul>
                {
                  Object.keys(carts).map(i => (<li key={i}> {`${carts[i].name} (x${carts[i].quantity})`} </li>))
                }
              </ul>
              <Button bsStyle="success" onClick={this.chargeSuccess}>
                Got it
              </Button>
            </Modal.Body>
          </Modal>
        </ShoppingContainer>
      ) :
      (
        <div className="padding-20">
          <h2>You has 0 products, <Link to="/products">go back to products page</Link> and add some products to cart</h2>
          <Link to="/products">Go to Products Page</Link>
        </div>
      );
  }
}

Shopping.defaultProps = {
  message: {},
  creditCards: {},
  creditCardDefault: {},
  loadingUserActions: false,
  loadingCharge: false
};

Shopping.propTypes = {
  loadingCharge: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  carts: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number,
    quantity: PropTypes.number,
    image: PropTypes.string
  })).isRequired,
  subtotal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  creditCards: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      last_four: PropTypes.string,
      exp_year: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }
  )).isRequired,
  creditCardDefault: PropTypes.shape({
    id: PropTypes.number,
    last_four: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    brand: PropTypes.string,
    exp_moth: PropTypes.number,
    exp_year: PropTypes.number,
    default: PropTypes.bool
  }).isRequired,
  message: PropTypes.shape({
    message: PropTypes.string,
    status: PropTypes.string,
    type: PropTypes.string
  }),
  loadingUserActions: PropTypes.bool,
  chargeSuccess: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  loadingUserActions: state.auth.loadingUserActions,
  creditCards: state.auth.creditCards,
  creditCardDefault: state.auth.creditCardDefault,
  message: state.auth.cardMessage,
  carts: state.shop.productsInCart,
  subtotal: state.shop.subtotal,
  total: state.shop.total,
  loadingCharge: state.charge.loadingCharge,
  chargeSuccess: state.charge.chargeSuccess
});

export default connect(mapStateToProps)(Shopping);
