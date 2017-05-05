import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProducts, loadingProducts, setLoadingPerPage, getProductsPerPage } from '../../actions/product-actions';
import _ from 'lodash';

import ProductCard from './product-card';

export class ProductList extends Component {

  componentDidMount() {
    console.log('Product list mounted');
    const { dispatch } = this.props;
    dispatch(loadingProducts(true));
    dispatch(getProducts());
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = _.throttle((e) => {
    const { dispatch, loadingPerPage, pages, pagesShowing } = this.props;
    if (pagesShowing < pages) {
      console.log('function throttle');
      const documentHeight = document.body.offsetHeight;
      const scrollFromTop = window.scrollY;
      const windowHeight = window.innerHeight;
      if ( scrollFromTop + windowHeight >= documentHeight - 200 ) {
        if ( !loadingPerPage ) {
          console.log('starting ajax');
          dispatch(setLoadingPerPage(true));
          dispatch(getProductsPerPage(pagesShowing + 1));
        }
      }
    }
  }, 300);

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
    const { products, loading } = this.props;
    return (
      <div>
        <h1>Products</h1>
        <div className="product-card-container flex flex-rowWrap flex-justifyBetween flex-alignItems">
          { loading ? 'Loading Products' : this.renderProducts() }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.products.loading,
  loadingPerPage: state.products.loadingPerPage,
  pages: state.products.pages,
  pagesShowing: state.products.pagesShowing,
  products: state.products.all
});
export default connect(mapStateToProps)(ProductList);