import React, { Component } from 'react';
import { Grid, Row, Column, PageHeader } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getCreditCards, createCreditCard } from '../../actions/auth-actions';

import ProfileInfo from './info';
import Cards from './cards';
import AddCard from './add-card';

export class Profile extends Component {

  addCreditCard = (token) => {
    console.log('adding card', token);
    this.props.dispatch(createCreditCard(token))
      .then(() => {
        this.AddCard.closeModal();
      });
  }

  componentDidMount() {
    this.props.dispatch(getCreditCards());
  }

  render() {
    const { user, creditCards } = this.props;
    return (
      <Grid>
        <Row>
          <ProfileInfo {...user}/>
        </Row>
        <Row>
          <PageHeader>Credit Cards</PageHeader>
          <AddCard ref={ c => this.AddCard = c } addCreditCard={this.addCreditCard} />
          <Cards creditCards={creditCards} />
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  creditCards: state.auth.creditCards
});

export default connect(mapStateToProps)(Profile);