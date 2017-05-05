import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/product-actions';

import ProductCard from './product-card';

export class ProductList extends Component {

  componentDidMount() {
    console.log('Product list mounted');
    this.props.dispatch(getProducts());
  }

  renderProducts = () => {
    const { products } = this.props;
    if (products) {
      return Object.keys(products).map(key => {
        return (
          <ProductCard key={key} {...products[key]}/>
        )
      });
    }
  }

  render() {
    const { products } = this.props;
    return (
      <div>
        <h1>Products</h1>
        <div className="product-card-container flex flex-rowWrap flex-justifyBetween flex-alignItems">
          { this.renderProducts() }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ products: state.products.all })
export default connect(mapStateToProps)(ProductList);