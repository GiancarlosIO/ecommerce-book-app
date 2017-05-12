import React, { Component } from 'react';
import { Grid, Row, Column, PageHeader } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  getCreditCards,
  createCreditCard,
  deleteCreditCard,
  updateCard,
  setCardMessage
} from '../../actions/auth-actions';

import ProfileInfo from './info';
import Cards from './cards';
import AddCard from './add-card';

export class Profile extends Component {

  state = {
    loadingCards: false,
    loadingAddCard: false
  }

  addCreditCard = (token) => {
    console.log('adding card', token);
    return this.props.dispatch(createCreditCard(token))
      .then(() => {
        this.AddCard.closeModal();
      });
  }

  setCardDefault = (id) => {
    console.log('setting default card', id);
    this.props.dispatch(updateCard(id));
  }

  deleteCard = (id) => {
    console.log('deleting card', id);
    this.props.dispatch(deleteCreditCard(id));
  }

  clearMessage = () => {
    this.props.dispatch(setCardMessage(null));
  }

  componentDidMount() {
    this.setState({loadingCards: true}, () => {
      this.props.dispatch(getCreditCards())
        .then( () => this.setState({ loadingCards: false }) );
    })
  }

  render() {
    const { user, creditCards, message } = this.props;
    return (
      <Grid>
        <Row>
          <ProfileInfo {...user}/>
        </Row>
        <Row>
          <PageHeader>Credit Cards</PageHeader>
          <AddCard
            ref={ c => this.AddCard = c }
            addCreditCard={this.addCreditCard}
            message={message}
            clearMessage={this.clearMessage}
          />
          <Cards
            loading={this.state.loadingCards}
            creditCards={creditCards}
            deleteCard={this.deleteCard}
            setCardDefault={this.setCardDefault}
            message={message}
            clearMessage={this.clearMessage}
          />
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  creditCards: state.auth.creditCards,
  message: state.auth.cardMessage
});

export default connect(mapStateToProps)(Profile);