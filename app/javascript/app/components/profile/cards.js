import React from 'react';
import { PageHeader, Table, Button, Well, Glyphicon, Small } from 'react-bootstrap';

import Card from './card';

const ProfileCards = (props) => {

  const renderCards = (cards) => {
    return cards.map( card =>
      (
        <Card card={card} key={card.id}/>
      )
    );
  }

  return (
    <div>
        {
          props.creditCards ?
          (<Table condensed responsive bordered className="text-center">
            <tbody>
              { renderCards(props.creditCards) }
            </tbody>
          </Table>) :
          (<h3 className="text-center">Loading</h3>)
        }
    </div>
  )
}

export default ProfileCards;