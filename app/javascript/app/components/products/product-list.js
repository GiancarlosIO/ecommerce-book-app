import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  getProducts,
  loadingProducts,
  setLoadingPerPage,
  getProductsPerPage
} from '../../actions/product-actions';
// shop actions
import {
  addProductToCart,
  calculateTotal
} from '../../actions/shop-actions';

import ProductCard from './product-card';

export class ProductList extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadingProducts(true));
    dispatch(getProducts());
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  addToCart = (product, quantity) => {
    this.props.dispatch(addProductToCart(product, quantity));
    this.props.dispatch(calculateTotal());
  }

  handleScroll = _.throttle(() => {
    const { dispatch, loadingPerPage, pages, pagesShowing } = this.props;
    if (pagesShowing < pages) {
      const documentHeight = document.body.offsetHeight;
      const scrollFromTop = window.scrollY;
      const windowHeight = window.innerHeight;
      if (scrollFromTop + windowHeight >= documentHeight - 200) {
        if (!loadingPerPage) {
          console.log('starting ajax for get more products');
          dispatch(setLoadingPerPage(true));
          dispatch(getProductsPerPage(pagesShowing + 1));
        }
      }
    }
  }, 300);

  renderProducts = () => {
    const { products } = this.props;
    return products && Object.keys(products).map(key =>
        (<ProductCard key={key} {...products[key]} addToCart={this.addToCart} />)
      );
  }

  render() {
    const { loading, loadingPerPage } = this.props;
    return (
      <div>
        <div className="margin-rightLeft-10">
          <h1>Products</h1>
        </div>
        { loading ?
          'Loading Products' :
          <CSSTransitionGroup
            className="product-card-container flex flex-rowWrap flex-justifyAround flex-alignItems"
            transitionName="fadeIn"
            transitionAppear
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            { this.renderProducts() }
          </CSSTransitionGroup>
        }
        { loadingPerPage && (<div><h1 className="margin-bottom-20">Loading...</h1></div>) }
      </div>
    );
  }
}

ProductList.defaultProps = {
  pages: 1,
  pagesShowing: 1,
  loading: false,
  loadingPerPage: false,
  products: {}
};

ProductList.propTypes = {
  loading: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  loadingPerPage: PropTypes.bool,
  pages: PropTypes.number,
  pagesShowing: PropTypes.number,
  products: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }))
};

const mapStateToProps = state => ({
  loading: state.products.loading,
  loadingPerPage: state.products.loadingPerPage,
  pages: state.products.pages,
  pagesShowing: state.products.pagesShowing,
  products: state.products.all
});
export default connect(mapStateToProps)(ProductList);
