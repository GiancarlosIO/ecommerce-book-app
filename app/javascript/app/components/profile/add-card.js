import React, { Component }  from 'react';
import { Well, Glyphicon, Button, Modal } from 'react-bootstrap';

import StripeField from './stripe-field';

export class AddCard extends Component {

  state = {
    showModal: false
  }

  closeModal = () => {
    this.setState({showModal: false});
  }

  openModal = () => {
    this.setState({showModal: true});
  };

  render() {

    return (
      <Well className="text-center">
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
};

export default AddCard;