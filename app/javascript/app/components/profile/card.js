import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, Button } from 'react-bootstrap';

const Card = ({ card, deleteCard, setCardDefault }) => (
  <tr className={card.default && 'text-white bg-green-flat'} >
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
      <Button
        bsStyle="primary"
        className="margin-right-10"
        onClick={() => { deleteCard(card.id); }}
      >
        <Glyphicon glyph="trash" className="margin-right-5" />
        Delete
      </Button>
      { !card.default &&
        (
          <a
            role="button"
            tabIndex={0}
            className="cursor-pointer"
            onClick={() => { setCardDefault(card.id); }}
          >
            Set as default
          </a>
        )
      }
    </td>
  </tr>
);

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    last_four: PropTypes.string,
    exp_year: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }).isRequired,
  deleteCard: PropTypes.func.isRequired,
  setCardDefault: PropTypes.func.isRequired
};

export default Card;
