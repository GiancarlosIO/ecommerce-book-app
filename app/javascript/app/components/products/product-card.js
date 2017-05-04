import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = (props) => (
  <Link to={`/products/${props.id}`} className="card">
    <div className="card-img">
      <img src={props.image} />
    </div>
    <div className="card-info">
      <h3 className="card-info-title">{props.name.substr(0, 15)}...</h3>
      <p className="product-card-description">{props.description.substr(0, 42)}...</p>
      <div className="product-card-info">
        <span className="product-card-price">Price: ${props.price}</span>
        <span className="product-card-quantity">Quantity: {props.quantity}</span>
      </div>
    </div>
  </Link>
)

export default ProductCard;