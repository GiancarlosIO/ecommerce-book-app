import React from 'react';
import { Row, Col, Grid }  from 'react-bootstrap';

import ProductDetails from './product-details';
import ProductSideBar from './product-sideBar';

const ProductsShow = (props) => (
  <div>
    <Grid>
      <Row>
        <Col xs={12} sm={12} md={9} lg={9}>
          <ProductDetails {...props} />
        </Col>
        <Col xs={12} sm={12} md={3} lg={3}>
          <ProductSideBar />
        </Col>
      </Row>
    </Grid>
  </div>
)

export default ProductsShow;