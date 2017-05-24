import React, { Component }  from 'react';
import {
  Glyphicon
} from 'react-bootstrap';

export class InputCount extends Component {

  state = {
    count: 1
  }

  handleChange = (e) => {
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
    if (parseInt(count)) {
      count = parseInt(count);
      count = count + 1;
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
    if (parseInt(count)) {
      count = parseInt(count);
      count = count - 1;
      this.setState({ count: count > 0 ? count : 1 }, () => {
        this.changeCallback(this.state.count);
      });
    }
  }

  changeCallback = (count) => {
    if (this.props.handleChange) this.props.handleChange(count);
  }

  render() {
    const { count } = this.state;
    return (
      <div className="input-count">
        <Glyphicon glyph="chevron-up" className="cursor-pointer margin-right-5" onClick={this.upCount} />
        <input value={count} onChange={this.handleChange} ref={ el => this.input = el } />
        <Glyphicon glyph="chevron-down" className="cursor-pointer margin-left-5" onClick={this.downCount} />
      </div>
    );

  }
}

export default InputCount;