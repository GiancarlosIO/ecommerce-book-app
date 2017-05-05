import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = (props) => (
  <Link to={`/products/${props.id}`} className="card cursor-pointer margin-rightLeft-10 margin-bottom-20">
    <div>
      <img className="img-card" src={props.image} />
    </div>
    <div className="card-info padding-10">
      <h3 className="card-info-title margin-none margin-bottom-8 text-title text-bold text-black">{props.name.substr(0, 15)}...</h3>
      <p className="product-card-description">{props.description.substr(0, 42)}...</p>
      <div className="product-card-info flex flex-rowWrap flex-justifyBetween flex-alignCenter text-min">
        <span className="product-card-price padding-min text-white border-radius-4 bg-light-blue">Price: ${props.price}</span>
        <span className="product-card-quantity padding-min text-white border-radius-4 bg-green">Quantity: {props.quantity}</span>
      </div>
    </div>
  </Link>
)

export default ProductCard;