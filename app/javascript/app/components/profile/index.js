import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, PageHeader } from 'react-bootstrap';
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
    loadingCards: true,
    loadingAddCard: false
  }

  componentDidMount() {
    this.props.dispatch(getCreditCards())
      .then(() => this.setState({ loadingCards: false }));
  }

  setCardDefault = (id) => {
    console.log('setting default card', id);
    this.props.dispatch(updateCard(id));
  }

  addCreditCard = (token) => {
    console.log('adding card', token);
    return this.props.dispatch(createCreditCard(token))
      .then(() => {
        this.AddCard.closeModal();
      });
  }


  deleteCard = (id) => {
    console.log('deleting card', id);
    this.props.dispatch(deleteCreditCard(id));
  }

  clearMessage = () => {
    this.props.dispatch(setCardMessage(null));
  }

  render() {
    const { user, creditCards, message } = this.props;
    return (
      <Grid>
        <Row>
          <ProfileInfo {...user} />
        </Row>
        <Row>
          <PageHeader>Credit Cards</PageHeader>
          <AddCard
            ref={(c) => { this.AddCard = c; }}
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
    );
  }
}

Profile.defaultProps = {
  creditCards: {},
  message: {}
};

Profile.propTypes = {
  creditCards: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      last_four: PropTypes.string,
      exp_year: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }
  )),
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
    username: PropTypes.any,
    name: PropTypes.any
  }).isRequired,
  message: PropTypes.shape({
    message: PropTypes.string,
    status: PropTypes.string,
    type: PropTypes.string
  }).isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  creditCards: state.auth.creditCards,
  message: state.auth.cardMessage
});

export default connect(mapStateToProps)(Profile);
