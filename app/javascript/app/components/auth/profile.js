import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Profile extends Component {
  render() {
    return (
      <div>
        <h1>Profile component</h1>
      </div>
    )
  }
}

export default connect()(Profile);