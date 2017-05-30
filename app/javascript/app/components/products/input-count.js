import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Glyphicon
} from 'react-bootstrap';

export class InputCount extends Component {

  state = {
    count: this.props.value ? this.props.value : 1
  }

  handleChange = () => {
    const count = this.input.value;
    const reg = /^[0-9\b]+$/;
    if (reg.test(count)) {
      this.setState({ count: count > 0 ? count : 1 }, () => {
        this.changeCallback(this.state.count);
      });
    }
  }

  upCount = () => {
    let count = this.input.value;
    if (parseInt(count, 10)) {
      count = parseInt(count, 10);
      count++;
      this.setState({ count }, () => {
        this.changeCallback(this.state.count);
      });
    } else {
      this.setState({ count: 1 }, () => {
        this.changeCallback(this.state.count);
      });
    }
  }

  downCount = () => {
    let count = this.input.value;
    if (parseInt(count, 10)) {
      count = parseInt(count, 10);
      count--;
      this.setState({ count: count > 0 ? count : 1 }, () => {
        this.changeCallback(this.state.count);
      });
    }
  }

  changeCallback = (count) => {
    if (this.props.handleChange) this.props.handleChange(count);
  }

  resetState = () => {
    this.setState({ count: 1 });
  }

  render() {
    const { count } = this.state;
    return (
      <div className="input-count">
        <Glyphicon
          glyph="chevron-up"
          className="cursor-pointer margin-right-5"
          onClick={this.upCount}
        />
        <input
          value={count}
          onChange={this.handleChange}
          ref={(el) => { this.input = el; }}
        />
        <Glyphicon
          glyph="chevron-down"
          className="cursor-pointer margin-left-5"
          onClick={this.downCount}
        />
      </div>
    );
  }
}

InputCount.defaultProps = {
  value: 1,
  handleChange: undefined
};

InputCount.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.number
};

export default InputCount;
