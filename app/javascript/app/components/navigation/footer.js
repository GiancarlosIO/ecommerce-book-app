import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from 'react-bootstrap/lib/Navbar';

export class Footer extends Component {
  render() {
    return (
      <div>
        footer
      </div>
    );
  };
};

export default connect()(Footer);