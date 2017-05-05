import React from 'react';
import { Grid, Col } from 'react-bootstrap';

import ProductList from './product-list';

const Products = () => (
  <Grid>
    <Col xs={12} sm={8} md={10} lg={8} smOffset={2} mdOffset={2} lgOffset={2} >
      <ProductList />
    </Col>
  </Grid>
)

export default Products;