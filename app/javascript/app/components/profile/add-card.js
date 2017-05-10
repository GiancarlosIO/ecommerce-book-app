import React, { Component }  from 'react';
import { Well, Glyphicon, Button, Modal, Alert } from 'react-bootstrap';

import StripeField from './stripe-field';

export class AddCard extends Component {

  state = {
    showModal: false,
    showAlert: false
  }

  closeModal = () => {
    this.setState({showModal: false});
  }

  openModal = () => {
    this.setState({showModal: true});
  };

  closeAlert = () => {
    thi.setState({ showAlert: false, alertText: null });
  }

  render() {
    const { showAlert } = this.state;
    const { alertText } = this.props;
    return (
      <Well className="text-center">
        {
          showAlert &&
          (
            <Alert bsStyle="success" onDismiss={this.closeAlert}>
              <h3>{ alertText }</h3>
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
};

export default AddCard;