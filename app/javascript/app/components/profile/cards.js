import React from 'react';
import { PageHeader, Table, Button, Well, Glyphicon, Small, Alert } from 'react-bootstrap';

import Card from './card';

const ProfileCards = (props) => {

  const renderCards = (cards) => {
    if (cards) {
      return Object.keys(cards).map( key =>
        (
          <Card
            card={cards[key]}
            key={cards[key].id}
            deleteCard={props.deleteCard}
            setCardDefault={props.setCardDefault}
          />
        )
      );
    };
    return [];
  }

  const renderMessage = () => {
    const { message } = props;
    if (message && message.type === 'card') {
      return (
        <div>
          <Alert
            bsStyle={ message.status === 'success' ? 'success' : 'error' }
            onDismiss={ () => { props.clearMessage() } }
          >
            <p>{ message.message }</p>
          </Alert>
        </div>
      )
    }
  }

  return (
    <div>
        { renderMessage() }
        {
          !props.loading ?
          (
            renderCards(props.creditCards).length > 0 ?
            (<Table condensed responsive bordered className="text-center">
              <tbody>
                { renderCards(props.creditCards) }
              </tbody>
            </Table>) :
            <h3 className="text-center">You not have credit cards</h3>
          ) :
          (<h3 className="text-center">Loading</h3>)
        }
    </div>
  )
}

export default ProfileCards;