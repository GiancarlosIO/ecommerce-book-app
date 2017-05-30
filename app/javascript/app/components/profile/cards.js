import React from 'react';
import PropTypes from 'prop-types';
import { Table, Alert } from 'react-bootstrap';

import Card from './card';

const ProfileCards = (props) => {
  const renderCards = (cards) => {
    if (cards) {
      return Object.keys(cards).map(key =>
        (
          <Card
            card={cards[key]}
            key={cards[key].id}
            deleteCard={props.deleteCard}
            setCardDefault={props.setCardDefault}
          />
        )
      );
    }
    return [];
  };

  const renderMessage = () => {
    const { message } = props;
    return (message && message.type === 'card') &&
    (
      <div>
        <Alert
          bsStyle={message.status === 'success' ? 'success' : 'error'}
          onDismiss={() => { props.clearMessage(); }}
        >
          <p>{ message.message }</p>
        </Alert>
      </div>
    );
  };

  return (
    <div>
      { renderMessage() }
      {
        (
          props.loading &&
          (<h3 className="text-center">Loading</h3>)
        )
      }
      {
        (
          !props.loading && (renderCards(props.creditCards).length === 0) &&
          (<h3 className="text-center">You not have credit cards</h3>)
        )
      }
      {
        (
          !props.loading && (renderCards(props.creditCards).length > 0) &&
          (<Table condensed responsive bordered className="text-center">
            <tbody>
              { renderCards(props.creditCards) }
            </tbody>
          </Table>)

        )
      }
    </div>
  );
};

ProfileCards.defaultProps = {
  creditCards: undefined
};

ProfileCards.propTypes = {
  clearMessage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  creditCards: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      last_four: PropTypes.string,
      exp_year: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }
  )).isRequired
};

export default ProfileCards;
