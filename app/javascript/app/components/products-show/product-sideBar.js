import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';

export class ProductSideBar extends Component {
  render() {
    return (
      <Panel header="Related products...">
        <p>
          lorem ipsum....
        </p>
      </Panel>
    );
  }
}

export default connect()(ProductSideBar);