import React from 'react';
import { Glyphicon, Button } from 'react-bootstrap';

const Card = ({ card }) => (
  <tr className={card.default && "text-white bg-green-flat"} >
    <td className="vertical-align-middle">
      <Glyphicon className="margin-right-5" glyph="credit-card" />
      {card.brand}
    </td>
    <td className="vertical-align-middle">
      **** **** **** {card.last_four} { card.default && (<small>(default)</small>)}
    </td>
    <td className="vertical-align-middle">
      EXP: {card.exp_month}/{card.exp_year}
    </td>
    <td className="vertical-align-middle">
      <Button bsStyle="primary" className="margin-right-10">
        <Glyphicon glyph="trash" className="margin-right-5" />
        Delete
      </Button>
      { !card.default && (<a>Set as default</a>)}
    </td>
  </tr>
);

export default Card;