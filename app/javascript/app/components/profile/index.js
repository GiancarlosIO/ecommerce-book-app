import React, { Component } from 'react';
import { Grid, Row, Column, PageHeader } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getCreditCards } from '../../actions/auth-actions';

import ProfileInfo from './info';
import Cards from './cards';
import AddCard from './add-card';

export class Profile extends Component {

  addCreditCard = (token) => {
    console.log('adding card', token);
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
          <AddCard addCreditCard={this.addCreditCard} />
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