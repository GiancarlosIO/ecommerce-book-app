import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Button, Panel, Well, Image, Grid, Col, PageHeader, Table } from 'react-bootstrap';
import { getProductById } from '../../actions/product-actions';

export class ProductDetails extends Component {


  componentDidMount() {
    const { id } = this.props.match.params
    this.props.dispatch(getProductById(id));
  }

  render() {
    const { productSelected: product, error } = this.props;
    if (product && !error) {
     return (
        <Panel header={product.name} bsStyle="primary">
          <Col xs={12} className="margin-bottom-15">
            <button className="float-right btn-red-flat btn-min">Add to car</button>
          </Col>
          <Col md={3} sm={4} xs={12}>
            <Image src={product.image} alt={product.name} circle responsive/>
          </Col>
          <Col sm={8} md={9} xs={12}>
            <Table responsive bordered>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Identifier</td>
                  <td>{product.id}</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>{ product.name }</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>{ product.description }</td>
                </tr>
                <tr>
                  <td>Quantity</td>
                  <td>{ product.quantity }</td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>${ product.price }</td>
                </tr>
                <tr>
                  <td>Categories</td>
                  <td>
                    {
                      product.categories.map(category => (
                        <span key={category.id} className="padding-min text-white bg-green-flat">
                          {category.name}
                        </span>)
                      )
                    }
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col xs={12}>
            <Well>
              <h2 className="text-blue-flat">
                Just a ${ product.price }...what are you waiting for?
              </h2>
              <div>
                <Button bsStyle="info" className="margin-right">
                  Buy it!
                </Button>
                <Button bsStyle="success">
                  Send it like a gift
                </Button>
              </div>
            </Well>
          </Col>
        </Panel>
      )
    } else if (error) {
      return (<h2>{ error }</h2>)
    } else {
      return (<h2> Loading... </h2>)
    }
  }
}

const mapStateToProps = (state) => ({
  productSelected: state.products.productSelected,
  error: state.products.errorToGetProduct
});

export default connect(mapStateToProps)(ProductDetails);