import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Glyphicon
} from 'react-bootstrap';

import InputCount from './input-count';

let inputCountRef;

export class ProductCard extends Component {

  state = {
    count: 1
  }

  updateCount = (count) => {
    this.setState({ count });
  }

  render() {
    const { id, image, description, price, quantity, name, addToCart } = this.props;

    return (
      <div className="card-container margin-rightLeft-10 margin-bottom-20">
        <Link to={`/products/${id}`} className="card cursor-pointer">
          <div>
            <img className="img-card" src={image} />
          </div>
          <div className="card-info padding-10">
            <h3 className="card-info-title margin-none margin-bottom-8 text-title text-bold text-black">{name.substr(0, 15)}...</h3>
            <p className="product-card-description">{description.substr(0, 42)}...</p>
            <div className="product-card-info flex flex-rowWrap flex-justifyBetween flex-alignCenter text-min">
              <span className="product-card-price padding-min text-white border-radius-4 bg-light-blue">Price: ${price}</span>
              <span className="product-card-quantity padding-min text-white border-radius-4 bg-green">Quantity: {quantity}</span>
            </div>
          </div>
        </Link>
        <div className="flex flex-row flex-wrap">
          <InputCount handleChange={this.updateCount} ref={ (el) => {this.inputCount = el} }/>
          <Button
            className="width-90 border-radius-none"
            bsStyle="success"
            onClick={() => {
                addToCart({
                  id,
                  name,
                  description,
                  price,
                  quantity,
                  image
                }, this.state.count);
                this.inputCount.resetState();
              }
            }
          >
            <Glyphicon glyph="shopping-cart"/>  Add
          </Button>
          </div>
      </div>
    )
  }
}

export default ProductCard;