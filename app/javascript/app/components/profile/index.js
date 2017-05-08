import React, { Component } from 'react';
import { Grid, Row, Column } from 'react-bootstrap';
import { connect } from 'react-redux';

import ProfileInfo from './info';
import ProfileCards from './cards';

export class Profile extends Component {
  render() {
    const { user } = this.props;

    return (
      <Grid>
        <Row>
          <ProfileInfo {...user}/>
        </Row>
        <Row>
          <ProfileCards />
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({ user: state.auth.user });

export default connect(mapStateToProps)(Profile);