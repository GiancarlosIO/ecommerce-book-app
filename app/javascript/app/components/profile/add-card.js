import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Well, Glyphicon, Button, Modal, Alert } from 'react-bootstrap';

import StripeField from './stripe-field';

export class AddCard extends Component {

  state = {
    showModal: false
  };

  closeModal = () => {
    this.setState({ showModal: false });
  }

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeAlert = () => {
    this.props.clearMessage();
  }

  render() {
    const { message } = this.props;
    return (
      <Well className="text-center">
        {
          (message && message.type === 'addCard') &&
          (
            <Alert
              bsStyle={message.status === 'success' ? 'success' : 'warning'}
              onDismiss={this.closeAlert}
            >
              <p>{ message.message }</p>
            </Alert>
          )
        }
        <Button bsStyle="success" onClick={this.openModal}>
          <Glyphicon glyph="plus" className="margin-right-5" />
          Add a new Credit Card
        </Button>
        <Modal
          show={this.state.showModal}
          onHide={this.closeModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add a new credit card</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <StripeField addCreditCard={this.props.addCreditCard} />
          </Modal.Body>
        </Modal>
      </Well>
    );
  }
}

AddCard.defaultProps = {
  message: {
    message: undefined
  }
};

AddCard.propTypes = {
  clearMessage: PropTypes.func.isRequired,
  message: PropTypes.shape({
    message: PropTypes.string
  }),
  addCreditCard: PropTypes.func.isRequired
};

export default AddCard;
