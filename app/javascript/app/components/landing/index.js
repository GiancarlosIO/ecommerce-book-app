import React, { Component } from 'react';
import { connect } from 'react-redux';

import HomeSection from './home-section';

export class Landing extends Component {
  render() {
    return (
      <HomeSection />
    );
  }
}

export default connect()(Landing);
